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

## 使い方（Claude Projectsでの運用）

1. Claude Projectsを新規作成する
2. 以下のファイルをProjectのKnowledgeに追加する：
   - `skills/writing-basics.md`
   - `skills/japanese-naturalness.md`
   - `skills/sports-media-tone.md`
   - `pipelines/game-report.md`
   - `pipelines/player-interview.md`
   - `pipelines/analysis.md`
3. `SYSTEM_PROMPT.md` の内容をProjectのSystem promptに貼り付ける
4. 会話で素材（試合記録・インタビュー文字起こし・公式データ）と媒体名を指定して生成する

## フィードバックループ

生成後にレビューし、ズレや良かった表現に気づいたら該当するスキルファイルを更新してKnowledgeを再アップロードする。
