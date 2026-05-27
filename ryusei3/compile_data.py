import json
import os

def get_padded_str(s, w=3):
    return str(s).rjust(w, '0')

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 1. Load game_data.json
    game_data_path = os.path.join(script_dir, "game_data.json")
    if not os.path.exists(game_data_path):
        print(f"Error: {game_data_path} not found.")
        return
        
    with open(game_data_path, 'r', encoding='utf-8') as f:
        game_data = json.load(f)
        
    cards = game_data["cards"]
    viruses = game_data["viruses"]
    
    # 2. Write card_data.js
    card_data_js = f"const CARD_DATABASE = {json.dumps(cards, ensure_ascii=False, indent=2)};\n"
    card_data_js_path = os.path.join(script_dir, "card_data.js")
    with open(card_data_js_path, 'w', encoding='utf-8') as f:
        f.write(card_data_js)
    print(f"Successfully compiled {card_data_js_path}")
    
    # 3. Group cards by chapter for flowchart
    chapters = [
        {"id": "ch1", "num": 1, "title": "第1章「ルナルナだん結成」", "desc": "ストーリー第1章。スペード・マグネッツ戦まで（コダマタウン、スピカモール等）。"},
        {"id": "ch2", "num": 2, "title": "第2章「転校生ジャック」", "desc": "ストーリー第2章。ダイヤ・アイスバーン戦まで（オクダマスタジオ、ライブ特設ステージ等）。"},
        {"id": "ch3", "num": 3, "title": "第3章「シーサーアイランド」", "desc": "ストーリー第3章。クラブ・ストロング戦まで（シーサーアイランド、環境システム等）。"},
        {"id": "ch4", "num": 4, "title": "第4章「委員長を取り戻せ」", "desc": "ストーリー第4章。クイーン・ヴァルゴ＆アシッド戦まで（WAXA日本支部、サテラポリス本部等）。"},
        {"id": "ch5", "num": 5, "title": "第5章「ディーラーの脅威」", "desc": "ストーリー第5章。ジャック・コーヴァス戦まで（生徒会長選挙、学校周辺ノイズ等）。"},
        {"id": "ch6", "num": 6, "title": "第6章「ディーラー壊滅」", "desc": "ストーリー第6章。グレイブ・ジョーカー戦まで（地下シェルター、クリムゾンマシン等）。"},
        {"id": "ch7", "num": 7, "title": "第7章「メテオＧ〜エンディング」", "desc": "ストーリー第7章。シリウス＆クリムゾン・ドラゴン戦まで（オービタルベース、メテオサーバー等）。"},
        {"id": "post_game", "num": 8, "title": "クリア後：エンドコンテンツ", "desc": "クリア後の高難易度エリア（ノイズウェーブ4〜6、外宇宙、FM星、ブラックホールサーバー等）。"}
    ]
    
    chapter_map = {ch["num"]: ch["id"] for ch in chapters}
    chapter_cards = {ch["id"]: [] for ch in chapters}
    
    import re
    for c in cards["standard"]:
        ch_num = c.get("earliest_chapter", 1)
        ch_id = chapter_map[ch_num]
        
        source_str = c.get("source", "").strip()
        if source_str:
            sources = [p.strip() for p in re.split(r'\s{2,}', source_str) if p.strip()]
        else:
            sources = ["ウイルスドロップのみ"]
        
        chapter_cards[ch_id].append({
            "no": c["no"],
            "name": c["name"],
            "details": sources,
            "virus": c.get("virus", ""),
            "virus_loc": c.get("virus_loc", "")
        })
        
    # Generate FLOWCHART_AREAS JS string
    flowchart_areas_js = "const FLOWCHART_AREAS = [\n"
    for ch in chapters:
        cid = ch["id"]
        ch_cards = chapter_cards[cid]
        flowchart_areas_js += "  {\n"
        flowchart_areas_js += f'    id: "{cid}",\n'
        flowchart_areas_js += f'    title: "{ch["title"]}",\n'
        flowchart_areas_js += f'    description: "{ch["desc"]}",\n'
        flowchart_areas_js += "    cards: [\n"
        for c in ch_cards:
            virus_cleaned = c["virus"].replace('"', '\\"').strip()
            virus_loc_cleaned = c["virus_loc"].replace('"', '\\"').strip()
            details_js = json.dumps(c["details"], ensure_ascii=False)
            
            flowchart_areas_js += "      {\n"
            flowchart_areas_js += f'        no: {c["no"]},\n'
            flowchart_areas_js += f'        name: "{c["name"]}",\n'
            flowchart_areas_js += f'        details: {details_js},\n'
            flowchart_areas_js += f'        virus: "{virus_cleaned}",\n'
            flowchart_areas_js += f'        virus_loc: "{virus_loc_cleaned}"\n'
            flowchart_areas_js += "      },\n"
        flowchart_areas_js += "    ]\n"
        flowchart_areas_js += "  },\n"
    flowchart_areas_js += "];\n"
    
    # Generate MAP_LOCATION_DB dynamically from viruses data
    map_location_db = {}
    for m in viruses:
        for l in m["locations"]:
            map_location_db[l["name"]] = l["map"]
    # Additional manual events map connection
    map_location_db["イベント"] = "その他"
    
    map_db_js = f"const MAP_LOCATION_DB = {json.dumps(map_location_db, ensure_ascii=False, indent=2)};\n\n"
    
    # 4. Write flowchart.js
    viruses_js = map_db_js + f"const MONSTER_DATABASE = {json.dumps(viruses, ensure_ascii=False, indent=2)};\n\n"
    
    helpers_js = """// Helper to check if a card is acquired (based on the global card checking state)
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
      
      const firstSource = card.details[0] || "ウイルスドロップのみ";
      let bodyText = "";
      
      if (card.details.length > 1) {
        const tooltipContent = card.details.map(d => d.replace(/"/g, '&quot;')).join('\\n');
        bodyText += `
          <div class="chip-detail-row">
            <div class="chip-detail">${firstSource}</div>
            <span class="source-more-tag" data-tooltip="${tooltipContent}" onclick="event.stopPropagation();">+${card.details.length - 1}</span>
          </div>
        `;
      } else {
        bodyText += `
          <div class="chip-detail-row">
            <div class="chip-detail">${firstSource}</div>
          </div>
        `;
      }

      if (card.virus) {
        bodyText += `
          <div class="chip-virus-info" onclick="event.stopPropagation(); gotoMonsterBook('${card.virus}')" title="図鑑で出現場所を見る">
            <span class="virus-label">対象：</span>
            <span class="virus-name">${card.virus}</span>
            <span class="btn-goto-monster">👾</span>
          </div>
        `;
      }
      chipBody.innerHTML = bodyText;
      cardChip.appendChild(chipBody);

      cardsGrid.appendChild(cardChip);
    });

    areaCard.appendChild(cardsGrid);
    flowchartWrapper.appendChild(areaCard);

    // Render connection line/wave if not the last item
    if (index < FLOWCHART_AREAS.length - 1) {
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

// Syncs all flowchart chip styles and texts from state
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

// Compute progress and update only the progress bar text/style properties
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
"""
    
    flowchart_js_path = os.path.join(script_dir, "flowchart.js")
    with open(flowchart_js_path, 'w', encoding='utf-8') as f:
        f.write(viruses_js)
        f.write(flowchart_areas_js)
        f.write("\n")
        f.write(helpers_js)
    print(f"Successfully compiled {flowchart_js_path}")
    
    # 5. Write ryusei3_cards_routing.md
    md = []
    md.append("# 流星のロックマン3 カード獲得ストーリーフローチャート")
    md.append("本チャートは、ゲームのストーリー進行度（第1話〜クリア後）に応じて、**どのカードが最も早く手に入るか**を分類・整理したものです。")
    md.append("プレイヤーはストーリーの進行に合わせて、その時点で獲得可能なカードを効率よく収集することができます。\n")

    for ch in chapters:
        md.append(f"## {ch['title']}")
        md.append(f"**概要**: {ch['desc']}\n")
        
        ch_cards = chapter_cards[ch["id"]]
        if not ch_cards:
            md.append("（この章で新しく獲得可能になるカードはありません）\n")
            continue
            
        md.append(f"この章で獲得可能になるカード（計 {len(ch_cards)} 枚）:")
        md.append("| No. | カード名 | 入手方法 |")
        md.append("| --- | --- | --- |")
        for c in ch_cards:
            get_method = []
            if c["virus"]:
                get_method.append(f"ウイルス「{c['virus']}」（出現：{c['virus_loc']}）")
            other_sources = [s for s in c["details"] if s != "ウイルスドロップのみ"]
            if other_sources:
                get_method.append(f"その他：{'、'.join(other_sources)}")
            method_str = " | ".join(get_method) if get_method else "不明"
            md.append(f"| No.{get_padded_str(c['no'])} | **{c['name']}** | {method_str} |")
        md.append("\n")

    output_md_file = os.path.join(script_dir, "ryusei3_cards_routing.md")
    with open(output_md_file, 'w', encoding='utf-8') as f:
        f.write("\n".join(md))
    print(f"Successfully compiled {output_md_file}")

if __name__ == '__main__':
    main()
