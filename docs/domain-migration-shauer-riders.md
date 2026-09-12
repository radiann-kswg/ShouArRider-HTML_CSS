# 獣爾騎兵サイト ドメイン移管手順（shauer-riders.com → shauer-riders.com）

作成: 2026-09-12 / 対象リポジトリ: ShauErRider-HTML_CSS（GitHub Pages, radiann-kswg）
現状: `www.shauer-riders.com` を CNAME に設定し、Cloudflare（NS: ali / nash）で apex・www とも Proxied（オレンジ雲）運用。

正規 URL は現行と同じく **`https://www.shauer-riders.com/`**（www あり）とし、apex は www へ寄せる。

---

## 0. リポジトリ側（ローカル編集済み・未コミット）

| リポジトリ | ファイル | 変更 |
| --- | --- | --- |
| ShauErRider-HTML_CSS (main) | `CNAME` | `www.shauer-riders.com` → `www.shauer-riders.com` |
| RadianNs_WebSite (develop) | `index.html` L59, L122 / `src/hamberger-menu.js` L24 | リンク先 URL を新ドメインへ |

- `CNAME` の push は **手順 3 の直前**まで待つこと（先に push すると GitHub 側が新ドメインを検証しに行き、DNS 未設定だと Pages がカスタムドメインなし状態になって旧ドメインでも一時的に落ちる）。
- RadianNs_WebSite 側のリンク文言「Shou'ar Riders Official」と画像パス `img/news_contents/shauer-riders/` は据え置き（作者管理領域。表記も変えるなら別途）。

## 1. ドメイン取得（Cloudflare Registrar）

1. Cloudflare ダッシュボード → Domain Registration → Register Domains → `shauer-riders.com` を検索して購入。
2. 自動的に同アカウントのゾーンとして追加され、NS も Cloudflare になる（別レジストラなら Add a Site → NS 変更が必要）。
3. WHOIS 情報は shauer-riders.com と同じ内容にしておく（プライバシー保護は既定で ON）。

## 2. 新ゾーン `shauer-riders.com` の DNS

shauer-riders.com のレコードを鏡写しにする。

| Type | Name | Content | Proxy |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | Proxied |
| A | `@` | `185.199.109.153` | Proxied |
| A | `@` | `185.199.110.153` | Proxied |
| A | `@` | `185.199.111.153` | Proxied |
| CNAME | `www` | `radiann-kswg.github.io` | Proxied |

- SSL/TLS モードは旧ゾーンと同じ **Full**（Flexible だと GitHub 側でリダイレクトループになる）。
- 旧ゾーンで設定していたもの（Always Use HTTPS、Automatic HTTPS Rewrites、Page Rules、Turnstile 等）があれば同じく設定。
- 旧ゾーンのレコードが上記と違う場合は旧ゾーンを正とする（ダッシュボードで要確認）。

## 3. GitHub Pages のカスタムドメイン切替

1. `ShauErRider-HTML_CSS` の `CNAME` 変更を main に push。
2. GitHub → リポジトリ Settings → Pages → Custom domain が `www.shauer-riders.com` になっていることを確認（CNAME push で自動反映される。されていなければ手入力して Save）。
3. DNS check が緑になるまで待つ → 証明書発行後に **Enforce HTTPS** を ON。
4. 任意: Settings → Pages 上部の Verified domains（アカウント設定 → Pages → Add a domain）で `shauer-riders.com` を検証しておくと乗っ取り防止になる。旧ドメインの検証も残しておく。

動作確認:

```powershell
curl.exe -sI https://www.shauer-riders.com/ | Select-String 'HTTP/|location'
curl.exe -sI https://shauer-riders.com/     | Select-String 'HTTP/|location'   # → www へ 301
```

## 4. 旧ドメイン `shauer-riders.com` → 新ドメインへ 301

Cloudflare の Redirect Rules（Rules → Redirect Rules → Create rule）を旧ゾーンに 1 本追加する。DNS レコードは削除せずそのまま Proxied で残す（Proxied でないとルールが効かない。GitHub 側からは既に外れているので実体は不要）。

- Rule name: `Redirect to shauer-riders.com`
- When incoming requests match: **Custom filter expression**
  ```
  (http.host eq "shauer-riders.com") or (http.host eq "www.shauer-riders.com")
  ```
  （ゾーン全体でよければ「All incoming requests」でも可）
- Then: **Dynamic**
  ```
  concat("https://www.shauer-riders.com", http.request.uri.path)
  ```
- Status code: **301**
- Preserve query string: **ON**

動作確認:

```powershell
curl.exe -sI "https://www.shauer-riders.com/characters.html?x=1" | Select-String 'HTTP/|location'
# → HTTP/1.1 301 / location: https://www.shauer-riders.com/characters.html?x=1
curl.exe -sI http://shauer-riders.com/stories.html | Select-String 'HTTP/|location'
```

## 5. 周辺の後始末

- RadianNs_WebSite の変更を develop にコミット → 通常フローで公開。
- Google Search Console: 新プロパティ `www.shauer-riders.com` を追加し、旧プロパティで「アドレス変更」を実行。サイトマップがあれば新側で再送信。
- SNS プロフィール・pixiv・Misskey・名刺・同人誌奥付など、外部に書いた旧 URL を差し替え（リダイレクトは残るが、旧ドメインの更新を止める日まで）。
- `shauer-riders.com` は **最低 1 年（できれば 2〜3 年）保持**してからリダイレクトを止める。失効するとタイポドメインとして第三者に取られ得るので、更新を止めるかは要判断。
- 各リポジトリの AGENTS.md / project-spec 等にドメイン記載があれば更新（今回の grep ではコード内の参照は上記 4 箇所のみだった）。

## 6. リポジトリ名の変更（ShauErRider-HTML_CSS → ShauErRider-HTML_CSS）

ローカル側は 2026-09-12 に実施済み: フォルダ名を `ShauErRider-HTML_CSS` に変更、`origin` を `https://github.com/radiann-kswg/ShauErRider-HTML_CSS.git` に変更、各リポジトリ内の旧リポジトリ名の記載（AGENTS.md / CLAUDE.md / .github/_shared/* / copilot-instructions / radiann-kswg README / ワークスペース AGENTS.md / .wip アーカイブ / NumberTales の sass コメント）を新名へ置換。`index.html` の meta keywords「ShauErRiders」は作品表記なので据え置き。

GitHub 側（User が実施）:

1. GitHub → `radiann-kswg/ShauErRider-HTML_CSS` → Settings → General → Repository name を `ShauErRider-HTML_CSS` に変更 → Rename。
2. 旧名の URL（web / git remote）は GitHub が自動で新名へリダイレクトするが、ローカルの `origin` はすでに新名にしてあるので、リネーム後に `git fetch` が通ることを確認する。
3. GitHub Pages の設定・カスタムドメイン・Actions（`static.yml` / `jekyll-gh-pages.yml`）はリネームで引き継がれる。フォールバック URL だけ `radiann-kswg.github.io/ShauErRider-HTML_CSS/` に変わる。
4. Cowork の接続フォルダ「ShauErRider-HTML_CSS」は外れているので、`D:\VisualStudio Code Userfile\WebSites\ShauErRider-HTML_CSS` を接続し直す。
5. Mac 側（`/Users/snine9801/VSCodeUserFiles/Websites/ShauErRider-HTML_CSS`）は `mv` でフォルダ名を変え、`git remote set-url origin` を同様に実行し、`git pull` でファイル側の変更を取り込む。ワークスペース `AGENTS.md` の Mac コピーも Windows 側と揃える。

コミット順の目安: ① 記載変更（AGENTS/CLAUDE/.github/docs）→ ② GitHub でリネーム → ③ DNS 準備後に `CNAME` を push。①と③を同じコミットにしない。

## 実施チェックリスト

- [ ] 1. shauer-riders.com を Cloudflare Registrar で取得
- [ ] 2. 新ゾーンの DNS 5 レコード + SSL Full + 旧ゾーンと同じ設定
- [ ] 3. CNAME を push → Pages の Custom domain 確認 → Enforce HTTPS
- [ ] 4. 旧ゾーンに Redirect Rule（301, query 保持）
- [ ] 5. RadianNs_WebSite のリンク変更をコミット・公開
- [ ] 6. Search Console アドレス変更 / 外部 URL 差し替え
- [ ] 7. GitHub でリポジトリ名を ShauErRider-HTML_CSS に変更 → fetch 確認 → Cowork 接続フォルダ再接続 → Mac 側フォルダ名・origin 変更
