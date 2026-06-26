# writing-agent

スポーツ媒体向け原稿作成エージェント。選手インタビュー（連載）とゲームレポートの2種類の原稿を対象とする。

## スキル構成

- `skills/writing-basics.md` — AI感を消す基本ルール
- `skills/japanese-naturalness.md` — 日本語らしい文体ルール
- `skills/sports-media-tone.md` — スポーツ媒体のトーン&マナー

## パイプライン

- `pipelines/player-interview.md` — 選手インタビュー・特集（Number Web・4years.・週プレなど）
- `pipelines/game-report.md` — ゲームレポート（Sporting News・Yahoo Newsなど）
- `pipelines/analysis.md` — 解説・考察記事（Sportiva：試合後分析・展望）

## 記事生成の手順

素材と媒体を以下のフォーマットで渡すと記事を生成する。

```
【媒体】
（媒体名）

【素材：試合記録】
（試合中の音声メモ・文字起こし）

【素材：インタビュー文字起こし】
（選手・HCのインタビュー）

【素材：公式データ】
（ドライブチャート・スタッツ）
```

素材が揃っていない場合はあるものだけ記入してよい。

## 生成時の必須手順（Claudeへの指示）

記事を生成する際は必ず以下の順番で実行すること：

1. `skills/writing-basics.md` を読む
2. `skills/japanese-naturalness.md` を読む
3. `skills/sports-media-tone.md` を読む
4. 指定された媒体に対応するパイプラインファイルを読む：
   - 試合レポート（BBM・Sporting News）→ `pipelines/game-report.md`
   - 選手特集・インタビュー（Number Web・4years.・週プレ・BBM特集）→ `pipelines/player-interview.md`
   - 解説・考察（Sportiva）→ `pipelines/analysis.md`
5. パイプラインの出力前チェックリストを実行してから原稿を出力する
6. 原稿を出力したら、必ず `feedback/originals/YYYYMMDD_媒体_タイトル.md` に原文をそのまま保存する

## フィードバックループ

### 方法A：修正済みファイルを渡す（推奨）

記者が記事を直接修正してファイルをアップした場合：

「この修正をスキルに反映して」＋修正済みファイルのパス（または内容）を渡す

Claudeが以下を実行する：
1. `feedback/originals/` から対応する原文を読む
2. 原文と修正済みファイルを比較して差分を抽出する
3. 差分からルールを導き出して該当スキル・パイプラインファイルに追記する
4. 修正済みファイルを `feedback/corrected/` に保存する

修正済みファイルのパスが分からない場合は、修正後の本文をそのままチャットに貼ってもよい。

### 方法B：フィードバックメモを書く

口頭では説明しにくい理由・判断を残したい場合：

1. `feedback/TEMPLATE.md` をコピーして `feedback/YYYYMMDD_媒体_タイトル.md` で保存する
2. 良かった点・修正した点・追加すべきルールを記入する
3. 「フィードバックをスキルに反映して」と伝える

Claudeが以下を実行する：
1. `feedback/` 内の未反映ファイルをすべて読む
2. 追加すべきルールを該当スキル・パイプラインファイルに追記する
3. フィードバックファイルの反映状況チェックボックスを更新する
