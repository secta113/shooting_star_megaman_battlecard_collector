// Global state for application
const STORAGE_KEY = "ryusei2_checker_possession_v1";

// User's specified missing standard cards
const DEFAULT_MISSING_STD_NOS = [
  3, 5, 11, 17, 27, 28, 30, 41, 53, 57, 61, 65, 67, 71, 74, 83, 86, 89, 96, 102, 103, 107, 110, 113, 116, 119, 128, 133, 140, 144, 145
];

let appPossession = {};
let currentClassFilter = "all";
let currentSearchQuery = "";
let activeTab = "flowchart";
let activeTribe = "berserk"; // "berserk", "shinobi", "dinosaur"

// Expose state globally for flowchart.js helper functions
window.appState = {
  isAcquired: (classType, cardKey) => {
    if (appPossession[classType]) {
      return !!appPossession[classType][cardKey];
    }
    return false;
  }
};

// 1. Initialize State
function validateAndSanitizeState(rawData) {
  if (!rawData || typeof rawData !== 'object' || Array.isArray(rawData)) {
    return null;
  }

  const expectedClasses = ["standard", "mega", "giga", "blank", "gentei"];
  const rawPos = rawData.possession || rawData;
  if (!rawPos || typeof rawPos !== 'object' || Array.isArray(rawPos)) {
    return null;
  }

  const sanitizedPos = {};
  let hasValidClass = false;

  expectedClasses.forEach(cl => {
    sanitizedPos[cl] = {};
    const rawClassData = rawPos[cl];
    if (rawClassData && typeof rawClassData === 'object' && !Array.isArray(rawClassData)) {
      hasValidClass = true;
      Object.keys(rawClassData).forEach(key => {
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
          return;
        }
        sanitizedPos[cl][key] = !!rawClassData[key];
      });
    }
  });

  if (!hasValidClass) {
    return null;
  }

  let tribe = "berserk";
  if (rawData.tribe && typeof rawData.tribe === 'string') {
    if (["berserk", "shinobi", "dinosaur"].includes(rawData.tribe)) {
      tribe = rawData.tribe;
    }
  }

  return {
    tribe: tribe,
    possession: sanitizedPos
  };
}

function initializeState(forceResetDefault = false) {
  const savedState = localStorage.getItem(STORAGE_KEY);
  
  if (savedState && !forceResetDefault) {
    try {
      const rawData = JSON.parse(savedState);
      const validated = validateAndSanitizeState(rawData);
      if (validated) {
        appPossession = validated.possession;
        activeTribe = validated.tribe;
        return;
      }
    } catch (e) {
      console.error("Failed to parse saved state, resetting...", e);
    }
  }

  // Create fresh state
  appPossession = {
    standard: {},
    mega: {},
    giga: {},
    blank: {},
    gentei: {}
  };

  // Standard cards init: all true except the user's missing list
  CARD_DATABASE.standard.forEach(card => {
    const isMissing = DEFAULT_MISSING_STD_NOS.includes(card.no);
    appPossession.standard[card.no] = !isMissing;
  });

  // Mega, Giga, Blank, Event cards default to true
  CARD_DATABASE.mega.forEach(card => {
    appPossession.mega[card.no] = true;
  });
  CARD_DATABASE.giga.forEach(card => {
    appPossession.giga[card.no] = true;
  });
  CARD_DATABASE.blank.forEach(card => {
    appPossession.blank[card.no] = true;
  });
  CARD_DATABASE.gentei.forEach(card => {
    appPossession.gentei[card.name] = true;
  });

  activeTribe = "berserk";
  saveState();
}

// Save progress to localStorage
function saveState() {
  const data = {
    tribe: activeTribe,
    possession: appPossession
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Apply theme class to document
function applyTribeTheme(tribe) {
  document.documentElement.setAttribute("data-tribe", tribe);
  
  // Update Radio input checked state
  const radio = document.querySelector(`input[name="tribe-choice"][value="${tribe}"]`);
  if (radio) {
    radio.checked = true;
    document.querySelectorAll('.tribe-opt').forEach(lbl => {
      if (lbl.getAttribute('data-tribe') === tribe) {
        lbl.classList.add('active');
      } else {
        lbl.classList.remove('active');
      }
    });
  }
  
  // Update Emblem Icon
  const emblem = document.getElementById("logo-emblem");
  if (emblem) {
    if (tribe === "berserk") emblem.textContent = "⚡";
    else if (tribe === "shinobi") emblem.textContent = "🌳";
    else if (tribe === "dinosaur") emblem.textContent = "🔥";
  }
}

// 3. Tab Switching
function switchTab(tabId) {
  activeTab = tabId;
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));
  
  const classFilterBar = document.getElementById("class-filter-bar");
  
  if (tabId === 'checklist') {
    document.getElementById("tab-btn-checklist").classList.add("active");
    document.getElementById("tab-content-checklist").classList.add("active");
    if (classFilterBar) classFilterBar.style.display = "flex";
  } else if (tabId === 'flowchart') {
    document.getElementById("tab-btn-flowchart").classList.add("active");
    document.getElementById("tab-content-flowchart").classList.add("active");
    if (classFilterBar) classFilterBar.style.display = "none";
    if (typeof syncFlowchartChips === "function") {
      syncFlowchartChips();
    }
  } else if (tabId === 'monsterbook') {
    document.getElementById("tab-btn-monsterbook").classList.add("active");
    document.getElementById("tab-content-monsterbook").classList.add("active");
    if (classFilterBar) classFilterBar.style.display = "none";
    renderMonsterBook();
  }
}

// 2. Toggle Possession Status (O(1) DOM updates)
function toggleCard(classType, cardKey) {
  if (appPossession[classType]) {
    appPossession[classType][cardKey] = !appPossession[classType][cardKey];
    saveState();
    
    // 1. Update checklist row styling and checkbox in-place
    updateChecklistRow(classType, cardKey);
    
    // 2. Update flowchart chips in-place if standard class
    if (classType === "standard" && typeof updateFlowchartChip === "function") {
      updateFlowchartChip(cardKey);
    }
    
    // 3. Update monster book drops in-place
    updateMonsterBookDrop(classType, cardKey);
    
    // 4. Update overall stats in-place
    updateStats();
  }
}

// Helper to filter cards based on version / tribe
function getActiveVersionCards(classType) {
  const list = CARD_DATABASE[classType] || [];
  if (classType === "giga") {
    const tribeMap = {
      "berserk": "ベルセルク",
      "shinobi": "シノビ",
      "dinosaur": "ダイナソー"
    };
    const targetVersion = tribeMap[activeTribe];
    return list.filter(card => card.version === targetVersion);
  }
  return list;
}

// 4. Build Checklist DOM once on startup
function buildChecklistDOM() {
  const tbody = document.getElementById("card-table-body");
  if (!tbody) return;

  tbody.innerHTML = "";
  
  const fragment = document.createDocumentFragment();
  const classes = ["standard", "mega", "giga", "blank", "gentei"];

  classes.forEach(classType => {
    const list = getActiveVersionCards(classType);
    
    list.forEach(card => {
      const cardKey = classType === "gentei" ? card.name : card.no;
      const isAcquired = !!appPossession[classType][cardKey];

      // Formulate class badges
      let classText = "Standard";
      let classBadgeClass = "std";
      if (classType === "mega") { classText = "Mega"; classBadgeClass = "mg"; }
      if (classType === "giga") { classText = "Giga"; classBadgeClass = "gg"; }
      if (classType === "blank") { classText = "Blank"; classBadgeClass = "bk"; }
      if (classType === "gentei") { classText = "Event"; classBadgeClass = "gt"; }

      // Gather text strings for search caching
      const noStr = classType === "gentei" ? "---" : String(card.no);
      const name = card.name || `ブランクカード ${card.no}`;
      const source = card.source || "";
      const virus = card.virus || "";
      const virus_loc = card.virus_loc || "";

      // Create row element
      const tr = document.createElement("tr");
      tr.className = `card-row ${isAcquired ? 'acquired' : 'missing'}`;
      tr.id = `card-row-${classType}-${cardKey}`;
      tr.setAttribute("data-class", classType);

      // Pre-cache lower-cased search index string directly on DOM element for super fast filtering
      tr._searchData = `${noStr} ${name} ${source} ${virus} ${virus_loc}`.toLowerCase();

      // No. Cell
      const tdNo = document.createElement("td");
      tdNo.className = "card-number";
      let displayNo = classType === "gentei" ? "---" : String(card.no).padStart(3, '0');
      tdNo.innerHTML = `
        <div>${displayNo}</div>
        <span class="class-badge ${classBadgeClass}">${classText}</span>
      `;
      tr.appendChild(tdNo);

      // Name Cell
      const tdName = document.createElement("td");
      tdName.className = "card-name-cell";
      tdName.textContent = name;
      tr.appendChild(tdName);

      // Source/Location Cell
      const tdSource = document.createElement("td");
      tdSource.className = "card-source-cell";
      tdSource.textContent = source;
      tr.appendChild(tdSource);

      // Virus Info Cell
      const tdVirus = document.createElement("td");
      if (virus && virus !== "所持ウイルスなし") {
        tdVirus.innerHTML = `
          <div class="virus-name-badge" onclick="gotoMonsterBook('${virus}')" title="図鑑で出現場所を見る">${virus}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">${getLocationTagHtml(virus_loc)}</div>
        `;
      } else if (classType === "mega") {
        tdVirus.innerHTML = `
          <div class="virus-name-badge" style="background: rgba(168, 85, 247, 0.1); color: var(--color-mega);" onclick="gotoMonsterBook('${card.boss}')" title="図鑑で出現場所を見る">${card.boss}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">${getLocationTagHtml(card.loc)}</div>
        `;
      } else {
        tdVirus.textContent = "-";
      }
      tr.appendChild(tdVirus);

      // Checkbox Cell
      const tdCheck = document.createElement("td");
      tdCheck.className = "checkbox-cell";
      
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.className = "cyber-checkbox";
      cb.checked = isAcquired;
      cb.onchange = () => toggleCard(classType, cardKey);
      
      tdCheck.appendChild(cb);
      tr.appendChild(tdCheck);

      fragment.appendChild(tr);
    });
  });

  tbody.appendChild(fragment);
}

// 5. Update single row styling (O(1) execution)
function updateChecklistRow(classType, cardKey) {
  const tr = document.getElementById(`card-row-${classType}-${cardKey}`);
  if (!tr) return;
  
  const isAcquired = !!appPossession[classType][cardKey];
  if (isAcquired) {
    tr.classList.add("acquired");
    tr.classList.remove("missing");
  } else {
    tr.classList.add("missing");
    tr.classList.remove("acquired");
  }
  
  const cb = tr.querySelector(".cyber-checkbox");
  if (cb) {
    cb.checked = isAcquired;
  }
}

// 6. Fast Search & Filter (O(N) layout changes, takes less than 1ms for N=219)
function applyFiltersAndSearch() {
  const rows = document.querySelectorAll("#card-table-body tr.card-row");
  const q = currentSearchQuery.toLowerCase().trim();
  let matchesFound = 0;

  rows.forEach(tr => {
    const classType = tr.getAttribute("data-class");
    
    // Class Filter Check
    const matchClass = currentClassFilter === "all" || currentClassFilter === classType;
    
    // Search Query Check
    const matchSearch = !q || tr._searchData.includes(q);

    if (matchClass && matchSearch) {
      tr.style.display = "";
      matchesFound++;
    } else {
      tr.style.display = "none";
    }
  });

  // Toggle no results row
  let noResultsRow = document.getElementById("no-results-row");
  if (matchesFound === 0) {
    if (!noResultsRow) {
      noResultsRow = document.createElement("tr");
      noResultsRow.id = "no-results-row";
      noResultsRow.innerHTML = `<td colspan="5" style="text-align: center; color: var(--text-muted); padding: 40px;">該当するカードが見つかりません。</td>`;
      document.getElementById("card-table-body").appendChild(noResultsRow);
    } else {
      noResultsRow.style.display = "";
    }
  } else if (noResultsRow) {
    noResultsRow.style.display = "none";
  }
}

// 7. Update overall statistics and progress bars (In-place properties updates)
function updateStats() {
  const classes = ["standard", "mega", "giga"];
  
  classes.forEach(classType => {
    const list = getActiveVersionCards(classType);
    let acquired = 0;
    
    list.forEach(card => {
      const cardKey = card.no;
      if (appPossession[classType][cardKey]) acquired++;
    });

    const total = list.length;
    const percent = total > 0 ? Math.round((acquired / total) * 100) : 0;

    // Update Text
    const valElem = document.getElementById(`stat-${classType}-val`);
    if (valElem) {
      valElem.innerHTML = `${acquired} <span>/ ${total}</span>`;
    }

    // Update Fill Bar Width
    const fillElem = document.getElementById(`stat-${classType}-fill`);
    if (fillElem) {
      fillElem.style.width = `${percent}%`;
    }
  });
}

// 8. Synchronize all UI states from current memory state
function syncAllUIFromState() {
  const classes = ["standard", "mega", "giga", "blank", "gentei"];
  classes.forEach(classType => {
    const list = CARD_DATABASE[classType] || [];
    list.forEach(card => {
      const cardKey = classType === "gentei" ? card.name : card.no;
      updateChecklistRow(classType, cardKey);
    });
  });

  // Update flowchart elements
  if (typeof syncFlowchartChips === "function") {
    syncFlowchartChips();
  }

  // Update monster book drop states
  MONSTER_DATABASE.forEach(monster => {
    monster.drop_cards.forEach(dc => {
      updateMonsterBookDrop(dc.classType, dc.no);
    });
  });

  // Update statistics
  updateStats();
}

// 9. Bind Search and Filter Chips
function bindFilters() {
  const searchInput = document.getElementById("card-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value;
      applyFiltersAndSearch();
    });
  }

  document.querySelectorAll(".filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      currentClassFilter = chip.getAttribute("data-class");
      applyFiltersAndSearch();
    });
  });
}

// 10. Bind Action Buttons (Including Export & Import)
function bindActions() {
  // Reset
  const resetBtn = document.getElementById("btn-reset-default");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("カードの所持状況をユーザー様指定の31枚未所持状態にリセットしますか？\n(手動で変更したチェックは初期化されます)")) {
        initializeState(true);
        applyTribeTheme(activeTribe);
        buildChecklistDOM();
        syncAllUIFromState();
      }
    });
  }

  // Check all
  const checkAllBtn = document.getElementById("btn-check-all");
  if (checkAllBtn) {
    checkAllBtn.addEventListener("click", () => {
      if (confirm("すべてのカードを所持状態に設定しますか？")) {
        Object.keys(appPossession).forEach(classType => {
          Object.keys(appPossession[classType]).forEach(key => {
            appPossession[classType][key] = true;
          });
        });
        saveState();
        syncAllUIFromState();
      }
    });
  }

  // Export Progress
  const exportBtn = document.getElementById("btn-export");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      try {
        const dataStr = JSON.stringify({
          tribe: activeTribe,
          possession: appPossession
        }, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `ryusei2_card_progress_${activeTribe}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        console.log("Exported progress successfully.");
      } catch (e) {
        alert("データ書き出し中にエラーが発生しました: " + e.message);
      }
    });
  }

  // Import Trigger
  const importBtn = document.getElementById("btn-import");
  const fileInput = document.getElementById("import-file-input");
  
  if (importBtn && fileInput) {
    importBtn.addEventListener("click", () => {
      fileInput.click();
    });

    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(event) {
        try {
          const parsed = JSON.parse(event.target.result);
          const validated = validateAndSanitizeState(parsed);
          
          if (!validated) {
            alert("無効なファイル形式です。セーブデータの項目が見つかりません。");
            return;
          }

          if (confirm("ファイルを読み込み、現在の進捗状況を復元しますか？")) {
            appPossession = validated.possession;
            activeTribe = validated.tribe;
            applyTribeTheme(activeTribe);
            saveState();
            buildChecklistDOM();
            syncAllUIFromState();
            alert("進捗データを正常にインポートしました！");
          }
        } catch (err) {
          alert("ファイルの解析中にエラーが発生しました: " + err.message);
        }
        // Reset file input so same file can be selected again
        fileInput.value = "";
      };
      reader.readAsText(file);
    });
  }

  // Tribe radios choice
  const tribeRadios = document.querySelectorAll('input[name="tribe-choice"]');
  tribeRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      activeTribe = e.target.value;
      applyTribeTheme(activeTribe);
      saveState();
      buildChecklistDOM();
      syncAllUIFromState();
    });
  });
}

// Dynamic location-to-map helper
let MAP_LOCATION_DB = {};
let MONSTER_DATABASE = [];

function buildMonsterDatabase() {
  MAP_LOCATION_DB = {};
  MONSTER_DATABASE = [];
  
  const virusMap = new Map();
  const bossMap = new Map();
  
  // Helper to determine parent map from location string
  function getParentMap(locStr) {
    if (!locStr) return "その他";
    if (locStr.includes("コダマタウン") || locStr.includes("スバル") || locStr.includes("イヌごや") || locStr.includes("ポスト") || locStr.includes("カンバン") || locStr.includes("パソコン") || locStr.includes("タンス") || locStr.includes("テレビ") || locStr.includes("ゴン太") || locStr.includes("キザマロ") || locStr.includes("ＢＩＧＷＡＶＥ") || locStr.includes("ワゴン") || locStr.includes("ふみだい") || locStr.includes("ハコ")) {
      return "コダマタウン";
    }
    if (locStr.includes("ロッポンドー") || locStr.includes("ヒルズ") || locStr.includes("ＴＫタワー") || locStr.includes("ディスプレイ") || locStr.includes("ショッピングプラザ") || locStr.includes("カメラ") || locStr.includes("えいがかん") || locStr.includes("アンテナ") || locStr.includes("びじゅつかん") || locStr.includes("システム") || locStr.includes("双眼鏡") || locStr.includes("そうがんきょう")) {
      return "ロッポンドーヒルズ";
    }
    if (locStr.includes("ヤエバ") || locStr.includes("リゾート") || locStr.includes("噴水") || locStr.includes("ふんすい") || locStr.includes("ユキダルマ") || locStr.includes("グルメタウン") || locStr.includes("フランクフルト") || locStr.includes("こおりのぞう") || locStr.includes("モニター") || locStr.includes("パネル") || locStr.includes("スウィートルーム") || locStr.includes("ベッド") || locStr.includes("ゲレンデ") || locStr.includes("リフト")) {
      return "ヤエバリゾート";
    }
    if (locStr.includes("ドンブラー") || locStr.includes("クック") || locStr.includes("展望台") || locStr.includes("てんぼうだい") || locStr.includes("いりえ") || locStr.includes("ひつじ") || locStr.includes("オンスイ") || locStr.includes("カンムリ") || locStr.includes("タコ") || locStr.includes("ちんぼつせん")) {
      return "ドンブラー湖";
    }
    if (locStr.includes("ナンスカ") || locStr.includes("イワ") || locStr.includes("いせき") || locStr.includes("地上絵") || locStr.includes("ちじょうえ") || locStr.includes("トンボ") || locStr.includes("しょくだい") || locStr.includes("オトメ") || locStr.includes("電脳")) {
      return "ナンスカ";
    }
    if (locStr.includes("ムーたいりく") || locStr.includes("しんかん") || locStr.includes("へいしの間") || locStr.includes("ゆりかごの間") || locStr.includes("エランド") || locStr.includes("モンショウ") || locStr.includes("アジト")) {
      return "ムー";
    }
    if (locStr.includes("バミューダ") || locStr.includes("ラビリンス")) {
      return "バミューダラビリンス";
    }
    if (locStr.includes("裏")) {
      return "裏世界";
    }
    if (locStr.includes("じげんのハザマ") || locStr.includes("ハザマ") || locStr.includes("いじげん")) {
      return "次元の狭間";
    }
    return "その他";
  }
  
  // Helper to determine element from card name or virus name
  function getElementByName(name) {
    const fireRegex = /ヒート|フレイム|モエ|オックス|炎/i;
    const waterRegex = /アイス|バブル|スノー|ピラニア|ゲキリュウ|水|アクア/i;
    const elecRegex = /プラズマ|ボルティック|ジェミニ|電気|サンダー/i;
    const woodRegex = /ウッド|ジャングル|モノソード|コガラシ|木/i;
    
    if (fireRegex.test(name)) return "炎";
    if (waterRegex.test(name)) return "水";
    if (elecRegex.test(name)) return "電気";
    if (woodRegex.test(name)) return "木";
    return "無";
  }
  
  // 1. Parse Standard Cards for Viruses
  CARD_DATABASE.standard.forEach(card => {
    if (card.virus && card.virus !== "所持ウイルスなし") {
      const vName = card.virus;
      const vLocRaw = card.virus_loc || "";
      
      const vLocLines = vLocRaw.split(/\n+/).map(l => l.trim()).filter(Boolean);
      
      vLocLines.forEach(loc => {
        MAP_LOCATION_DB[loc] = getParentMap(loc);
      });
      
      if (!virusMap.has(vName)) {
        virusMap.set(vName, {
          name: vName,
          element: getElementByName(card.name),
          locations: new Set(vLocLines),
          drop_cards: []
        });
      }
      
      const vObj = virusMap.get(vName);
      vLocLines.forEach(loc => vObj.locations.add(loc));
      vObj.drop_cards.push({
        no: card.no,
        name: card.name,
        classType: "standard"
      });
    }
  });
  
  // 2. Parse Mega Cards for Bosses
  CARD_DATABASE.mega.forEach(card => {
    if (card.boss) {
      const bName = card.boss;
      const bLocRaw = card.loc || "";
      const bLocLines = bLocRaw.split(/\n+/).map(l => l.trim()).filter(Boolean);
      
      bLocLines.forEach(loc => {
        MAP_LOCATION_DB[loc] = getParentMap(loc);
      });
      
      if (!bossMap.has(bName)) {
        bossMap.set(bName, {
          name: bName,
          element: getElementByName(card.name),
          locations: new Set(bLocLines),
          drop_cards: []
        });
      }
      
      const bObj = bossMap.get(bName);
      bLocLines.forEach(loc => bObj.locations.add(loc));
      bObj.drop_cards.push({
        no: card.no,
        name: card.name,
        classType: "mega"
      });
    }
  });
  
  // Convert Maps to Lists
  let count = 1;
  virusMap.forEach(v => {
    MONSTER_DATABASE.push({
      no: count++,
      name: v.name,
      element: v.element,
      locations: Array.from(v.locations),
      drop_cards: v.drop_cards
    });
  });
  
  bossMap.forEach(b => {
    MONSTER_DATABASE.push({
      no: count++,
      name: b.name,
      element: b.element,
      locations: Array.from(b.locations),
      drop_cards: b.drop_cards
    });
  });
}

function getLocationTagHtml(locationStr) {
  if (!locationStr || locationStr === "所持ウイルスなし") return "-";
  const locations = locationStr.split(/\n+/).map(l => l.trim()).filter(Boolean);
  return locations.map(loc => {
    const parentMap = MAP_LOCATION_DB[loc] || "その他";
    return `<span class="location-tag" data-map="${parentMap}" onclick="event.stopPropagation();">${loc}</span>`;
  }).join(" ");
}

// Render the Monster Book tab
function renderMonsterBook() {
  const container = document.getElementById("monster-grid-container");
  if (!container) return;
  
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const q = currentSearchQuery.toLowerCase().trim();
  
  MONSTER_DATABASE.forEach(monster => {
    // Search filter
    const dropCardsText = monster.drop_cards.map(c => c.name).join(" ");
    const locText = monster.locations.join(" ");
    const searchData = `${monster.name} ${monster.element} ${dropCardsText} ${locText}`.toLowerCase();
    
    if (q && !searchData.includes(q)) return;
    
    const div = document.createElement("div");
    div.className = `monster-card elem-${monster.element}`;
    div.id = `monster-card-${monster.no}`;
    div.setAttribute("data-monster-name", monster.name);
    div._searchData = searchData; // Cache for fast filtering
    
    let dropHtml = "";
    monster.drop_cards.forEach(dc => {
      const cardKey = dc.no;
      const isAcq = !!appPossession[dc.classType][cardKey];
      const displayNo = String(cardKey).padStart(3, '0');
      
      dropHtml += `
        <div class="monster-drop-info monster-drop-${dc.classType}-${cardKey} ${isAcq ? 'acquired' : 'missing'}"
             onclick="event.stopPropagation(); toggleCard('${dc.classType}', '${cardKey}')"
             title="クリックで所持状況を切り替え">
          <span class="drop-card-no">No.${displayNo}</span>
          <span class="drop-card-name">${dc.name}</span>
          <span class="drop-status-badge">${isAcq ? 'GET!' : 'WANTED'}</span>
        </div>
      `;
    });
    
    const locationTags = monster.locations.map(loc => {
      const parentMap = MAP_LOCATION_DB[loc] || "その他";
      return `<span class="location-tag" data-map="${parentMap}" onclick="event.stopPropagation();">${loc}</span>`;
    }).join("");
    
    div.innerHTML = `
      <div class="monster-card-header">
        <span class="monster-no">No.${String(monster.no).padStart(2, '0')}</span>
        <span class="monster-name">${monster.name}</span>
        <span class="monster-elem-badge badge-${monster.element}">${monster.element}</span>
      </div>
      <div class="monster-card-body">
        <div class="monster-drop-container">
          <div class="drop-label">ドロップカード:</div>
          ${dropHtml || '<span class="drop-none">なし</span>'}
        </div>
        <div class="monster-loc-container">
          <div class="loc-label">主な出現場所:</div>
          <div class="monster-loc-list">
            ${locationTags || '<span class="loc-none">不明 / イベント</span>'}
          </div>
        </div>
      </div>
    `;
    
    fragment.appendChild(div);
  });
  
  if (fragment.children.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">該当するウイルスが見つかりません。</div>`;
  } else {
    container.appendChild(fragment);
  }
}

// Update single monster drop badge in-place (O(1))
function updateMonsterBookDrop(classType, cardKey) {
  const badges = document.querySelectorAll(`.monster-drop-${classType}-${cardKey}`);
  badges.forEach(badge => {
    const isAcq = !!appPossession[classType][cardKey];
    if (isAcq) {
      badge.classList.add("acquired");
      badge.classList.remove("missing");
      const status = badge.querySelector(".drop-status-badge");
      if (status) status.textContent = "GET!";
    } else {
      badge.classList.add("missing");
      badge.classList.remove("acquired");
      const status = badge.querySelector(".drop-status-badge");
      if (status) status.textContent = "WANTED";
    }
  });
}

// Navigate to Monster Book, scroll and highlight
function gotoMonsterBook(virusName) {
  if (!virusName) return;
  switchTab('monsterbook');
  
  // Clear search
  const searchInput = document.getElementById("card-search");
  if (searchInput) {
    searchInput.value = "";
    currentSearchQuery = "";
  }
  renderMonsterBook();
  
  // Find card
  const cards = document.querySelectorAll(".monster-card");
  let targetCard = null;
  const normSearch = virusName.replace(/\s+/g, "").toLowerCase();
  
  for (let card of cards) {
    const cardName = card.getAttribute("data-monster-name");
    if (cardName && cardName.replace(/\s+/g, "").toLowerCase() === normSearch) {
      targetCard = card;
      break;
    }
  }
  
  if (targetCard) {
    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    targetCard.classList.add("highlight-glowing");
    setTimeout(() => {
      targetCard.classList.remove("highlight-glowing");
    }, 2000);
  }
}

// 6. Fast Search & Filter (O(N) layout changes, takes less than 1ms for N=219)
function applyFiltersAndSearch() {
  const rows = document.querySelectorAll("#card-table-body tr.card-row");
  const q = currentSearchQuery.toLowerCase().trim();
  let matchesFound = 0;

  rows.forEach(tr => {
    const classType = tr.getAttribute("data-class");
    
    // Class Filter Check
    const matchClass = currentClassFilter === "all" || currentClassFilter === classType;
    
    // Search Query Check
    const matchSearch = !q || tr._searchData.includes(q);

    if (matchClass && matchSearch) {
      tr.style.display = "";
      matchesFound++;
    } else {
      tr.style.display = "none";
    }
  });

  // Filter monster book
  const monsterCards = document.querySelectorAll(".monster-card");
  monsterCards.forEach(card => {
    const matchSearch = !q || card._searchData.includes(q);
    if (matchSearch) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });

  // Toggle no results row
  let noResultsRow = document.getElementById("no-results-row");
  if (matchesFound === 0) {
    if (!noResultsRow) {
      noResultsRow = document.createElement("tr");
      noResultsRow.id = "no-results-row";
      noResultsRow.innerHTML = `<td colspan="5" style="text-align: center; color: var(--text-muted); padding: 40px;">該当するカードが見つかりません。</td>`;
      document.getElementById("card-table-body").appendChild(noResultsRow);
    } else {
      noResultsRow.style.display = "";
    }
  } else if (noResultsRow) {
    noResultsRow.style.display = "none";
  }
}

// 11. Document Ready Init
document.addEventListener("DOMContentLoaded", () => {
  initializeState();
  buildMonsterDatabase();
  buildChecklistDOM();
  applyTribeTheme(activeTribe);
  
  // Render flowchart once on startup
  if (typeof renderFlowchartContainerOnce === "function") {
    renderFlowchartContainerOnce("flowchart-renderer-container", (classType, cardNo) => {
      toggleCard(classType, cardNo);
    });
  }
  
  updateStats();
  applyFiltersAndSearch();
  bindFilters();
  bindActions();
  
  switchTab(activeTab);
});

// ============================================================
// DOM-based tooltip system for .source-more-tag
// Handles both PC hover and mobile tap, with smart positioning
// ============================================================
let activeSourceTooltip = null;
let activeSourceTag = null;

function showSourceTooltip(tag) {
  hideSourceTooltip();
  const text = tag.getAttribute('data-tooltip');
  if (!text) return;

  const popup = document.createElement('div');
  popup.className = 'source-tooltip-popup';
  popup.textContent = text;
  document.body.appendChild(popup);
  activeSourceTooltip = popup;
  activeSourceTag = tag;

  // Position: prefer above the badge, fall back to below if no space
  const rect = tag.getBoundingClientRect();
  const popW = Math.min(320, window.innerWidth - 24);
  const MARGIN = 8;

  // Horizontal: align right edge with badge right, but keep within viewport
  let left = rect.right - popW;
  if (left < MARGIN) left = MARGIN;
  if (left + popW > window.innerWidth - MARGIN) left = window.innerWidth - MARGIN - popW;

  // Vertical: place above if room, else below
  popup.style.maxWidth = popW + 'px';
  popup.style.left = left + 'px';
  popup.style.top = '-9999px'; // temp to measure height
  popup.style.visibility = 'hidden';

  requestAnimationFrame(() => {
    const popH = popup.offsetHeight;
    let top;
    if (rect.top - popH - MARGIN >= 0) {
      // Enough space above: show above the badge
      top = rect.top - popH - MARGIN;
    } else {
      // Not enough space above: show below the badge
      top = rect.bottom + MARGIN;
    }
    popup.style.top = top + 'px';
    popup.style.visibility = 'visible';
  });
}

function hideSourceTooltip() {
  if (activeSourceTooltip) {
    activeSourceTooltip.remove();
    activeSourceTooltip = null;
    activeSourceTag = null;
  }
}

// PC: hover
document.addEventListener('mouseover', (e) => {
  const tag = e.target.closest('.source-more-tag');
  if (tag) {
    showSourceTooltip(tag);
  }
}, { passive: true });

document.addEventListener('mouseout', (e) => {
  const tag = e.target.closest('.source-more-tag');
  if (tag && !tag.contains(e.relatedTarget)) {
    hideSourceTooltip();
  }
}, { passive: true });

// Mobile & General Click: tap to toggle
document.addEventListener('click', (e) => {
  const sourceTag = e.target.closest('.source-more-tag');
  const locTag = e.target.closest('.location-tag');

  if (sourceTag) {
    if (activeSourceTag === sourceTag) {
      hideSourceTooltip();
    } else {
      showSourceTooltip(sourceTag);
    }
    e.stopPropagation();
  } else if (!e.target.closest('.source-tooltip-popup')) {
    hideSourceTooltip();
  }

  // Location tag toggle
  if (locTag) {
    locTag.classList.toggle('tooltip-active');
  } else {
    document.querySelectorAll('.location-tag.tooltip-active').forEach(t => {
      t.classList.remove('tooltip-active');
    });
  }
});


