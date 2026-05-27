// Global state for application
const STORAGE_KEY = "ryusei2_checker_possession_v1";

// User's specified missing standard cards
const DEFAULT_MISSING_STD_NOS = [
  3, 5, 11, 17, 27, 28, 30, 41, 53, 57, 61, 65, 67, 71, 74, 83, 86, 89, 96, 102, 103, 107, 110, 113, 116, 119, 128, 133, 140, 144, 145
];

let appPossession = {};
let currentClassFilter = "all";
let currentSearchQuery = "";

// 1. Initialize State
function initializeState(forceResetDefault = false) {
  const savedState = localStorage.getItem(STORAGE_KEY);
  
  if (savedState && !forceResetDefault) {
    try {
      appPossession = JSON.parse(savedState);
      return;
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

  saveState();
}

// Save progress to localStorage
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appPossession));
}

// Global API exposure for flowchart integration
window.appState = {
  isAcquired: (classType, cardKey) => {
    if (appPossession[classType]) {
      return !!appPossession[classType][cardKey];
    }
    return false;
  }
};

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
    
    // 3. Update overall stats in-place
    updateStats();
  }
}

// 3. Tab Switching
function switchTab(tabId) {
  document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));
  
  const classFilterBar = document.getElementById("class-filter-bar");
  
  if (tabId === 'checklist') {
    document.getElementById("tab-btn-checklist").classList.add("active");
    document.getElementById("tab-content-checklist").classList.add("active");
    classFilterBar.style.display = "flex";
  } else if (tabId === 'flowchart') {
    document.getElementById("tab-btn-flowchart").classList.add("active");
    document.getElementById("tab-content-flowchart").classList.add("active");
    classFilterBar.style.display = "none";
  }
}

// 4. Build Checklist DOM once on startup
function buildChecklistDOM() {
  const tbody = document.getElementById("card-table-body");
  if (!tbody) return;

  tbody.innerHTML = "";
  
  const fragment = document.createDocumentFragment();
  const classes = ["standard", "mega", "giga", "blank", "gentei"];

  classes.forEach(classType => {
    const list = CARD_DATABASE[classType] || [];
    
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
          <div class="virus-name-badge">${virus}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">${virus_loc}</div>
        `;
      } else if (classType === "mega") {
        tdVirus.innerHTML = `
          <div class="virus-name-badge" style="background: rgba(168, 85, 247, 0.1); color: var(--color-mega);">${card.boss}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">${card.loc}</div>
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
    const list = CARD_DATABASE[classType] || [];
    let acquired = 0;
    
    list.forEach(card => {
      if (appPossession[classType][card.no]) acquired++;
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
        const dataStr = JSON.stringify(appPossession, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'ryusei2_card_progress.json';
        
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
          
          // Basic validation to check keys
          const requiredKeys = ["standard", "mega", "giga", "blank", "gentei"];
          const hasKeys = requiredKeys.every(k => parsed.hasOwnProperty(k));
          
          if (!hasKeys) {
            alert("無効なファイル形式です。セーブデータの項目が見つかりません。");
            return;
          }

          if (confirm("ファイルを読み込み、現在の進捗状況を復元しますか？")) {
            appPossession = parsed;
            saveState();
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
}

// 11. Document Ready Init
document.addEventListener("DOMContentLoaded", () => {
  initializeState();
  buildChecklistDOM();
  
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
});
