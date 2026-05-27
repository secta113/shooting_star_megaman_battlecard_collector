// -*- coding: utf-8 -*-
// app.js - Ryusei no Rockman 1 Card Checker Logic

const STORAGE_KEY = "ryusei1_checker_possession_v1";

let appPossession = {};
let currentClassFilter = "all";
let currentSearchQuery = "";
let activeTab = "flowchart";
let activeSatellite = "pegasus"; // "pegasus", "leo", "dragon"

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
function initializeState(forceResetDefault = false) {
  const savedState = localStorage.getItem(STORAGE_KEY);
  
  if (savedState && !forceResetDefault) {
    try {
      const data = JSON.parse(savedState);
      appPossession = data.possession || data; // handle wrapped or unwrapped structure
      activeSatellite = data.satellite || "pegasus";
      
      // Ensure all classes exist
      if (!appPossession.standard) appPossession.standard = {};
      if (!appPossession.mega) appPossession.mega = {};
      if (!appPossession.giga) appPossession.giga = {};
      if (!appPossession.bokutai) appPossession.bokutai = {};
      if (!appPossession.gentei) appPossession.gentei = {};
      
      return;
    } catch (e) {
      console.error("Failed to parse saved state, resetting...", e);
    }
  }

  // Create fresh state (all false/unchecked)
  appPossession = {
    standard: {},
    mega: {},
    giga: {},
    bokutai: {},
    gentei: {}
  };
  activeSatellite = "pegasus";

  // Standard cards init (1-150): "初期フォルダ" cards are set to true, others to false
  CARD_DATABASE.standard.forEach(card => {
    const isDefaultPossessed = card.source && card.source.includes("初期フォルダ");
    appPossession.standard[card.no] = !!isDefaultPossessed;
  });

  // Mega, Giga, Bokutai, Event cards init by Name to avoid version duplication issues
  CARD_DATABASE.mega.forEach(card => {
    appPossession.mega[card.name] = false;
  });

  CARD_DATABASE.giga.forEach(card => {
    appPossession.giga[card.name] = false;
  });

  CARD_DATABASE.bokutai.forEach(card => {
    appPossession.bokutai[card.name] = false;
  });

  CARD_DATABASE.gentei.forEach(card => {
    appPossession.gentei[card.name] = false;
  });

  saveState();
}

// Save progress to localStorage
function saveState() {
  const data = {
    satellite: activeSatellite,
    possession: appPossession
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Apply theme class to document
function applySatelliteTheme(satellite) {
  document.documentElement.setAttribute("data-satellite", satellite);
  
  // Update Radio input checked state
  const radio = document.querySelector(`input[name="satellite-choice"][value="${satellite}"]`);
  if (radio) {
    radio.checked = true;
    document.querySelectorAll('.satellite-opt').forEach(lbl => {
      if (lbl.getAttribute('data-sat') === satellite) {
        lbl.classList.add('active');
      } else {
        lbl.classList.remove('active');
      }
    });
  }
  
  // Update Emblem Icon
  const emblem = document.getElementById("logo-emblem");
  if (emblem) {
    if (satellite === "pegasus") emblem.textContent = "❄️";
    else if (satellite === "leo") emblem.textContent = "🔥";
    else if (satellite === "dragon") emblem.textContent = "🌳";
  }
}

// Get filtered mega/giga cards based on active satellite
function getActiveVersionCards(classType) {
  const fullList = CARD_DATABASE[classType];
  if (!fullList) return [];
  
  if (classType === "mega") {
    // 0-26 (No.1-27) are common
    const common = fullList.slice(0, 27);
    
    // Satellites occupy 27-29 (Peg), 30-32 (Leo), 33-35 (Dra)
    let satCards = [];
    if (activeSatellite === "pegasus") satCards = fullList.slice(27, 30);
    else if (activeSatellite === "leo") satCards = fullList.slice(30, 33);
    else if (activeSatellite === "dragon") satCards = fullList.slice(33, 36);
    
    return [...common, ...satCards];
  }
  
  if (classType === "giga") {
    // Giga has 5 cards per version.
    // 0-4: Peg, 5-9: Leo, 10-14: Dra
    if (activeSatellite === "pegasus") return fullList.slice(0, 5);
    if (activeSatellite === "leo") return fullList.slice(5, 10);
    if (activeSatellite === "dragon") return fullList.slice(10, 15);
  }
  
  return fullList;
}

// 2. Toggle Possession Status (O(1) DOM updates where possible)
function toggleCard(classType, cardKey) {
  if (appPossession[classType]) {
    appPossession[classType][cardKey] = !appPossession[classType][cardKey];
    saveState();
    
    // Update stats and check/flow UI
    updateStats();
    
    if (activeTab === "flowchart") {
      if (classType === "standard") {
        updateFlowchartChip(cardKey);
      }
    } else if (activeTab === "checklist") {
      updateChecklistRow(classType, cardKey);
    } else if (activeTab === "monsterbook") {
      // Re-render book because changes could change badge color
      renderMonsterBook();
    }
  }
}

// Helper to normalize card names for matching
function normalizeCardName(name) {
  if (!name) return "";
  return name.replace(/[\s\-\u30fc]+/g, "").toLowerCase();
}

// Helper to normalize virus names for matching (handles full-width chars)
function normalizeVirusName(name) {
  if (!name) return "";
  const d = {
    '\uff10': '0', '\uff11': '1', '\uff12': '2', '\uff13': '3', '\uff14': '4',
    '\uff15': '5', '\uff16': '6', '\uff17': '7', '\uff18': '8', '\uff19': '9',
    '\uff21': 'A', '\uff22': 'B', '\uff23': 'C', '\uff24': 'D', '\uff25': 'E',
    '\uff26': 'F', '\uff27': 'G', '\uff28': 'H', '\uff29': 'I', '\uff2a': 'J',
    '\uff2b': 'K', '\uff2c': 'L', '\uff2d': 'M', '\uff2e': 'N', '\uff2f': 'O',
    '\uff30': 'P', '\uff31': 'Q', '\uff32': 'R', '\uff33': 'S', '\uff34': 'T',
    '\uff35': 'U', '\uff36': 'V', '\uff37': 'W', '\uff38': 'X', '\uff39': 'Y',
    '\uff3a': 'Z',
    '\uff0d': '\u30fc', '\u30fc': '\u30fc',
    '\uff1f': '?', '\uff01': '!'
  };
  let s = "";
  for (let i = 0; i < name.length; i++) {
    const c = name[i];
    s += d[c] || c;
  }
  return s.replace(/\s+/g, "").toLowerCase();
}

// Look up a card in standard/mega/giga/gentei/bokutai database
function findCardByName(cardName) {
  if (!cardName || cardName === "なし") return null;
  const normName = normalizeCardName(cardName);
  const classes = ["standard", "mega", "giga", "bokutai", "gentei"];
  for (let cl of classes) {
    const found = CARD_DATABASE[cl].find(c => normalizeCardName(c.name) === normName);
    if (found) {
      return { card: found, classType: cl };
    }
  }
  return null;
}

// Render the Monster Book tab
function renderMonsterBook() {
  const container = document.getElementById("monster-grid-container");
  if (!container) return;
  
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const q = currentSearchQuery.toLowerCase().trim();
  
  MONSTER_DATABASE.forEach(monster => {
    // Clone monster data so we don't modify static database
    let m = { ...monster };
    
    // Dynamic Satellite Boss adjustment for No. 97
    if (m.no === 97) {
      if (activeSatellite === "pegasus") {
        m.name = "ペガサス・マジック";
        m.element = "水";
        m.drop_card = "ペガサスマジック";
        m.drop_cards = ["ペガサスマジック", "ペガサスマジックＥＸ", "ペガサスマジックＳＰ"];
      } else if (activeSatellite === "leo") {
        m.name = "レオ・キングダム";
        m.element = "火";
        m.drop_card = "レオキングダム";
        m.drop_cards = ["レオキングダム", "レオキングダムＥＸ", "レオキングダムＳＰ"];
      } else if (activeSatellite === "dragon") {
        m.name = "ドラゴン・スカイ";
        m.element = "木";
        m.drop_card = "ドラゴンスカイ";
        m.drop_cards = ["ドラゴンスカイ", "ドラゴンスカイＥＸ", "ドラゴンスカイＳＰ"];
      }
    }
    
    // Dynamic Satellite Boss Shadow adjustment for No. 98
    if (m.no === 98) {
      if (activeSatellite === "pegasus") {
        m.name = "ペガサス・マジック シャドウ";
        m.element = "水";
      } else if (activeSatellite === "leo") {
        m.name = "レオ・キングダム シャドウ";
        m.element = "火";
      } else if (activeSatellite === "dragon") {
        m.name = "ドラゴン・スカイ シャドウ";
        m.element = "木";
      }
    }
    
    // Search filter
    const dropCardsText = m.drop_cards ? m.drop_cards.join(" ") : (m.drop_card || "なし");
    const locText = m.locations.map(l => l.name).join(" ");
    const searchData = `${m.name} ${m.element} ${dropCardsText} ${locText}`.toLowerCase();
    if (q && !searchData.includes(q)) return;
    
    // Create card element
    const div = document.createElement("div");
    div.className = `monster-card elem-${m.element}`;
    div.id = `monster-card-${m.no}`;
    div.setAttribute("data-monster-name", m.name);
    
    // Render drop cards HTML
    let dropHtml = "";
    if (m.drop_cards && m.drop_cards.length > 0) {
      m.drop_cards.forEach(cardName => {
        const cardInfo = findCardByName(cardName);
        if (cardInfo) {
          const { card, classType } = cardInfo;
          const cardKey = classType === "standard" ? card.no : card.name;
          const isAcq = !!appPossession[classType][cardKey];
          const displayNo = classType === "gentei" ? "---" : String(card.no).padStart(3, '0');
          
          dropHtml += `
            <div class="monster-drop-info ${isAcq ? 'acquired' : 'missing'}" 
                 onclick="event.stopPropagation(); toggleCard('${classType}', '${cardKey}')" 
                 title="クリックで所持状況を切り替え">
              <span class="drop-card-no">No.${displayNo}</span>
              <span class="drop-card-name">${card.name}</span>
              <span class="drop-status-badge">${isAcq ? 'GET!' : 'WANTED'}</span>
            </div>
          `;
        } else {
          dropHtml += `
            <div class="monster-drop-info missing">
              <span class="drop-card-name">${cardName}</span>
            </div>
          `;
        }
      });
    } else {
      const cardInfo = findCardByName(m.drop_card);
      if (cardInfo) {
        const { card, classType } = cardInfo;
        const cardKey = classType === "standard" ? card.no : card.name;
        const isAcq = !!appPossession[classType][cardKey];
        const displayNo = classType === "gentei" ? "---" : String(card.no).padStart(3, '0');
        
        dropHtml = `
          <div class="monster-drop-info ${isAcq ? 'acquired' : 'missing'}" 
               onclick="event.stopPropagation(); toggleCard('${classType}', '${cardKey}')" 
               title="クリックで所持状況を切り替え">
            <span class="drop-card-no">No.${displayNo}</span>
            <span class="drop-card-name">${card.name}</span>
            <span class="drop-status-badge">${isAcq ? 'GET!' : 'WANTED'}</span>
          </div>
        `;
      } else {
        dropHtml = `
          <div class="monster-drop-info missing">
            <span class="drop-card-name">${m.drop_card || "なし"}</span>
          </div>
        `;
      }
    }
    
    // Render location tags HTML (matching Ryusei 3 style)
    const locationTags = m.locations.map(loc => {
      return `<span class="location-tag" data-map="${loc.map}" onclick="event.stopPropagation();">${loc.name}</span>`;
    }).join("");
    
    div.innerHTML = `
      <div class="monster-card-header">
        <span class="monster-no">No.${String(m.no).padStart(3, '0')}</span>
        <span class="monster-name">${m.name}</span>
        <span class="monster-elem-badge badge-${m.element}">${m.element}</span>
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

// Navigate to Monster Book tab, scroll to monster, and highlight it
window.gotoMonsterBook = (virusName) => {
  switchTab('monsterbook');

  // Clear search so all monsters are visible
  const searchInput = document.getElementById("card-search");
  if (searchInput) {
    searchInput.value = "";
    currentSearchQuery = "";
  }
  renderMonsterBook();

  // Find the matching monster card by normalized name
  const cards = document.querySelectorAll(".monster-card");
  let targetCard = null;
  const normSearch = normalizeVirusName(virusName);
  for (let card of cards) {
    const cardName = card.getAttribute("data-monster-name");
    if (normalizeVirusName(cardName) === normSearch) {
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
};

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
    renderChecklist();
  } else if (tabId === 'flowchart') {
    document.getElementById("tab-btn-flowchart").classList.add("active");
    document.getElementById("tab-content-flowchart").classList.add("active");
    if (classFilterBar) classFilterBar.style.display = "none";
    
    // Render static flowchart markup once, then sync
    if (typeof renderFlowchartContainerOnce === "function") {
      renderFlowchartContainerOnce("flowchart-renderer-container", (classType, cardNo) => {
        toggleCard(classType, cardNo);
      });
    }
    syncFlowchartChips();
  } else if (tabId === 'monsterbook') {
    document.getElementById("tab-btn-monsterbook").classList.add("active");
    document.getElementById("tab-content-monsterbook").classList.add("active");
    if (classFilterBar) classFilterBar.style.display = "none";
    renderMonsterBook();
  }
}

// 4. Build Checklist DOM (Table View)
function renderChecklist() {
  const tbody = document.getElementById("card-table-body");
  if (!tbody) return;

  tbody.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const q = currentSearchQuery.toLowerCase().trim();

  // Gather cards to render
  let allCardsToRender = [];
  
  const addClassType = (type, badgeLabel) => {
    const list = getActiveVersionCards(type);
    list.forEach(c => {
      allCardsToRender.push({
        ...c,
        classType: type,
        badgeLabel: badgeLabel
      });
    });
  };
  
  if (currentClassFilter === "all" || currentClassFilter === "standard") {
    addClassType("standard", "Std");
  }
  if (currentClassFilter === "all" || currentClassFilter === "mega") {
    addClassType("mega", "Mega");
  }
  if (currentClassFilter === "all" || currentClassFilter === "giga") {
    addClassType("giga", "Giga");
  }
  if (currentClassFilter === "all" || currentClassFilter === "bokutai") {
    addClassType("bokutai", "Bokutai");
  }
  if (currentClassFilter === "all" || currentClassFilter === "gentei") {
    addClassType("gentei", "Event");
  }

  // Filter
  const filtered = allCardsToRender.filter(c => {
    if (!q) return true;
    
    const noStr = c.classType === "gentei" ? "---" : String(c.no);
    const name = c.name || "";
    const source = c.source || "";
    const virus = c.virus || "";
    const virus_loc = c.virus_loc || "";
    const searchData = `${noStr} ${name} ${source} ${virus} ${virus_loc}`.toLowerCase();
    
    return searchData.includes(q);
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 40px;">該当するカードがありません。</td></tr>`;
    return;
  }

  filtered.forEach(card => {
    const cardKey = card.classType === "standard" ? card.no : card.name;
    const isAcquired = !!appPossession[card.classType][cardKey];

    // Create row element
    const tr = document.createElement("tr");
    tr.className = `card-row ${isAcquired ? 'row-acquired' : 'missing'}`;
    tr.id = `card-row-${card.classType}-${cardKey}`;

    // No. Cell
    const tdNo = document.createElement("td");
    tdNo.className = "card-no-cell";
    let displayNo = card.classType === "gentei" ? "---" : String(card.no).padStart(3, '0');
    tdNo.innerHTML = `
      <span class="class-badge ${card.classType}">${card.badgeLabel}</span><br>
      No.${displayNo}
    `;
    tr.appendChild(tdNo);

    // Name Cell
    const tdName = document.createElement("td");
    tdName.className = "card-name-cell";
    tdName.textContent = card.name;
    tr.appendChild(tdName);

    // Source/Location Cell
    const tdSource = document.createElement("td");
    tdSource.className = "method-details";
    tdSource.textContent = card.source ? card.source.replace(/\s{2,}/g, '\n') : "ウイルスドロップのみ";
    tr.appendChild(tdSource);

    // Virus Info Cell
    const tdVirus = document.createElement("td");
    if (card.virus) {
      tdVirus.innerHTML = `
        <div class="virus-name-badge">${card.virus} <button class="btn-goto-monster" onclick="event.stopPropagation(); gotoMonsterBook('${card.virus}')" title="図鑑で出現場所を見る">👾</button></div>
        <div style="font-size: 0.8rem; color: var(--text-muted);">${card.virus_loc}</div>
      `;
    } else {
      tdVirus.innerHTML = `<span style="color:var(--text-muted);">なし</span>`;
    }
    tr.appendChild(tdVirus);

    // Checkbox Cell
    const tdCheck = document.createElement("td");
    tdCheck.className = "checkbox-cell";
    
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.className = "cyber-checkbox";
    cb.checked = isAcquired;
    cb.onchange = () => toggleCard(card.classType, cardKey);
    
    tdCheck.appendChild(cb);
    tr.appendChild(tdCheck);

    fragment.appendChild(tr);
  });

  tbody.appendChild(fragment);
}

// 5. Update single row styling (O(1) execution)
function updateChecklistRow(classType, cardKey) {
  const tr = document.getElementById(`card-row-${classType}-${cardKey}`);
  if (!tr) return;
  
  const isAcquired = !!appPossession[classType][cardKey];
  if (isAcquired) {
    tr.className = "row-acquired";
  } else {
    tr.className = "missing";
  }
  
  const cb = tr.querySelector(".cyber-checkbox");
  if (cb) {
    cb.checked = isAcquired;
  }
}

// 7. Update overall statistics and progress bars (In-place properties updates)
function updateStats() {
  // Stats bars only track Standard, Mega, Giga
  // 1. Standard (150 total)
  let stdAcq = 0;
  CARD_DATABASE.standard.forEach(c => {
    if (appPossession.standard[c.no]) stdAcq++;
  });
  document.getElementById("stat-standard-val").innerHTML = `${stdAcq} <span>/ 150</span>`;
  document.getElementById("stat-standard-fill").style.width = `${(stdAcq / 150) * 100}%`;
  
  // 2. Mega (30 total for selected version)
  const activeMega = getActiveVersionCards("mega");
  let megaAcq = 0;
  activeMega.forEach(c => {
    if (appPossession.mega[c.name]) megaAcq++;
  });
  document.getElementById("stat-mega-val").innerHTML = `${megaAcq} <span>/ 30</span>`;
  document.getElementById("stat-mega-fill").style.width = `${(megaAcq / 30) * 100}%`;
  
  // 3. Giga (5 total for selected version)
  const activeGiga = getActiveVersionCards("giga");
  let gigaAcq = 0;
  activeGiga.forEach(c => {
    if (appPossession.giga[c.name]) gigaAcq++;
  });
  document.getElementById("stat-giga-val").innerHTML = `${gigaAcq} <span>/ 5</span>`;
  document.getElementById("stat-giga-fill").style.width = `${(gigaAcq / 5) * 100}%`;
}

// 8. Synchronize all UI states
function syncAllUIFromState() {
  applySatelliteTheme(activeSatellite);
  updateStats();
  
  if (activeTab === "flowchart") {
    syncFlowchartChips();
  } else if (activeTab === "checklist") {
    renderChecklist();
  } else if (activeTab === "monsterbook") {
    renderMonsterBook();
  }
}

// 9. Bind Search and Filter Chips
function setupEventListeners() {
  // Satellite choice radio buttons
  const satRadios = document.querySelectorAll('input[name="satellite-choice"]');
  satRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      activeSatellite = e.target.value;
      applySatelliteTheme(activeSatellite);
      saveState();
      updateStats();
      if (activeTab === "checklist") renderChecklist();
      else if (activeTab === "flowchart") syncFlowchartChips();
    });
  });

  // Search input
  const searchInput = document.getElementById("card-search");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value;
      if (activeTab === "monsterbook") renderMonsterBook();
      else if (activeTab === "checklist") renderChecklist();
    });
  }

  // Class Filter chips (Checklist only)
  const filterChips = document.querySelectorAll(".filter-chip");
  filterChips.forEach(chip => {
    chip.addEventListener("click", () => {
      filterChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      currentClassFilter = chip.getAttribute("data-class");
      renderChecklist();
    });
  });

  // Action buttons
  document.getElementById("btn-reset-default").addEventListener("click", () => {
    if (confirm("すべてのカードの所持状況を未所持にリセットしますか？\n(初期所持以外のチェックは外れます)")) {
      initializeState(true);
      syncAllUIFromState();
    }
  });

  document.getElementById("btn-check-all").addEventListener("click", () => {
    if (confirm("すべてのカードを所持状態にしますか？")) {
      CARD_DATABASE.standard.forEach(c => appPossession.standard[c.no] = true);
      CARD_DATABASE.mega.forEach(c => appPossession.mega[c.name] = true);
      CARD_DATABASE.giga.forEach(c => appPossession.giga[c.name] = true);
      CARD_DATABASE.bokutai.forEach(c => appPossession.bokutai[c.name] = true);
      CARD_DATABASE.gentei.forEach(c => appPossession.gentei[c.name] = true);
      saveState();
      syncAllUIFromState();
    }
  });

  // Export Data
  document.getElementById("btn-export").addEventListener("click", () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      satellite: activeSatellite,
      possession: appPossession
    }));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `ryusei1_card_backup_${activeSatellite}.json`);
    dlAnchorElem.click();
  });

  // Import Data
  const importBtn = document.getElementById("btn-import");
  const fileInput = document.getElementById("import-file-input");
  if (importBtn && fileInput) {
    importBtn.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = function(event) {
        try {
          const parsed = JSON.parse(event.target.result);
          const pos = parsed.possession || parsed;
          if (pos.standard && pos.mega && pos.giga && pos.bokutai) {
            appPossession = pos;
            activeSatellite = parsed.satellite || activeSatellite;
            saveState();
            syncAllUIFromState();
            alert("データを正常にインポートしました！");
          } else {
            alert("無効なファイル形式です。");
          }
        } catch (err) {
          alert("ファイルの解析に失敗しました。");
        }
        fileInput.value = "";
      };
      reader.readAsText(file);
    });
  }
}

// Document Ready Initialization
document.addEventListener("DOMContentLoaded", () => {
  initializeState();
  setupEventListeners();
  syncAllUIFromState();
  switchTab(activeTab);
});
