# writing-agent

スポーツ媒体向け原稿作成エージェント。選手インタビュー（連載）とゲームレポートの2種類の原稿を対象とする。

## スキル構成

- `skills/writing-basics.md` — AI感を消す基本ルール
- `skills/japanese-naturalness.md` — 日本語らしい文体ルール
- `skills/sports-media-tone.md` — スポーツ媒体のトーン&マナー

## パイプライン

- `pipelines/player-interview.md` — 選手インタビュー（連載形式）
- `pipelines/game-report.md` — ゲームレポート

## 使い方

原稿を生成する際は、対象パイプラインのプロンプトに素材（文字起こし・メモ・スコア等）を貼り付けて実行する。
生成後は人間がレビューし、良かった表現・修正点をスキルにフィードバックしてルールを更新する。
