# -*- coding: utf-8 -*-
import json
import os
import re

NEW_CHAPTERS = [
    { "num": 1, "id": "ch_ox", "title": "オックス・ファイア戦まで", "desc": "コダマタウンや展望台の電波が中心。" },
    { "num": 2, "id": "ch_cygnus", "title": "キグナス・ウィング戦まで", "desc": "アマケンやぎじうちゅうの電波が解放。キャンサー・バブルと対決可能。" },
    { "num": 3, "id": "ch_harp", "title": "ハープ・ノート戦まで", "desc": "コダマタウンのBIGWAVEが開店。" },
    { "num": 4, "id": "ch_satellite_shadow", "title": "サテライトシャドウ戦まで", "desc": "コダマ小学校や体育館、ピアノの電脳が解放。スターフォースが解放。" },
    { "num": 5, "id": "ch_libra", "title": "リブラ・バランス戦まで", "desc": "学校の電脳が解放。" },
    { "num": 6, "id": "ch_ophiucus", "title": "オヒュカス・クイーン戦まで", "desc": "ヤシブタウンや103デパートが解放。ウルフ・フォレストと対決可能。" },
    { "num": 7, "id": "ch_gemini", "title": "ジェミニ・スパーク戦まで", "desc": "ドリームこうえんやはいきぶつおきばの電波が解放。" },
    { "num": 8, "id": "ch_andromeda", "title": "アンドロメダ戦まで", "desc": "宇宙ステーションが解放。" },
    { "num": 9, "id": "post_game", "title": "クリア後：エンドコンテンツ", "desc": "ブラックホールやうちゅうくうかんの電波などの隠しエリア。クラウン・サンダーと対決可能。" }
]

MAP_TO_MILESTONE = [
    # Milestone 9: クリア後
    # Milestone 9: クリア後
    ("うちゅうくうかんの電波", 9),
    ("宇宙空間の電波", 9),
    ("じげんのハザマ", 9),
    ("クリア後", 9),
    ("クラウンサンダー", 9),
    ("クラウン・サンダー", 9),
    ("ゴミしゅうせきじょ", 9),
    ("サテライト管理者", 9),

    # Milestone 8: アンドロメダ戦まで (Space Station)
    ("ステーション", 8),
    ("宇宙ステーション", 8),
    ("モジュール", 8),
    ("だい２じっけん", 8),
    ("ロケット", 8),
    ("うちゅうふく", 8),
    ("スペースコロニー", 8),

    # Milestone 7: ジェミニ・スパーク戦まで (Dream Island / Scrap Yard)
    ("ドリームこうえん", 7),
    ("ドリーム公園", 7),
    ("ドリームアイランド", 7),
    ("はいきぶつ", 7),
    ("廃棄物", 7),
    ("パンダ", 7),
    ("ボート", 7),
    ("かいぞくせん", 7),
    ("海賊船", 7),
    ("リサイクル", 7),
    ("ジェミニ", 7),
    ("とうだい", 7),

    # Milestone 6: オヒュカス・クイーン戦まで (Yashibu Town / Event Hall)
    ("ヤシブタウン", 6),
    ("１０３デパート", 6),
    ("ビジョン", 6),
    ("クレープ", 6),
    ("ようふく", 6),
    ("洋服", 6),
    ("ビデオデッキ", 6),
    ("アナコンダ", 6),
    ("モワイ", 6),
    ("イベントかいじょう", 6),
    ("ウルフ", 6),

    # Milestone 5: リブラ・バランス戦まで (School Comp)
    ("学校の電脳", 5),

    # Milestone 3: ハープ・ノート戦まで (Big Wave / etc.)
    ("ｂｉｇｗａｖｅ", 3),
    ("ビウェーブ", 3),
    ("ビッグウェーブ", 3),

    # Milestone 2: キグナス・ウィング戦まで (AMAKEN/simulated space/Cancer Bubble/Luna folder)
    ("アマケン", 2),
    ("タワー", 2),
    ("アンテナ", 2),
    ("パラボラ", 2),
    ("じっけん", 2),
    ("実験", 2),
    ("けんきゅう", 2),
    ("ディスプレイ", 2),
    ("キャンサー", 2),
    ("じっけんモニター", 2),
    ("ぎじうちゅう", 2),
    ("ルナフォルダ", 2),

    # Milestone 4: サテライトシャドウ戦まで (School classrooms/gym/broadcast/music room/piano/bronze statue)
    ("小学校", 4),
    ("学校", 4),
    ("１−ａ", 4),
    ("１−ｂ", 4),
    ("５−ａ", 4),
    ("５−ｂ", 4),
    ("体育館", 4),
    ("たいいくかん", 4),
    ("昇降口", 4),
    ("こうちょう", 4),
    ("スピーカー", 4),
    ("きかんしゃ", 4),
    ("けんばいき", 4),
    ("しょうめい", 4),
    ("ぶらさがり", 4),
    ("ピッチングマシン", 4),
    ("しょうめんげんかん", 4),
    ("ろうか", 4),
    ("廊下", 4),
    ("ピアノ", 4),
    ("ほうそう室", 4),
    ("放送室", 4),
    ("音楽室", 4),
    ("どうぞう", 4),

    # Milestone 1: オックス・ファイア戦まで (Kodama Town / Vista Point)
    ("コダマタウン", 1),
    ("展望台", 1),
    ("てんぼうだい", 1),
    ("イヌ小屋", 1),
    ("てんじぶつ", 1),
    ("つくえ", 1),
    ("ゴン太のへや", 1),
    ("キザマロのへや", 1),
    ("いいんちょうのへや", 1),
    ("初期フォルダ", 1),
    ("トラック", 1),
    ("じどうはんばいき", 1),
    ("じどう自動車", 1),
    ("じどうしゃ", 1),
    ("けしょうだい", 1),
    ("かがみ", 1),
    ("スバルのへや", 1),
    ("スバルのリビング", 1),
    ("れいぞうこ", 1),
]

def get_text_milestone(text):
    text = text.lower().strip()
    if not text:
        return None
    for pattern, ms in MAP_TO_MILESTONE:
        if pattern.lower() in text:
            return ms
    return None

def get_card_earliest_milestone(card):
    sources = []
    
    # 1. Parse source field
    source_str = card.get("source", "").strip()
    if source_str:
        parts = [p.strip() for p in re.split(r'\s{2,}', source_str) if p.strip()]
        sources.extend(parts)
        
    # 2. Parse virus location
    virus_loc = card.get("virus_loc", "").strip()
    if virus_loc:
        parts = [p.strip() for p in re.split(r'[\n\r]+|\s{2,}', virus_loc) if p.strip()]
        sources.extend(parts)
        
    if not sources:
        return 1
        
    milestones = []
    for src in sources:
        ms = get_text_milestone(src)
        if ms is not None:
            milestones.append(ms)
            
    if milestones:
        return min(milestones)
        
    return 1

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    game_data_path = os.path.join(script_dir, "game_data.json")
    
    with open(game_data_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    # Update chapters
    data["chapters"] = NEW_CHAPTERS
    
    reclassified_count = 0
    for c in data["cards"]["standard"]:
        old_ch = c.get("earliest_chapter", 1)
        new_ch = get_card_earliest_milestone(c)
        if old_ch != new_ch:
            c["earliest_chapter"] = new_ch
            reclassified_count += 1
            
    print(f"Successfully reclassified {reclassified_count} standard cards.")
    
    # Save back
    with open(game_data_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("Successfully updated game_data.json.")

if __name__ == '__main__':
    main()
