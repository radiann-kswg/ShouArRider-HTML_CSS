/**
 * story-page.js - 獣爾騎兵 公式ＳＳ連載ページ用 Vue コンポーネント
 * @description NumberTales サイトの characterstory-component.js を参考に、
 *   獣爾騎兵の一話読み切り連載（幕形式）向けに再構成したもの。
 *   本文・タイトル・初出情報・前後幕ナビは slot 経由で HTML 側から流し込む
 *   （本文データは author 管理領域。Misskey 公式ノートからの転記）。
 * @author 100BeautiesLab.
 * @version 1.0.0
 * @dependencies Vue 3 CDN 版（#app-story-page にマウント）
 */
const storyPageComponent = {
  template: `<h1>獣爾騎兵 公式ＳＳ</h1>
    <h2><slot name="title">(No Title)</slot></h2>
    <p class="story-date"><slot name="date"></slot></p>
    <div class="background0 story0">
      <div class="story-body">
        <slot><p><span class="p-bold">Coming Soon...</span></p></slot>
      </div>
    </div>
    <div class="story-nav">
      <slot name="nav"></slot>
      <a class="a-link" href="/stories.html">ストーリー一覧へ戻る</a>
    </div>`,
};

Vue.createApp({
  components: {
    "story-page-comp": storyPageComponent,
  },
}).mount("#app-story-page");
