# -*- coding: utf-8 -*-
import json
import os
import re

AREA_ORDER = [
    "phantom_black", 
    "ox_fire", 
    "yeti_blizzard", 
    "harp_note", 
    "ophiucus_queen", 
    "brachio_wave", 
    "condor_geograph", 
    "empty", 
    "ra_mu", 
    "post_game"
]

AREAS = {
    "phantom_black": {
        "title": "ファントム・ブラック戦まで",
        "description": "コダマタウンでの日常や、ロッポンドーヒルズのTKタワーでのファントム・ブラック戦まで。"
    },
    "ox_fire": {
        "title": "オックス・ファイア戦まで",
        "description": "ヤエバリゾートでの大食い大会、オックス・ファイア戦まで。"
    },
    "yeti_blizzard": {
        "title": "イエティ・ブリザード戦まで",
        "description": "ゲレンデでの吹雪の異変、イエティ・ブリザード戦まで。"
    },
    "harp_note": {
        "title": "ハープ・ノート戦まで",
        "description": "BIG WAVEでのウイルス発生、ロッポンドーヒルズの美術館でのハープ・ノート戦まで。"
    },
    "ophiucus_queen": {
        "title": "オヒュカス・クイーン戦まで",
        "description": "コダマ小学校でのブライの襲撃や、映画館でのオヒュカス・クイーン戦まで。"
    },
    "brachio_wave": {
        "title": "ブラキオ・ウェーブ戦まで",
        "description": "アメロッパのドンブラー村、ドンブラー湖でのブラキオ・ウェーブ戦まで。"
    },
    "condor_geograph": {
        "title": "コンドル・ジオグラフ戦まで",
        "description": "ナンスカ村でのゴン太救出、ナンスカ遺跡でのコンドル・ジオグラフ戦まで。"
    },
    "empty": {
        "title": "エンプティー戦まで",
        "description": "バミューダラビリンスでのハープ・ノート、エンプティー戦まで。"
    },
    "ra_mu": {
        "title": "ラ・ムー戦まで",
        "description": "ムー大陸に突入し、守護ボスEX連戦からラストボス「ラ・ムー」戦まで。"
    },
    "post_game": {
        "title": "クリア後：エンドコンテンツ",
        "description": "ジェミニ・スパーク戦、じげんのハザマでのIFボス戦、アポロン・フレイム、そして「ラ・ムー Xa」戦まで。"
    }
}

def determine_location_area(loc):
    loc = loc.strip()
    if not loc:
        return None
        
    # Post-game checks
    if any(k in loc for k in ["裏", "じげんのハザマ", "ハザマ", "いじげん", "ツカサ", "ジェミニ", "アポロン", "マスター・シン", "Xa", "ブライ SX"]):
        return "post_game"
        
    # Late game / Ra Mu (Ch 7 / Final)
    if any(k in loc for k in ["だいかいだん", "へいしの間", "ゆりかごの間", "神殿", "ラ・ムー", "ムー大陸"]):
        return "ra_mu"
        
    # Empty (Ch 6)
    if any(k in loc for k in ["バミューダ", "ラビリンス", "オリヒメ", "アジト", "エンプティー"]):
        return "empty"
        
    # Condor Geograph (Ch 5 Late)
    if any(k in loc for k in ["ナンスカいせき１", "しょくだい", "ナンスカいせき２", "ナンスカノオトメ", "せいなるほのお", "コンドル"]):
        return "condor_geograph"
        
    # Brachio Wave (Ch 5 Early)
    if any(k in loc for k in ["ドンブラー村", "クック", "てんぼうだい", "そうがんきょう", 
                              "ドッシーのいりえ", "ひつじ", "ドンブラー湖１", "ドンブラー湖２", 
                              "オンスイプール", "オウのカンムリ", "ミスター・タコ", "ちんぼつせん", 
                              "ナンスカ", "でんりゅうイワ", "ムーのぞう", "ちじょうえ", "こだいトンボ", "ブラキオ"]):
        return "brachio_wave"
        
    # Ophiucus Queen (Ch 4)
    if any(k in loc for k in ["学校の電波", "体育館", "教室の電波", "コダマ小学校", "オヒュカス"]):
        return "ophiucus_queen"
        
    # Harp Note (Ch 3)
    if any(k in loc for k in ["ＢＩＧＷＡＶＥ", "ワゴンセール", "びじゅつかん", "カンリシステム", "ミソラ", "ハープ"]):
        return "harp_note"
        
    # Yeti Blizzard (Ch 2 Late)
    if any(k in loc for k in ["ゲレンデ", "プロコース", "イエティ"]):
        return "yeti_blizzard"
        
    # Ox Fire (Ch 2 Early)
    if any(k in loc for k in ["ヤエバリゾート", "ユキダルマ", "グルメタウン", "フランクフルト", 
                              "こおりのぞう", "リゾートホテル", "しゅくはくモニター", "あんないパネル", 
                              "スウィートルーム", "てんがいベッド", "オックス"]):
        return "ox_fire"
        
    # Phantom Black (Ch 1)
    if any(k in loc for k in ["コダマタウン", "スバル", "リビング", "へやの電波", "パソコンの電波", "テレビの電波", 
                              "イヌごや", "ポスト", "あかポスト", "カンバン", "いいんちょう", "オシャレタンス", "ゴン太", 
                              "キザマロ", "ごちゃごちゃハコ", "ヒルズ前どおり", "電波ひょうしき", "ロッポンドーヒルズ", 
                              "メガ・ディスプレイ", "ショッピングプラザ", "カンシカメラ", "えいがかん", "ＴＫタワー", 
                              "ＴＫアンテナ", "初期フォルダ", "通信対戦", "ファントム"]):
        return "phantom_black"
        
    # Fallback/Misc helper matching
    if any(k in loc for k in ["ピカヤマ", "イケツラ", "あいざわ", "ヒロイ", "ミソラ"]):
        return "phantom_black"
        
    if any(k in loc for k in ["アガメ", "リズ・ムンスカ"]):
        return "brachio_wave"
        
    return "phantom_black"

def get_earliest_area(loc_list):
    earliest_idx = len(AREA_ORDER) - 1
    has_valid = False
    
    for loc in loc_list:
        area = determine_location_area(loc)
        if area:
            has_valid = True
            idx = AREA_ORDER.index(area)
            if idx < earliest_idx:
                earliest_idx = idx
                
    if not has_valid:
        return "phantom_black"
    return AREA_ORDER[earliest_idx]

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    cards_json_path = os.path.join(script_dir, "cards.json")
    flowchart_js_path = os.path.join(script_dir, "flowchart.js")
    
    with open(cards_json_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    standard_section = None
    for sec in data:
        if sec["section"] == "standard":
            standard_section = sec
            break
            
    if not standard_section:
        print("Standard section not found")
        return
        
    rows = standard_section["rows"]
    classified = {aid: [] for aid in AREA_ORDER}
    
    for row in rows[2:]:
        if len(row) < 5:
            continue
        no = int(row[0])
        name = row[1]
        source = row[2]
        virus = row[3]
        virus_loc = row[4]
        
        # Clean virus strings
        virus_val = virus if (virus and virus != "所持ウイルスなし") else ""
        virus_loc_val = virus_loc if (virus_loc and virus_loc != "所持ウイルスなし") else ""
        
        # Split source and virus_loc into separate possible locations for area mapping
        locations = []
        if source:
            locations.extend([p.strip() for p in re.split(r'\s{2,}|\n+', source) if p.strip()])
        if virus_loc_val:
            locations.extend([p.strip() for p in re.split(r'\s{2,}|\n+', virus_loc_val) if p.strip()])
            
        area_id = get_earliest_area(locations)
        
        # Format values for flowchart.js
        # Split source into list items, joining trailing explanation parenthesis lines
        raw_lines = [l.strip() for l in source.split('\n') if l.strip()]
        details_list = []
        for line in raw_lines:
            if (line.startswith("（") or line.startswith("(")) and details_list:
                details_list[-1] = details_list[-1] + " " + line
            else:
                sub_parts = [p.strip() for p in re.split(r'\s{2,}', line) if p.strip()]
                if sub_parts:
                    details_list.extend(sub_parts)
                    
        if not details_list:
            details_list = ["ウイルスドロップのみ"]
            
        virus_loc_clean = virus_loc_val.strip().replace("\n", " ")
        
        classified[area_id].append({
            "no": no,
            "name": name,
            "details": details_list,
            "virus": virus_val,
            "virus_loc": virus_loc_clean
        })
        
    # Generate FLOWCHART_AREAS JS string
    flowchart_areas_js = "// Flowchart definition for Megaman Star Force 2 (Ryusei no Rockman 2) cards\n"
    flowchart_areas_js += "const FLOWCHART_AREAS = [\n"
    for aid in AREA_ORDER:
        area = AREAS[aid]
        area_cards = classified[aid]
        title_js = json.dumps(area["title"], ensure_ascii=False)
        desc_js = json.dumps(area["description"], ensure_ascii=False)
        flowchart_areas_js += "  {\n"
        flowchart_areas_js += f'    id: "{aid}",\n'
        flowchart_areas_js += f'    title: {title_js},\n'
        flowchart_areas_js += f'    description: {desc_js},\n'
        flowchart_areas_js += "    cards: [\n"
        for c in area_cards:
            name_js = json.dumps(c["name"], ensure_ascii=False)
            details_js = json.dumps(c["details"], ensure_ascii=False)
            virus_js = json.dumps(c["virus"], ensure_ascii=False)
            virus_loc_js = json.dumps(c["virus_loc"], ensure_ascii=False)
            
            flowchart_areas_js += "      {\n"
            flowchart_areas_js += f'        no: {c["no"]},\n'
            flowchart_areas_js += f'        name: {name_js},\n'
            flowchart_areas_js += f'        details: {details_js},\n'
            flowchart_areas_js += f'        virus: {virus_js},\n'
            flowchart_areas_js += f'        virus_loc: {virus_loc_js}\n'
            flowchart_areas_js += "      },\n"
        flowchart_areas_js += "    ]\n"
        flowchart_areas_js += "  },\n"
    flowchart_areas_js += "];\n\n"
    
    # UI management JS helper code templates
    ui_helpers_js = """// Helper to check if a card is acquired (based on the global card checking state)
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
"""
    
    with open(flowchart_js_path, "w", encoding="utf-8") as out:
        out.write(flowchart_areas_js + ui_helpers_js)
        
    print(f"Successfully compiled {flowchart_js_path}")

if __name__ == "__main__":
    main()
