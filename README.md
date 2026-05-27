# ⚡ 流星のロックマン バトルカードチェッカー

**Shooting Star Megaman Battle Card Collector**  
シリーズ全3作のバトルカード収集進捗をトラッキングする、ブラウザで動くウェブアプリです。

🔗 **公開URL**: [https://secta113.github.io/shooting_star_megaman_battlecard_collector/](https://secta113.github.io/shooting_star_megaman_battlecard_collector/)

---

## 📋 概要

「流星のロックマン」シリーズ（1・2・3）の全バトルカードを管理するチェックリストアプリです。  
ストーリー進行に沿ったフローチャートや、ウイルスの出現場所・ドロップ情報を確認しながら、効率よくカードを集めることができます。

---

## 🎮 対応タイトル

| タイトル | カード枚数 | 特記 |
|---|---|---|
| 🛡️ 流星のロックマン（1） | Standard 150 / Mega 30 / Giga 5 | サテライト版（ペガサス・レオ・ドラゴン）対応 |
| 🔥 流星のロックマン２ | Standard 150 / Mega 42 / Giga 15 | ベルセルク・シノビ・ダイナソー版対応（予定） |
| 💥 流星のロックマン３ | Standard 150 / Mega 45 / Giga 10 | ブラックエース・レッドジョーカー版対応 |

---

## ✨ 機能

### ストーリー進行チャート
- ゲームのストーリーマイルストーンごとにカードを分類
- 各カードの入手方法（ショップ・宝箱・イベント・ウイルスドロップ）を表示
- カードをクリックで所持/未所持をトグル
- エリアごとの収集率プログレスバー

### カードチェックリスト
- 全カードを一覧表示
- カードクラス（Standard / Mega / Giga / Bokutai / Event）でフィルタリング
- カード名・入手方法・ウイルス名での検索
- チェックボックスで所持状況を管理

### モンスター図鑑
- 全ウイルスの出現場所・ドロップカード情報を一覧表示
- ストーリーチャートやチェックリストから直接ジャンプ可能（スクロール＆グローハイライト）

### その他
- 進捗データをローカルストレージに自動保存（ブラウザを閉じても保持）
- JSONファイルへのデータ書き出し・読み込み（バックアップ対応）
- 全カード一括所持 / 全リセット機能

---

## 🚀 使い方

**オンライン版**: 上記の公開URLをブラウザで開くだけで使えます。インストール不要。

**ローカルで動かす場合**:
```bash
# リポジトリをクローン
git clone https://github.com/secta113/shooting_star_megaman_battlecard_collector.git
cd shooting_star_megaman_battlecard_collector

# Pythonの簡易サーバーで起動（任意）
python -m http.server 8000
# → http://localhost:8000 を開く
```

> HTMLファイルをそのままブラウザで開いても動作します（`file://` プロトコル）。

---

## 🗂️ ディレクトリ構成

```
/
├── index.html              # ポータルページ（タイトル選択）
├── portal_style.css        # ポータルのスタイル
├── ryusei1/
│   ├── index.html          # 流星1 アプリ本体
│   ├── app.js              # アプリロジック
│   ├── card_data.js        # カードデータベース（自動生成）
│   ├── flowchart.js        # フローチャート＋モンスターDB（自動生成）
│   ├── style.css           # スタイル
│   ├── game_data.json      # マスターデータ
│   └── compile_data.py     # card_data.js / flowchart.js 生成スクリプト
├── ryusei2/
│   └── ...                 # 同上（流星2）
└── ryusei3/
    └── ...                 # 同上（流星3）
```

---

## 🔧 データ更新方法

カードデータを変更した場合は、各フォルダの `compile_data.py` を実行して JS ファイルを再生成します。

```bash
cd ryusei1
python compile_data.py
# → card_data.js, flowchart.js が更新される

cd ../ryusei3
python compile_data.py
```

---

## 🛠️ 技術スタック

- **フロントエンド**: HTML / Vanilla CSS / Vanilla JavaScript（フレームワーク不使用）
- **フォント**: Google Fonts（Outfit / Share Tech Mono / Noto Sans JP）
- **データ管理**: JSON → Python スクリプトで JS に変換
- **ホスティング**: GitHub Pages

---

## 📝 データソース

カードデータ・ウイルスデータは [流星のロックマン総合Wiki（非公式）](https://wikiwiki.jp/ryusei/) を参考に作成しています。

---

## ⚠️ 免責事項

本アプリは非公式のファンメイドツールです。  
「流星のロックマン」シリーズは株式会社カプコンの著作物です。  
本アプリはカプコンとは一切関係ありません。
