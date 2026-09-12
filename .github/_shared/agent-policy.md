# AI エージェント共通運用ポリシー（SSOT）

本ファイルは ShauErRider-HTML_CSS で作業する Claude・Codex・GitHub Copilot などに共通する運用ポリシーの正本です。

## 基本ルール

- 回答は日本語で行う。
- 変更量が 500 行を超える可能性が高い場合は、実行前に User の承認を得る。
- 多数のファイル生成、構成変更、ルール追加などの大きな変更前には計画を提示する。
- 不明点はリポジトリを調査し、それでも判断できず結果が大きく変わる場合は User に確認する。
- 作品設定、キャラクター設定、世界観用語、掲載内容、権利表記、公開方針は作者管理領域とする。明示的な依頼なしに本文を生成・確定・改変しない。
- `stylesheet.css` は生成物である。スタイル変更は `stylesheet.sass` を編集し、CSS を直接編集しない。
- SASS のコンパイルは VS Code 拡張機能が行うため、AI エージェントは明示的な依頼なしに手動コンパイルしない。
- 調査・提案ログは `.wip/{YYYY-MM-DD}_{topic}.md` に保存し、公開・コミットは User が判断する。

## SSOT の更新

- 技術仕様は `.github/_shared/project-spec.md` を更新する。
- 共通運用は本ファイルを更新する。
- ロールプレイ設定は `.github/_roleplay-datas/roleplay-prompt.md` を更新する。
- `AGENTS.md`、`CLAUDE.md`、`.github/copilot-instructions.md` は入口であり、共通仕様本文を転記しない。
