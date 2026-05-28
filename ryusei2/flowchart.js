// Flowchart definition for Megaman Star Force 2 (Ryusei no Rockman 2) cards
const FLOWCHART_AREAS = [
  {
    id: "phantom_black",
    title: "ファントム・ブラック戦まで",
    description: "コダマタウンでの日常や、ロッポンドーヒルズのTKタワーでのファントム・ブラック戦まで。",
    cards: [
      {
        no: 2,
        name: "プラスキャノン",
        details: ["ゴン太のへやの電波（固定）", "ドンブラー湖１の電波 （固定、ナナイロホタテガイの左下の崖のくぼみを掘る）", "ゴン太のへやの電波（ランダム）", "コダマタウンのスカイウェーブ（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 4,
        name: "プラズマガン１",
        details: ["ＴＫタワーの電波２（ランダム）", "ヤエバリゾートの電波（ランダム）", "★１：ヤエバリゾートの電波（固定）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 5,
        name: "プラズマガン２",
        details: ["ドンブラー湖１の電波 （固定、電波に入ってすぐの４つ並んだサンゴの右を掘る）", "コダマタウンのスカイウェーブ（ランダム）", "ドンブラー村の電波（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 6,
        name: "プラズマガン３",
        details: ["へいしの間（固定）", "人助け：「ピカヤマ　パブロウ」", "★３：裏ＴＫタワー２の電波の電波商人（要プラチナカード）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 7,
        name: "エアスプレッド１",
        details: ["ロッポンドーヒルズの電波（固定）", "ヒルズ前どおりの電波（ランダム）", "ロッポンドーヒルズの電波（ランダム）", "★２：通信対戦をはじめて遊んだ時にもらえる"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 8,
        name: "エアスプレッド２",
        details: ["ゲレンデ１の電波（固定）", "リゾートホテルの電波（ランダム）", "グルメタウンの電波（ランダム）", "コダマタウンのスカイウェーブ（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 10,
        name: "レーダーミサイル１",
        details: ["ＴＫタワーの電波１（固定）", "ドンブラー湖２の電波 （固定、ウニが３つ並んだ下の穴の手前の崖を掘る）", "リゾートホテルの電波（ランダム）", "グルメタウンの電波（ランダム）", "ゲレンデ２の電波（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 11,
        name: "レーダーミサイル２",
        details: ["こわれたリフトの電波（固定）", "コダマタウンのスカイウェーブ（ランダム）", "ドッシーのいりえの電波（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 12,
        name: "レーダーミサイル３",
        details: ["ムーたいりく（固定）", "★１：じげんのハザマ１（固定）", "ゆりかごの間（ランダム）", "人助け：「イケツラ　モテツグ」", "★３：裏ＴＫタワー２の電波の電波商人（要プラチナカード）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 13,
        name: "シンクロフック１",
        details: ["ヤエバリゾートの電波（固定）", "ショッピングプラザの電波の電波商人"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 16,
        name: "ミニグレネード１",
        details: ["ヒルズ前どおりの電波（ランダム）", "ショッピングプラザの電波（ランダム）", "グルメタウンの電波（ランダム）", "★１：通信対戦で１０回勝利した時にもらえる"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 22,
        name: "ソード",
        details: ["コダマタウンの電波（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 23,
        name: "ワイドソード",
        details: ["ショッピングプラザの電波（ランダム）", "ＴＫタワーの電波１（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 24,
        name: "ロングソード",
        details: ["イヌごやの電波（固定）", "コダマタウンの電波（ランダム）", "スバルのへやの電波（ランダム）", "いいんちょうのへやの電波（ランダム）", "ロッポンドーヒルズの電波（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 25,
        name: "ホワイトメテオ",
        details: ["フランクフルトやの電波（固定）", "ドンブラー湖１の電波（固定）", "ゆりかごの間（ランダム）", "★１：通信対戦で３０回勝利した時にもらえる"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 31,
        name: "グランドウェーブ１",
        details: ["コダマタウンの電波（固定）", "コダマタウンの電波（ランダム）", "スバルのリビングの電波（ランダム）", "いいんちょうのへやの電波（ランダム）", "キザマロのへやの電波（ランダム）", "ヒルズ前どおりの電波（ランダム）", "ロッポンドーヒルズの電波（ランダム）", "ＴＫタワーの電波１（ランダム）"],
        virus: "メットリオ",
        virus_loc: "コダマタウンの電波       イヌごやの電波       あかポストの電波       カンバンの電波       スバルのリビングの電波       テレビの電波       スバルのへやの電波       パソコンの電波       いいんちょうのへやの電波       オシャレタンスの電波       ゴン太のへやの電波       ＢＩＧＷＡＶＥの電波       ワゴンセールの電波       ヒルズ前どおりの電波       電波ひょうしきの電波       ロッポンドーヒルズの電波       メガ・ディスプレイの電波       ショッピングプラザの電波       カンシカメラの電波       えいがかんの電波       ＴＫタワーの電波１       ＴＫタワーの電波２       ふんすいデンパの電波       わすれさられたこおりのぞうの電波       あんないパネルの電波"
      },
      {
        no: 32,
        name: "グランドウェーブ２",
        details: ["ウイルスドロップのみ"],
        virus: "メットリオ２",
        virus_loc: "コダマタウンの電波       オンスイプールの電波       スバルのリビングの電波       スバルのへやの電波       いいんちょうのへやの電波       ゴン太のへやの電波       ごちゃごちゃハコの電波       ふみだいの電波       ＢＩＧＷＡＶＥの電波       ヒルズ前どおりの電波       ロッポンドーヒルズの電波       ＴＫタワーの電波２       カンリシステムの電波       コダマタウンのスカイウェーブ       ドンブラー村のスカイウェーブ       ドンブラー湖１の電波       ドンブラー湖２の電波       ナンスカのスカイウェーブ       ナンスカの電波"
      },
      {
        no: 34,
        name: "マッドバルカン１",
        details: ["ヒルズ前どおりの電波（固定）", "ロッポンドーヒルズの電波（ランダム）", "えいがかんの電波（ランダム）", "ＴＫタワーの電波１（ランダム）", "ＴＫタワーの電波２（ランダム）", "ショッピングプラザの電波の電波商人"],
        virus: "バルカナ",
        virus_loc: "コダマタウンの電波       あかポストの電波       カンバンの電波       スバルのリビングの電波       スバルのへやの電波       パソコンの電波       いいんちょうのへやの電波       キザマロのへやの電波       ＢＩＧＷＡＶＥの電波       ワゴンセールの電波       電波ひょうしきの電波       ロッポンドーヒルズの電波       メガ・ディスプレイの電波       ショッピングプラザの電波       カンシカメラの電波       えいがかんの電波       ＴＫタワーの電波１       ふるいそうがんきょうの電波       ＴＫタワーの電波２       ＴＫアンテナの電波"
      },
      {
        no: 35,
        name: "マッドバルカン２",
        details: ["キザマロのへやの電波（ランダム）"],
        virus: "バルガンナー",
        virus_loc: "コダマタウンの電波       スバルのへやの電波       ごちゃごちゃハコの電波       キザマロのへやの電波       ＢＩＧＷＡＶＥの電波       ロッポンドーヒルズの電波       ＴＫタワーの電波１       ＴＫタワーの電波２       ドンブラー村のスカイウェーブ       ドンブラー湖２の電波       ナンスカのスカイウェーブ       バミューダラビリンス"
      },
      {
        no: 37,
        name: "デスサイズ１",
        details: ["ウイルスドロップのみ"],
        virus: "キルミィ",
        virus_loc: "コダマタウンの電波       スバルのリビングの電波       スバルのへやの電波       いいんちょうのへやの電波       ごちゃごちゃハコの電波       ふるいそうがんきょうの電波       びじゅつかんの電波       カンリシステムの電波       いじげん       コダマタウンのスカイウェーブ       ドンブラー村のスカイウェーブ       ナンスカのスカイウェーブ       ナンスカの電波       いじげん"
      },
      {
        no: 38,
        name: "デスサイズ２",
        details: ["ウイルスドロップのみ"],
        virus: "キルジョーカー",
        virus_loc: "いじげん       オリヒメのアジトの電波       てんくうのだいかいだん       ムーたいりく       しんかんのぞうの電波       へいしの間       ゆりかごの間       モンショウの電波"
      },
      {
        no: 39,
        name: "デスサイズ３",
        details: ["ウイルスドロップのみ"],
        virus: "キルデーモン",
        virus_loc: "裏ロッポンドーヒルズの電波       こわれたディスプレイの電波       じげんのハザマ２"
      },
      {
        no: 40,
        name: "オロロンハット１",
        details: ["ＴＫタワーの電波２（固定）", "キザマロのへやの電波（ランダム）"],
        virus: "オロロン",
        virus_loc: "パソコンの電波       ロッポンドーヒルズの電波       ＴＫタワーの電波１       ふるいそうがんきょうの電波       ＴＫタワーの電波２       ＴＫアンテナの電波"
      },
      {
        no: 41,
        name: "オロロンハット２",
        details: ["ウイルスドロップのみ"],
        virus: "オルルン",
        virus_loc: "ロッポンドーヒルズの電波       ＴＫタワーの電波１       ＴＫタワーの電波２       バミューダラビリンス       てんくうのだいかいだん"
      },
      {
        no: 43,
        name: "ジェットスキー１",
        details: ["びじゅつかんの電波（ランダム）", "ヤエバリゾートの電波（ランダム）", "ゲレンデ１の電波（ランダム）", "ショッピングプラザの電波の電波商人"],
        virus: "ラビジェット",
        virus_loc: "オシャレタンスの電波       ヤエバリゾートの電波       ふんすいデンパの電波       ユキダルマの電波       グルメタウンの電波       わすれさられたこおりのぞうの電波       ゲレンデ１の電波       ゲレンデ２の電波"
      },
      {
        no: 44,
        name: "ジェットスキー２",
        details: ["ウイルスドロップのみ"],
        virus: "ラビロケット",
        virus_loc: "ヤエバリゾートの電波       きょだいてっぱんの電波       ゲレンデ２の電波       ドンブラー村の電波       てんぼうだいの電波       そうがんきょうの電波       ドッシーのいりえの電波       カンシひつじの電波"
      },
      {
        no: 46,
        name: "モエリング１",
        details: ["ロッポンドーヒルズの電波（固定）", "スバルのリビングの電波（ランダム）", "スバルのへやの電波（ランダム）", "ロッポンドーヒルズの電波（ランダム）", "ＴＫタワーの電波２（ランダム）"],
        virus: "モエローダー",
        virus_loc: "パソコンの電波       ヒルズ前どおりの電波       電波ひょうしきの電波       メガ・ディスプレイの電波       ショッピングプラザの電波       カンシカメラの電波       えいがかんの電波       ＴＫタワーの電波１       ＴＫタワーの電波２       ＴＫアンテナの電波"
      },
      {
        no: 47,
        name: "モエリング２",
        details: ["ウイルスドロップのみ"],
        virus: "モエモーター",
        virus_loc: "ヒルズ前どおりの電波       ＴＫタワーの電波２       コダマタウンのスカイウェーブ       フランクフルトやの電波"
      },
      {
        no: 48,
        name: "モエリング３",
        details: ["ウイルスドロップのみ"],
        virus: "モエバイカー",
        virus_loc: "裏ロッポンドーヒルズの電波       こわれたディスプレイの電波       裏ナンスカいせき２の電波"
      },
      {
        no: 50,
        name: "ダバフレイム２",
        details: ["ウイルスドロップのみ"],
        virus: "ピョコダンス",
        virus_loc: "ムーたいりく       へいしの間       ゆりかごの間"
      },
      {
        no: 52,
        name: "ヒートアッパー１",
        details: ["ゴン太のへやの電波（ランダム）", "ＢＩＧＷＡＶＥの電波（ランダム）"],
        virus: "ドッカーン",
        virus_loc: "コダマタウンの電波       ごちゃごちゃハコの電波       ふるいそうがんきょうの電波       びじゅつかんの電波       いじげん       きょだいてっぱんの電波       ドンブラー村のスカイウェーブ       ドンブラー村の電波       ナンスカの電波       ナンスカいせき２の電波"
      },
      {
        no: 54,
        name: "ヒートアッパー３",
        details: ["ウイルスドロップのみ"],
        virus: "スッガーン",
        virus_loc: "裏ナンスカのちじょうえの電波       裏ドッシーのいりえの電波       とまったふうしゃの電波"
      },
      {
        no: 58,
        name: "チェインバブル１",
        details: ["ドンブラー湖１の電波 （固定、いかだの場所に出る洞窟の左下の洞窟入り口を掘る）", "てんぼうだいの電波（ランダム）", "裏ドッシーのいりえの電波（ランダム）"],
        virus: "サワニガー",
        virus_loc: "ドンブラー村の電波       クックドゥドゥルドゥの電波       フランクフルトやの電波       てんぼうだいの電波       ドッシーのいりえの電波       ドンブラー湖１の電波       ドンブラー湖２の電波"
      },
      {
        no: 61,
        name: "ネバーレイン１",
        details: ["ムーたいりく（ランダム）"],
        virus: "ネバーラ",
        virus_loc: "ヒルズ前どおりの電波       ロッポンドーヒルズの電波       ＴＫタワーの電波１       ＴＫタワーの電波２"
      },
      {
        no: 62,
        name: "ネバーレイン２",
        details: ["ウイルスドロップのみ"],
        virus: "ベターラ",
        virus_loc: "裏コダマタウンの電波       こわれたバスていの電波"
      },
      {
        no: 64,
        name: "スノーボール１",
        details: ["びじゅつかんの電波（ランダム）"],
        virus: "スノーゴロン",
        virus_loc: "ゲレンデ１の電波       こわれたリフトの電波       ゲレンデ２の電波"
      },
      {
        no: 70,
        name: "ボルティックアイ１",
        details: ["グルメタウンの電波（ランダム）", "ゲレンデ１の電波（ランダム）", "ドンブラー村の電波（ランダム）"],
        virus: "アイズ",
        virus_loc: "ごちゃごちゃハコの電波       びじゅつかんの電波       カンリシステムの電波       グルメタウンの電波       わすれさられたこおりのぞうの電波       リゾートホテルの電波       しゅくはくモニターの電波       あんないパネルの電波       スウィートルームの電波       てんがいベッドの電波       ゲレンデ１の電波       ゲレンデ２の電波       てんぼうだいの電波       そうがんきょうの電波       ドンブラー湖１の電波       ドンブラー湖２の電波"
      },
      {
        no: 71,
        name: "ボルティックアイ２",
        details: ["ウイルスドロップのみ"],
        virus: "ガードアイ",
        virus_loc: "ムーたいりく       しんかんのぞうの電波       へいしの間"
      },
      {
        no: 74,
        name: "ホタルゲリ２",
        details: ["ウイルスドロップのみ"],
        virus: "ホタリーン",
        virus_loc: "エランドの電波       モンショウの電波"
      },
      {
        no: 82,
        name: "モジャランス１",
        details: ["リゾートホテルの電波（ランダム）", "スウィートルームの電波（ランダム）", "ゲレンデ１の電波（ランダム）"],
        virus: "モジャヘイ",
        virus_loc: "ごちゃごちゃハコの電波       ワゴンセールの電波       びじゅつかんの電波       ヤエバリゾートの電波       ふんすいデンパの電波       ユキダルマの電波       グルメタウンの電波       わすれさられたこおりのぞうの電波       リゾートホテルの電波       しゅくはくモニターの電波       あんないパネルの電波       スウィートルームの電波       てんがいベッドの電波       ゲレンデ１の電波       ゲレンデ２の電波       ドッシーのいりえの電波       ナンスカちじょうえの電波       ナンスカいせき１の電波       ナンスカいせき２の電波"
      },
      {
        no: 84,
        name: "モジャランス３",
        details: ["ウイルスドロップのみ"],
        virus: "モジャゲンスイ",
        virus_loc: "裏コダマタウンの電波       こわれたバスていの電波       じげんのハザマ１       ナンスカノオトメの電脳       じげんのハザマ２"
      },
      {
        no: 85,
        name: "ヘンゲノジュツ１",
        details: ["ドンブラー湖１の電波 （固定、水門を開ける手前の坂を下りたところを掘る）", "てんぼうだいの電波（ランダム）"],
        virus: "ヌッキー",
        virus_loc: "ドンブラー村の電波       クックドゥドゥルドゥの電波       フランクフルトやの電波       てんぼうだいの電波       そうがんきょうの電波       ドッシーのいりえの電波       カンシひつじの電波"
      },
      {
        no: 86,
        name: "ヘンゲノジュツ２",
        details: ["ウイルスドロップのみ"],
        virus: "マネヌッキー",
        virus_loc: "ふみだいの電波       きょだいてっぱんの電波"
      },
      {
        no: 89,
        name: "コガラシ２",
        details: ["ウイルスドロップのみ"],
        virus: "タツマキマル",
        virus_loc: "こわれたバスていの電波       とまったふうしゃの電波       ナンスカノオトメの電脳"
      },
      {
        no: 91,
        name: "ニドラッシュ１",
        details: ["ドンブラー村のスカイウェーブ（ランダム）", "ナンスカのスカイウェーブ（ランダム）"],
        virus: "フラッター",
        virus_loc: "オンスイプールの電波       ふみだいの電波       ＴＫタワーの電波２       コダマタウンのスカイウェーブ       ドンブラー村のスカイウェーブ       ドンブラー村の電波       ドッシーのいりえの電波       ナンスカのスカイウェーブ       こだいトンボの電波"
      },
      {
        no: 93,
        name: "ニドラッシュ３",
        details: ["ウイルスドロップのみ"],
        virus: "フラッタライザー",
        virus_loc: "じげんのハザマ１       裏ドッシーのいりえの電波       とまったふうしゃの電波       ナンスカノオトメの電脳"
      },
      {
        no: 94,
        name: "グリーンカーペット",
        details: ["ウイルスドロップのみ"],
        virus: "カカペット",
        virus_loc: "スバルのリビングの電波       ナンスカの電波       ムーのぞうの電波       ナンスカちじょうえの電波       こだいトンボの電波       ナンスカいせき１の電波       しょくだいの電波       ナンスカいせき２の電波       裏ゲレンデ２の電波"
      },
      {
        no: 97,
        name: "ケサランパサラン１",
        details: ["ドンブラー村のスカイウェーブ（固定）", "ドンブラー村のスカイウェーブ（ランダム）"],
        virus: "パサラン",
        virus_loc: "ふみだいの電波       コダマタウンのスカイウェーブ       てんぼうだいの電波       ナンスカのスカイウェーブ"
      },
      {
        no: 100,
        name: "ハンマーウェポン１",
        details: ["ウイルスドロップのみ"],
        virus: "ハンマリー",
        virus_loc: "ムーたいりく       へいしの間"
      },
      {
        no: 101,
        name: "ハンマーウェポン２",
        details: ["ウイルスドロップのみ"],
        virus: "ハンマリオ",
        virus_loc: "裏ロッポンドーヒルズの電波       こわれたディスプレイの電波"
      },
      {
        no: 103,
        name: "ジャングルストーム",
        details: ["裏コダマタウンの電波（ランダム）", "じげんのハザマ１（ランダム）"],
        virus: "ニョロフーン",
        virus_loc: "裏コダマタウンの電波       こわれたバスていの電波"
      },
      {
        no: 112,
        name: "ブラックホール１",
        details: ["ウイルスドロップのみ"],
        virus: "ヘルブラック",
        virus_loc: "へいしの間       ゆりかごの間       モンショウの電波"
      },
      {
        no: 115,
        name: "ベルセルクソード１",
        details: ["ウイルスドロップのみ"],
        virus: "バサリカ",
        virus_loc: "ふみだいの電波       コダマタウンのスカイウェーブ       てんぼうだいの電波       ナンスカのスカイウェーブ"
      },
      {
        no: 116,
        name: "ベルセルクソード２",
        details: ["ウイルスドロップのみ"],
        virus: "バサリグル",
        virus_loc: "ムーたいりく"
      },
      {
        no: 118,
        name: "タイフーンダンス",
        details: ["ナンスカちじょうえの電波の電波商人", "★１：通信対戦で５０回勝利した時にもらえる", "★３：裏ＴＫタワー２の電波の電波商人（要プラチナカード）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 119,
        name: "アトミックマイン１",
        details: ["ナンスカいせき１の電波（固定）", "ナンスカちじょうえの電波の電波商人", "★１：通信対戦で１００回戦闘した時にもらえる"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 123,
        name: "ゼツエンステージ",
        details: ["ナンスカのスカイウェーブ（ランダム）", "ナンスカいせき１の電波（ランダム）", "ナンスカいせき２の電波（ランダム）", "ムーたいりく（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 124,
        name: "リカバリー１０",
        details: ["コダマタウンの電波（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 125,
        name: "リカバリー３０",
        details: ["ヒルズ前どおりの電波（固定）", "エア・ディスプレイの電波（固定）", "ヒルズ前どおりの電波（ランダム）", "スバルのリビングの電波（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 126,
        name: "リカバリー５０",
        details: ["ゲレンデ２の電波（固定）", "びじゅつかんの電波（ランダム）", "スウィートルームの電波（ランダム）", "ショッピングプラザの電波の電波商人"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 127,
        name: "リカバリー８０",
        details: ["コダマタウンのスカイウェーブ（固定）", "ドンブラー湖２の電波（固定、人魚の下を掘る）", "ドンブラー村の電波（ランダム）", "てんぼうだいの電波（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 132,
        name: "バリア",
        details: ["コダマタウンの電波（ランダム）", "えいがかんの電波（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 134,
        name: "アタックパネル",
        details: ["いいんちょうのへやの電波（固定）", "ヤエバリゾートの電波（固定）", "ショッピングプラザの電波（ランダム）", "びじゅつかんの電波（ランダム）", "リゾートホテルの電波（ランダム）", "グルメタウンの電波（ランダム）", "ゲレンデ１の電波（ランダム）", "ゲレンデ２の電波（ランダム）", "コダマタウンのスカイウェーブ（ランダム）", "ナンスカのスカイウェーブ（ランダム）", "人助け：「あいざわ　らぶえ」"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 137,
        name: "インビジブル",
        details: ["えいがかんの電波（固定）", "ゲレンデ２の電波（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 138,
        name: "ホイッスル",
        details: ["キザマロのへやの電波（固定）", "キザマロのへやの電波（ランダム）", "人助け：「ヒロイ　カネ」"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 146,
        name: "クサムラステージ",
        details: ["コダマタウンの電波（ランダム）", "スバルのリビングの電波（ランダム）", "スバルのへやの電波（ランダム）", "ＴＫタワーの電波２（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 148,
        name: "ホーリーパネル",
        details: ["てんくうのだいかいだん （要オープンロック、", "階段の左端の途中に", "見えない通路があり、その先）", "裏ドンブラー湖の電波（固定）", "人助け：「星河　あかね」"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 149,
        name: "マヒプラス",
        details: ["スバルのリビングの電波（固定）", "スバルのへやの電波（ランダム）", "いいんちょうのへやの電波（ランダム）", "ゴン太のへやの電波（ランダム）", "ＢＩＧＷＡＶＥの電波（ランダム）", "ショッピングプラザの電波（ランダム）", "ＴＫタワーの電波１（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 150,
        name: "アタック＋１０",
        details: ["テレビの電波（固定）"],
        virus: "",
        virus_loc: ""
      },
    ]
  },
  {
    id: "ox_fire",
    title: "オックス・ファイア戦まで",
    description: "ヤエバリゾートでの大食い大会、オックス・ファイア戦まで。",
    cards: [
      {
        no: 147,
        name: "アイスステージ",
        details: ["ゲレンデ１の電波（固定）", "スウィートルームの電波（ランダム）", "ヤエバリゾートの電波（ランダム）"],
        virus: "",
        virus_loc: ""
      },
    ]
  },
  {
    id: "yeti_blizzard",
    title: "イエティ・ブリザード戦まで",
    description: "ゲレンデでの吹雪の異変、イエティ・ブリザード戦まで。",
    cards: [
      {
        no: 65,
        name: "スノーボール２",
        details: ["ウイルスドロップのみ"],
        virus: "スノーゴロドン",
        virus_loc: "ゲレンデ１の電波       ゲレンデ２の電波"
      },
    ]
  },
  {
    id: "harp_note",
    title: "ハープ・ノート戦まで",
    description: "BIG WAVEでのウイルス発生、ロッポンドーヒルズの美術館でのハープ・ノート戦まで。",
    cards: [
      {
        no: 1,
        name: "キャノン",
        details: ["★３：ＢＩＧＷＡＶＥ"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 14,
        name: "シンクロフック２",
        details: ["ＢＩＧＷＡＶＥの電波の電波商人"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 19,
        name: "ヒートグレネード",
        details: ["ＢＩＧＷＡＶＥ"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 131,
        name: "リカバリー３００",
        details: ["裏コダマタウンの電波（固定）", "じげんのハザマ１（固定）", "ナンスカノオトメの電脳（固定）", "人助け：「響　ミソラ」"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 140,
        name: "エリアイーター",
        details: ["ＢＩＧＷＡＶＥ"],
        virus: "",
        virus_loc: ""
      },
    ]
  },
  {
    id: "ophiucus_queen",
    title: "オヒュカス・クイーン戦まで",
    description: "コダマ小学校でのブライの襲撃や、映画館でのオヒュカス・クイーン戦まで。",
    cards: [
    ]
  },
  {
    id: "brachio_wave",
    title: "ブラキオ・ウェーブ戦まで",
    description: "アメロッパのドンブラー村、ドンブラー湖でのブラキオ・ウェーブ戦まで。",
    cards: [
      {
        no: 3,
        name: "ヘビーキャノン",
        details: ["ナンスカの電波（固定）", "ナンスカいせき２の電波（ランダム）", "★３：裏ＴＫタワー２の電波の電波商人（要ゴールドカード）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 9,
        name: "エアスプレッド３",
        details: ["ドッシーのいりえの電波（固定）", "ドンブラー村のスカイウェーブ（ランダム）", "ドンブラー湖２の電波（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 17,
        name: "ミニグレネード２",
        details: ["ドンブラー村のスカイウェーブ（ランダム）", "ドッシーのいりえの電波（ランダム）", "ドンブラー湖１の電波（ランダム）", "★３：ドンブラー村の電波（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 18,
        name: "ミニグレネード３",
        details: ["ナンスカちじょうえの電波（ランダム）", "ナンスカいせき１の電波（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 20,
        name: "グリーングレネード",
        details: ["★３：裏ナンスカのちじょうえの電波（固定）", "ナンスカちじょうえの電波の電波商人"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 28,
        name: "ダブルストーン",
        details: ["ナンスカちじょうえの電波の電波商人"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 49,
        name: "ダバフレイム１",
        details: ["ナンスカの電波（ランダム）", "ナンスカちじょうえの電波（ランダム）"],
        virus: "ダバダンス",
        virus_loc: "ナンスカいせき１の電波       しょくだいの電波       ナンスカいせき２の電波       バミューダラビリンス"
      },
      {
        no: 59,
        name: "チェインバブル２",
        details: ["ウイルスドロップのみ"],
        virus: "カワニガー",
        virus_loc: "ドンブラー村の電波       てんぼうだいの電波       ドッシーのいりえの電波       ドンブラー湖１の電波"
      },
      {
        no: 67,
        name: "ピラニアキッス１",
        details: ["ウイルスドロップのみ"],
        virus: "ピラニッシュ",
        virus_loc: "オンスイプールの電波       ドンブラー湖１の電波       ドンブラー湖２の電波       オウのカンムリの電波       ミスター・タコさんの電波"
      },
      {
        no: 68,
        name: "ピラニアキッス２",
        details: ["ウイルスドロップのみ"],
        virus: "ピラニヤン",
        virus_loc: "ドンブラー湖１の電波       ドンブラー湖２の電波       ちんぼつせんの電波       裏ドンブラー湖の電波"
      },
      {
        no: 73,
        name: "ホタルゲリ１",
        details: ["ウイルスドロップのみ"],
        virus: "ホタロー",
        virus_loc: "ドンブラー村の電波       てんぼうだいの電波       ドッシーのいりえの電波       バミューダラビリンス"
      },
      {
        no: 95,
        name: "ブルーカーペット",
        details: ["ナンスカのスカイウェーブ（ランダム）", "ナンスカいせき１の電波（ランダム）"],
        virus: "カカペーニョ",
        virus_loc: "裏ロッポンドーヒルズの電波       裏ゲレンデ２の電波       じげんのハザマ２"
      },
      {
        no: 98,
        name: "ケサランパサラン２",
        details: ["ウイルスドロップのみ"],
        virus: "フワラン",
        virus_loc: "てんぼうだいの電波       オウのカンムリの電波       ちんぼつせんの電波       ミスター・タコさんの電波       ナンスカのスカイウェーブ       ナンスカの電波       ナンスカちじょうえの電波       バミューダラビリンス       オリヒメのアジトの電波"
      },
      {
        no: 106,
        name: "エレキスラッシュ",
        details: ["ドンブラー湖１の電波（ランダム）", "へいしの間（ランダム）"],
        virus: "モノソード",
        virus_loc: "ドンブラー湖１の電波       ドンブラー湖２の電波       オウのカンムリの電波       ミスター・タコさんの電波       ナンスカの電波       ナンスカちじょうえの電波"
      },
      {
        no: 107,
        name: "ウッドスラッシュ",
        details: ["ウイルスドロップのみ"],
        virus: "モノソーディン",
        virus_loc: "ちんぼつせんの電波       ムーのぞうの電波       しょくだいの電波"
      },
      {
        no: 109,
        name: "モアイフォール１",
        details: ["ウイルスドロップのみ"],
        virus: "モアイアン",
        virus_loc: "ナンスカの電波       でんりゅうイワの電波       ムーのぞうの電波       ナンスカちじょうえの電波       こだいトンボの電波       ナンスカいせき１の電波       しょくだいの電波       ナンスカいせき２の電波"
      },
      {
        no: 110,
        name: "モアイフォール２",
        details: ["ウイルスドロップのみ"],
        virus: "ストーンヘッド",
        virus_loc: "ナンスカの電波       ナンスカちじょうえの電波       ナンスカいせき１の電波       ナンスカいせき２の電波       せいなるほのおの電波"
      },
      {
        no: 121,
        name: "アトミックマイン３",
        details: ["★１：ナンスカ・オサ・アガメ", "じげんのハザマ１（固定）", "じげんのハザマ１（ランダム）", "じげんのハザマ１の電波商人", "★３：裏ＴＫタワー２の電波の電波商人（要ブラックカード）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 122,
        name: "パラライズステージ",
        details: ["そうがんきょうの電波（固定）", "ドッシーのいりえの電波（ランダム）", "裏コダマタウンの電波（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 128,
        name: "リカバリー１２０",
        details: ["ナンスカのスカイウェーブ（ランダム）", "ナンスカの電波（ランダム）", "ナンスカいせき２の電波（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 133,
        name: "スーパーバリア",
        details: ["ナンスカのスカイウェーブ（固定）", "ナンスカのスカイウェーブ（ランダム）", "へいしの間（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 135,
        name: "フクヘイパネル",
        details: ["ドンブラー湖２の電波（固定、タコのいるすぐ左を掘る）", "ドンブラー村のスカイウェーブ（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 139,
        name: "ボムライザー",
        details: ["てんぼうだいの電波の電波商人"],
        virus: "",
        virus_loc: ""
      },
    ]
  },
  {
    id: "condor_geograph",
    title: "コンドル・ジオグラフ戦まで",
    description: "ナンスカ村でのゴン太救出、ナンスカ遺跡でのコンドル・ジオグラフ戦まで。",
    cards: [
      {
        no: 83,
        name: "モジャランス２",
        details: ["ウイルスドロップのみ"],
        virus: "モジャグンソウ",
        virus_loc: "ナンスカいせき１の電波       ナンスカいせき２の電波       せいなるほのおの電波"
      },
      {
        no: 87,
        name: "ヘンゲノジュツ３",
        details: ["ウイルスドロップのみ"],
        virus: "バケヌッキー",
        virus_loc: "裏ゲレンデ２の電波       裏ナンスカのちじょうえの電波       ナンスカノオトメの電脳"
      },
      {
        no: 130,
        name: "リカバリー２００",
        details: ["せいなるほのおの電波（固定）", "ゆりかごの間（固定）", "へいしの間（ランダム）", "ゆりかごの間（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 136,
        name: "バスターパネル",
        details: ["ナンスカいせき１の電波（固定）", "へいしの間（ランダム）", "裏ＴＫタワー２の電波（ランダム）"],
        virus: "",
        virus_loc: ""
      },
    ]
  },
  {
    id: "empty",
    title: "エンプティー戦まで",
    description: "バミューダラビリンスでのハープ・ノート、エンプティー戦まで。",
    cards: [
      {
        no: 21,
        name: "アイスグレネード",
        details: ["★１：じげんのハザマ１（固定）", "バミューダラビリンスの電波商人"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 26,
        name: "シルバーメテオ",
        details: ["バミューダラビリンス（固定）", "へいしの間（ランダム）", "人助け：「ナンスカ・リズ・ムンスカ」★３：裏ＴＫタワー２の電波の電波商人（要ゴールドカード）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 76,
        name: "ステルスレーザー１",
        details: ["ゆりかごの間（ランダム）"],
        virus: "ステルス",
        virus_loc: "バミューダラビリンス       てんくうのだいかいだん       オリヒメのアジトの電波"
      },
      {
        no: 88,
        name: "コガラシ１",
        details: ["ウイルスドロップのみ"],
        virus: "コガラシマル",
        virus_loc: "バミューダラビリンス       てんくうのだいかいだん"
      },
      {
        no: 92,
        name: "ニドラッシュ２",
        details: ["ウイルスドロップのみ"],
        virus: "フラッタリオン",
        virus_loc: "バミューダラビリンス       てんくうのだいかいだん"
      },
      {
        no: 120,
        name: "アトミックマイン２",
        details: ["ゆりかごの間（ランダム）", "裏ドッシーのいりえの電波（ランダム）", "バミューダラビリンスの電波商人"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 129,
        name: "リカバリー１５０",
        details: ["バミューダラビリンスの電波商人"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 141,
        name: "セイレイノイカリ",
        details: ["バミューダラビリンスの電波商人", "★３：裏ＴＫタワー２の電波の電波商人（要プラチナカード）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 143,
        name: "ドクリンゴ",
        details: ["バミューダラビリンスの電波商人"],
        virus: "",
        virus_loc: ""
      },
    ]
  },
  {
    id: "ra_mu",
    title: "ラ・ムー戦まで",
    description: "ムー大陸に突入し、守護ボスEX連戦からラストボス「ラ・ムー」戦まで。",
    cards: [
      {
        no: 53,
        name: "ヒートアッパー２",
        details: ["ウイルスドロップのみ"],
        virus: "ドッゴーン",
        virus_loc: "へいしの間       ゆりかごの間"
      },
      {
        no: 79,
        name: "マミーハンド１",
        details: ["てんくうのだいかいだん（ランダム）"],
        virus: "エレミーラ",
        virus_loc: "ゆりかごの間"
      },
    ]
  },
  {
    id: "post_game",
    title: "クリア後：エンドコンテンツ",
    description: "ジェミニ・スパーク戦、じげんのハザマでのIFボス戦、アポロン・フレイム、そして「ラ・ムー Xa」戦まで。",
    cards: [
      {
        no: 15,
        name: "シンクロフック３",
        details: ["ナンスカのスカイウェーブの電波商人★３：裏ＴＫタワー２の電波の電波商人（要ゴールドカード）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 27,
        name: "グレートアックス",
        details: ["じげんのハザマ１の電波商人", "★３：裏ＴＫタワー２の電波の電波商人（要ブラックカード）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 29,
        name: "ガーディアン",
        details: ["じげんのハザマ１（固定）", "じげんのハザマ１の電波商人", "★３：裏ＴＫタワー２の電波の電波商人（要ブラックカード）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 30,
        name: "オーラ",
        details: ["裏ＴＫタワー２の電波（固定）", "裏ドッシーのいりえの電波（ランダム）", "裏ナンスカいせき２の電波（ランダム）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 33,
        name: "グランドウェーブ３",
        details: ["ウイルスドロップのみ"],
        virus: "メットリオ３",
        virus_loc: "裏コダマタウンの電波       じげんのハザマ１"
      },
      {
        no: 36,
        name: "マッドバルカン３",
        details: ["ウイルスドロップのみ"],
        virus: "バルスナイパー",
        virus_loc: "裏ドンブラー湖の電波       裏ゲレンデ２の電波       裏ナンスカいせき２の電波"
      },
      {
        no: 42,
        name: "オロロンハット３",
        details: ["ウイルスドロップのみ"],
        virus: "オリリン",
        virus_loc: "裏ＴＫタワー２の電波       裏ドッシーのいりえの電波       裏ナンスカいせき２の電波"
      },
      {
        no: 45,
        name: "ジェットスキー３",
        details: ["ウイルスドロップのみ"],
        virus: "ラビニトロ",
        virus_loc: "裏ＴＫタワー２の電波       裏ナンスカいせき２の電波"
      },
      {
        no: 51,
        name: "ダバフレイム３",
        details: ["ウイルスドロップのみ"],
        virus: "ジャカダンス",
        virus_loc: "裏ナンスカのちじょうえの電波       裏ドッシーのいりえの電波"
      },
      {
        no: 55,
        name: "ボボボンボム１",
        details: ["じげんのハザマ１（ランダム）"],
        virus: "ボボン",
        virus_loc: "じげんのハザマ１"
      },
      {
        no: 56,
        name: "ボボボンボム２",
        details: ["ウイルスドロップのみ"],
        virus: "ボボボン",
        virus_loc: "裏ドンブラー湖の電波"
      },
      {
        no: 57,
        name: "ボボボンボム３",
        details: ["ウイルスドロップのみ"],
        virus: "ボボボボン",
        virus_loc: "じげんのハザマ２"
      },
      {
        no: 60,
        name: "チェインバブル３",
        details: ["ウイルスドロップのみ"],
        virus: "ウミニガー",
        virus_loc: "裏ナンスカのちじょうえの電波       裏ドッシーのいりえの電波"
      },
      {
        no: 63,
        name: "ネバーレイン３",
        details: ["ウイルスドロップのみ"],
        virus: "ヌチャーラ",
        virus_loc: "裏ロッポンドーヒルズの電波       裏ドンブラー湖の電波       じげんのハザマ２"
      },
      {
        no: 66,
        name: "スノーボール３",
        details: ["ウイルスドロップのみ"],
        virus: "スノーゴロリンガ",
        virus_loc: "裏ゲレンデ２の電波       裏ドッシーのいりえの電波"
      },
      {
        no: 69,
        name: "ピラニアキッス３",
        details: ["ウイルスドロップのみ"],
        virus: "ピラニッガ",
        virus_loc: "裏ドンブラー湖の電波"
      },
      {
        no: 72,
        name: "ボルティックアイ３",
        details: ["ウイルスドロップのみ"],
        virus: "プロテクトアイ",
        virus_loc: "裏ドッシーのいりえの電波       裏ナンスカいせき２の電波"
      },
      {
        no: 75,
        name: "ホタルゲリ３",
        details: ["ウイルスドロップのみ"],
        virus: "ホタリッガ",
        virus_loc: "裏ゲレンデ２の電波       裏ＴＫタワー２の電波"
      },
      {
        no: 77,
        name: "ステルスレーザー２",
        details: ["ウイルスドロップのみ"],
        virus: "メガステルス",
        virus_loc: "裏ナンスカのちじょうえの電波"
      },
      {
        no: 78,
        name: "ステルスレーザー３",
        details: ["ウイルスドロップのみ"],
        virus: "ギガステルス",
        virus_loc: "じげんのハザマ２"
      },
      {
        no: 80,
        name: "マミーハンド２",
        details: ["ウイルスドロップのみ"],
        virus: "エレマミー",
        virus_loc: "じげんのハザマ１"
      },
      {
        no: 81,
        name: "マミーハンド３",
        details: ["ウイルスドロップのみ"],
        virus: "エレファラオ",
        virus_loc: "裏ＴＫタワー２の電波"
      },
      {
        no: 90,
        name: "コガラシ３",
        details: ["ウイルスドロップのみ"],
        virus: "フウジンマル",
        virus_loc: "裏ロッポンドーヒルズの電波       裏ナンスカのちじょうえの電波"
      },
      {
        no: 96,
        name: "パープルカーペット",
        details: ["ウイルスドロップのみ"],
        virus: "カカペギロ",
        virus_loc: "じげんのハザマ２"
      },
      {
        no: 99,
        name: "ケサランパサラン３",
        details: ["ウイルスドロップのみ"],
        virus: "ポワラン",
        virus_loc: "裏ドンブラー湖の電波       裏ナンスカいせき２の電波"
      },
      {
        no: 102,
        name: "ハンマーウェポン３",
        details: ["ウイルスドロップのみ"],
        virus: "ハンマリドン",
        virus_loc: "じげんのハザマ２"
      },
      {
        no: 104,
        name: "スノーストーム",
        details: ["ウイルスドロップのみ"],
        virus: "ニョロバーン",
        virus_loc: "裏ゲレンデ２の電波"
      },
      {
        no: 105,
        name: "ポイズンストーム",
        details: ["ウイルスドロップのみ"],
        virus: "ニョロフンガー",
        virus_loc: "じげんのハザマ２"
      },
      {
        no: 108,
        name: "ファイアスラッシュ",
        details: ["ウイルスドロップのみ"],
        virus: "モノソーディル",
        virus_loc: "裏コダマタウンの電波       裏ＴＫタワー２の電波"
      },
      {
        no: 111,
        name: "モアイフォール３",
        details: ["ウイルスドロップのみ"],
        virus: "ジャイアントフェイス",
        virus_loc: "裏ドンブラー湖の電波       裏ナンスカのちじょうえの電波"
      },
      {
        no: 113,
        name: "ブラックホール２",
        details: ["ウイルスドロップのみ"],
        virus: "キラーブラック",
        virus_loc: "じげんのハザマ１"
      },
      {
        no: 114,
        name: "ブラックホール３",
        details: ["ウイルスドロップのみ"],
        virus: "デビルブラック",
        virus_loc: "裏ＴＫタワー２の電波"
      },
      {
        no: 117,
        name: "ベルセルクソード３",
        details: ["ウイルスドロップのみ"],
        virus: "バサリッガー",
        virus_loc: "裏ナンスカいせき２の電波       じげんのハザマ２"
      },
      {
        no: 142,
        name: "シラハドリ",
        details: ["ナンスカちじょうえの電波の電波商人★３：裏ＴＫタワー２の電波の電波商人（要ゴールドカード）"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 144,
        name: "ウラギリノススメ",
        details: ["じげんのハザマ１の電波商人"],
        virus: "",
        virus_loc: ""
      },
      {
        no: 145,
        name: "ギガマイン",
        details: ["じげんのハザマ１の電波商人", "★３：裏ＴＫタワー２の電波の電波商人（要ブラックカード）"],
        virus: "",
        virus_loc: ""
      },
    ]
  },
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
      
      const firstSource = card.details[0] || "ウイルスドロップのみ";
      let bodyText = "";
      
      if (card.details.length > 1) {
        const tooltipContent = card.details.map(d => d.replace(/"/g, '&quot;')).join('\n');
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
