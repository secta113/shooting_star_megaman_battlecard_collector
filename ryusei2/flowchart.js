// Flowchart definition for Megaman Star Force 2 (Ryusei no Rockman 2) cards
const FLOWCHART_AREAS = [
  {
    id: "early_game",
    title: "1. コダマタウン・ロッポンドー周辺（序盤）",
    description: "ストーリー序盤〜中盤のエリア。スカイウェーブや通常電波を探索します。",
    cards: [
      {
        no: 5,
        name: "プラズマガン２",
        detail: "コダマタウンのスカイウェーブ（ランダムエンカウント）",
        virus: "",
        virus_loc: ""
      },
      {
        no: 11,
        name: "レーダーミサイル２",
        detail: "コダマタウンのスカイウェーブ（ランダムエンカウント）",
        virus: "",
        virus_loc: ""
      },
      {
        no: 41,
        name: "オロロンハット２",
        detail: "ウイルス「オルルン」から入手",
        virus: "オルルン",
        virus_loc: "ロッポンドーヒルズの電波、ＴＫタワーの電波１・２、バミューダラビリンス"
      },
      {
        no: 61,
        name: "ネバーレイン１",
        detail: "ウイルス「ネバーラ」から入手（ムー大陸でもランダム出現）",
        virus: "ネバーラ",
        virus_loc: "ヒルズ前どおりの電波、ロッポンドーヒルズの電波、ＴＫタワーの電波１・２"
      }
    ]
  },
  {
    id: "lake_slopes",
    title: "2. ドンブラー湖・ゲレンデ周辺（中盤）",
    description: "ドンブラー湖やゲレンデなどの水・氷エリア。固定箇所の発掘も忘れずに。",
    cards: [
      {
        no: 5,
        name: "プラズマガン２（再掲）",
        detail: "ドンブラー湖１の電波（固定：電波に入ってすぐの４つ並んだサンゴの右を掘る）、ドンブラー村の電波（ランダム）",
        virus: "",
        virus_loc: ""
      },
      {
        no: 11,
        name: "レーダーミサイル２（再掲）",
        detail: "こわれたリフトの電波（固定）、ドッシーのいりえの電波（ランダム）",
        virus: "",
        virus_loc: ""
      },
      {
        no: 17,
        name: "ミニグレネード２",
        detail: "ドンブラー村のスカイウェーブ、ドッシーのいりえの電波、ドンブラー湖１の電波（ランダム）",
        virus: "",
        virus_loc: ""
      },
      {
        no: 65,
        name: "スノーボール２",
        detail: "ウイルス「スノーゴロドン」から入手",
        virus: "スノーゴロドン",
        virus_loc: "ゲレンデ１の電波、ゲレンデ２の電波"
      },
      {
        no: 67,
        name: "ピラニアキッス１",
        detail: "ウイルス「ピラニッシュ」から入手",
        virus: "ピラニッシュ",
        virus_loc: "オンスイプールの電波、ドンブラー湖１・２の電波、ミスター・タコさんの電波など"
      }
    ]
  },
  {
    id: "eland_ship",
    title: "3. エランド・モンショウ・ちんぼつせん（中盤）",
    description: "エランドやムー関連の中盤電波。特定のウイルスバトルからドロップを狙います。",
    cards: [
      {
        no: 74,
        name: "ホタルゲリ２",
        detail: "ウイルス「ホタリーン」から入手",
        virus: "ホタリーン",
        virus_loc: "エランドの電波、モンショウの電波"
      },
      {
        no: 107,
        name: "ウッドスラッシュ",
        detail: "ウイルス「モノソーディン」から入手",
        virus: "モノソーディン",
        virus_loc: "ちんぼつせんの電波、ムーのぞうの電波、しょくだいの電波"
      }
    ]
  },
  {
    id: "nanska_area",
    title: "4. ナンスカエリア（終盤）",
    description: "ストーリー終盤のメイン舞台。遺跡の探索や地上電波商人を巡ります。",
    cards: [
      {
        no: 3,
        name: "ヘビーキャノン",
        detail: "ナンスカの電波（固定：青ウェーブロード）、ナンスカいせき２の電波（ランダム）",
        virus: "",
        virus_loc: ""
      },
      {
        no: 28,
        name: "ダブルストーン",
        detail: "ナンスカちじょうえの電波の電波商人から購入",
        virus: "",
        virus_loc: ""
      },
      {
        no: 83,
        name: "モジャランス２",
        detail: "ウイルス「モジャグンソウ」から入手",
        virus: "モジャグンソウ",
        virus_loc: "ナンスカいせき１の電波、ナンスカいせき２の電波、せいなるほのおの電波"
      },
      {
        no: 89,
        name: "コガラシ２",
        detail: "ウイルス「タツマキマル」から入手",
        virus: "タツマキマル",
        virus_loc: "こわれたバスていの電波、とまったふうしゃの電波、ナンスカノオトメの電脳"
      },
      {
        no: 110,
        name: "モアイフォール２",
        detail: "ウイルス「ストーンヘッド」から入手",
        virus: "ストーンヘッド",
        virus_loc: "ナンスカの電波、ナンスカちじょうえの電波、ナンスカいせき１・２の電波"
      },
      {
        no: 119,
        name: "アトミックマイン１",
        detail: "ナンスカいせき１の電波（固定）、ナンスカちじょうえの電波の電波商人から購入",
        virus: "",
        virus_loc: ""
      },
      {
        no: 128,
        name: "リカバリー１２０",
        detail: "ナンスカの電波、ナンスカのスカイウェーブ、ナンスカいせき２の電波（ランダム）",
        virus: "",
        virus_loc: ""
      },
      {
        no: 133,
        name: "スーパーバリア",
        detail: "ナンスカのスカイウェーブ（固定：見えない電波ロードの先）、同エリア（ランダム）",
        virus: "",
        virus_loc: ""
      }
    ]
  },
  {
    id: "soldier_cradle",
    title: "5. 兵士の間・ゆりかごの間（終盤）",
    description: "ムーの神殿内部の終盤ダンジョン。強力なウイルスの出現地帯です。",
    cards: [
      {
        no: 53,
        name: "ヒートアッパー２",
        detail: "ウイルス「ドッゴーン」から入手",
        virus: "ドッゴーン",
        virus_loc: "へいしの間、ゆりかごの間"
      },
      {
        no: 71,
        name: "ボルティックアイ２",
        detail: "ウイルス「ガードアイ」から入手（ムー大陸でも出現）",
        virus: "ガードアイ",
        virus_loc: "ムーたいりく、しんかんのぞうの電波、へいしの間"
      },
      {
        no: 133,
        name: "スーパーバリア（再掲）",
        detail: "へいしの間（ランダムエンカウント）",
        virus: "",
        virus_loc: ""
      }
    ]
  },
  {
    id: "post_game",
    title: "6. 次元の狭間・裏世界・クリア後（エンドコンテンツ）",
    description: "クリア後の高難易度エリア「じげんのハザマ」や「裏世界」。ショップや強力なウイルスから入手します。",
    cards: [
      {
        no: 27,
        name: "グレートアックス",
        detail: "じげんのハザマ１の電波商人から購入（★３：裏ＴＫタワー２の電波の商人からもブラックカード要で購入可）",
        virus: "",
        virus_loc: ""
      },
      {
        no: 30,
        name: "オーラ",
        detail: "裏ＴＫタワー２の電波（固定）、裏ドッシーのいりえの電波（ランダム）、裏ナンスカいせき２の電波（ランダム）",
        virus: "",
        virus_loc: ""
      },
      {
        no: 57,
        name: "ボボボンボム３",
        detail: "ウイルス「ボボボボン」から入手",
        virus: "ボボボボン",
        virus_loc: "じげんのハザマ２"
      },
      {
        no: 96,
        name: "パープルカーペット",
        detail: "ウイルス「カカペギロ」から入手",
        virus: "カカペギロ",
        virus_loc: "じげんのハザマ２"
      },
      {
        no: 102,
        name: "ハンマーウェポン３",
        detail: "ウイルス「ハンマリドン」から入手",
        virus: "ハンマリドン",
        virus_loc: "じげんのハザマ２"
      },
      {
        no: 103,
        name: "ジャングルストーム",
        detail: "裏コダマタウンの電波（ランダム）、じげんのハザマ１（ランダム）。ウイルス「ニョロフーン」よりドロップ",
        virus: "ニョロフーン",
        virus_loc: "裏コダマタウンの電波、こわれたバスていの電波"
      },
      {
        no: 113,
        name: "ブラックホール２",
        detail: "ウイルス「キラーブラック」から入手",
        virus: "キラーブラック",
        virus_loc: "じげんのハザマ１"
      },
      {
        no: 116,
        name: "ベルセルクソード２",
        detail: "ウイルス「バサリグル」から入手",
        virus: "バサリグル",
        virus_loc: "ムーたいりく"
      },
      {
        no: 144,
        name: "ウラギリノススメ",
        detail: "じげんのハザマ１の電波商人から購入",
        virus: "",
        virus_loc: ""
      },
      {
        no: 145,
        name: "ギガマイン",
        detail: "じげんのハザマ１の電波商人から購入（★３：裏ＴＫタワー２の電波の商人からもブラックカード要で購入可）",
        virus: "",
        virus_loc: ""
      }
    ]
  },
  {
    id: "shops_special",
    title: "7. ショップ購入 ＆ 特殊エンカウント（その他）",
    description: "コダマタウンのショップや、特殊なオブジェクト電波からのみ出現するウイルスです。",
    cards: [
      {
        no: 140,
        name: "エリアイーター",
        detail: "コダマタウンのショップ「BIGWAVE」で購入",
        virus: "",
        virus_loc: ""
      },
      {
        no: 86,
        name: "ヘンゲノジュツ２",
        detail: "ウイルス「マネヌッキー」から入手",
        virus: "マネヌッキー",
        virus_loc: "ふみだいの電波、きょだいてっぱんの電波（調べるとエンカウントする特殊電波）"
      }
    ]
  }
];

// Helper to check if a card is acquired (based on the global card checking state)
function isCardAcquired(cardNo, classType = "standard") {
  if (typeof window.appState !== 'undefined') {
    return window.appState.isAcquired(classType, cardNo);
  }
  return false;
}

// Render the flowchart structure ONCE during DOM initialization
function renderFlowchartContainerOnce(targetElementId, onToggleCallback) {
  const container = document.getElementById(targetElementId);
  if (!container) return;

  container.innerHTML = "";

  const flowchartWrapper = document.createElement("div");
  flowchartWrapper.className = "flowchart-wrapper";

  FLOWCHART_AREAS.forEach((area, index) => {
    // Area Card
    const areaCard = document.createElement("div");
    areaCard.className = "area-card glass-panel";
    areaCard.id = `flow-area-${area.id}`;

    // Header
    const areaHeader = document.createElement("div");
    areaHeader.className = "area-header";
    areaHeader.innerHTML = `
      <h3>${area.title}</h3>
      <p class="area-desc">${area.description}</p>
    `;
    areaCard.appendChild(areaHeader);

    // Progress bar template
    const progressContainer = document.createElement("div");
    progressContainer.className = "area-progress-container";
    progressContainer.innerHTML = `
      <div class="area-progress-text">
        <span class="progress-ratio-label">このエリアのクリア度: 0/${area.cards.length}</span>
        <span class="progress-percent-label">0%</span>
      </div>
      <div class="area-progress-bar-bg">
        <div class="area-progress-bar-fill" style="width: 0%"></div>
      </div>
    `;
    areaCard.appendChild(progressContainer);

    // Cards grid inside area
    const cardsGrid = document.createElement("div");
    cardsGrid.className = "flow-cards-grid";

    area.cards.forEach(card => {
      const isAcq = isCardAcquired(card.no, "standard");

      const cardChip = document.createElement("div");
      // Add general class for query selection, unique class for this card number, and status class
      cardChip.className = `flow-card-chip flow-chip-std-${card.no} ${isAcq ? 'acquired' : 'missing'}`;
      // Store card metadata directly on element
      cardChip._cardNo = card.no;
      
      cardChip.onclick = (e) => {
        onToggleCallback("standard", card.no);
      };

      // Header row inside chip: No & Name
      const chipHeader = document.createElement("div");
      chipHeader.className = "chip-header";
      chipHeader.innerHTML = `
        <span class="chip-no">No.${String(card.no).padStart(3, '0')}</span>
        <span class="chip-name">${card.name}</span>
        <span class="chip-status-badge">${isAcq ? 'GET!' : 'WANTED'}</span>
      `;
      cardChip.appendChild(chipHeader);

      // Detail row inside chip
      const chipBody = document.createElement("div");
      chipBody.className = "chip-body";
      
      let bodyText = `<div class="chip-detail">${card.detail}</div>`;
      if (card.virus) {
        bodyText += `
          <div class="chip-virus-info">
            <span class="virus-label">対象：</span><span class="virus-name">${card.virus}</span>
            <div class="virus-loc">${card.virus_loc}</div>
          </div>
        `;
      }
      chipBody.innerHTML = bodyText;
      cardChip.appendChild(chipBody);

      cardsGrid.appendChild(cardChip);
    });

    areaCard.appendChild(cardsGrid);
    flowchartWrapper.appendChild(areaCard);

    // Render connection line/wave if not the last item (except for shop/special which sits at the side/end)
    if (index < FLOWCHART_AREAS.length - 1 && area.id !== 'post_game') {
      const connector = document.createElement("div");
      connector.className = "flow-connector";
      connector.innerHTML = `
        <div class="connector-line"></div>
        <div class="connector-arrow">⚡</div>
      `;
      flowchartWrapper.appendChild(connector);
    }
  });

  container.appendChild(flowchartWrapper);
  
  // Sync the progress bars initially
  syncAreaProgressBars();
}

// Syncs all flowchart chip styles and texts from state (O(M) updates, where M is 31, super fast!)
function syncFlowchartChips() {
  FLOWCHART_AREAS.forEach(area => {
    area.cards.forEach(card => {
      const isAcq = isCardAcquired(card.no, "standard");
      const chips = document.querySelectorAll(`.flow-chip-std-${card.no}`);
      
      chips.forEach(chip => {
        if (isAcq) {
          chip.classList.add("acquired");
          chip.classList.remove("missing");
          const badge = chip.querySelector(".chip-status-badge");
          if (badge) badge.textContent = "GET!";
        } else {
          chip.classList.add("missing");
          chip.classList.remove("acquired");
          const badge = chip.querySelector(".chip-status-badge");
          if (badge) badge.textContent = "WANTED";
        }
      });
    });
  });

  syncAreaProgressBars();
}

// Optimized individual chip updates
function updateFlowchartChip(cardNo) {
  const isAcq = isCardAcquired(cardNo, "standard");
  const chips = document.querySelectorAll(`.flow-chip-std-${cardNo}`);
  
  chips.forEach(chip => {
    if (isAcq) {
      chip.classList.add("acquired");
      chip.classList.remove("missing");
      const badge = chip.querySelector(".chip-status-badge");
      if (badge) badge.textContent = "GET!";
    } else {
      chip.classList.add("missing");
      chip.classList.remove("acquired");
      const badge = chip.querySelector(".chip-status-badge");
      if (badge) badge.textContent = "WANTED";
    }
  });

  syncAreaProgressBars();
}

// Compute progress and update only the progress bar text/style properties (extremely fast!)
function syncAreaProgressBars() {
  FLOWCHART_AREAS.forEach(area => {
    const areaCard = document.getElementById(`flow-area-${area.id}`);
    if (!areaCard) return;

    let acquiredCount = 0;
    area.cards.forEach(card => {
      if (isCardAcquired(card.no, "standard")) {
        acquiredCount++;
      }
    });

    const total = area.cards.length;
    const percent = total > 0 ? Math.round((acquiredCount / total) * 100) : 0;

    const ratioLabel = areaCard.querySelector(".progress-ratio-label");
    if (ratioLabel) ratioLabel.textContent = `このエリアのクリア度: ${acquiredCount}/${total}`;

    const percentLabel = areaCard.querySelector(".progress-percent-label");
    if (percentLabel) percentLabel.textContent = `${percent}%`;

    const fillBar = areaCard.querySelector(".area-progress-bar-fill");
    if (fillBar) fillBar.style.width = `${percent}%`;
  });
}
