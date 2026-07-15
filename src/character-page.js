/**
 * character-page.js - 獣爾騎兵 キャラクター詳細ページ用 Vue コンポーネント
 * @description NumberTales サイトの character-page-comp を踏襲し、獣爾騎兵の
 *   フィールド構成（干支/獣種・番手・獣種特性など）に合わせて再構成したもの。
 *   各値は slot 経由で HTML 側から流し込む（本文データは author 管理領域）。
 * @author 100BeautiesLab.
 * @version 1.0.0
 * @dependencies Vue 3 CDN 版（#app-character-page にマウント）
 */
const characterPageComponent = {
	props: {
		/** タイトル見出しを横幅いっぱいのスタイルにするか */
		wideStyle: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	template: `<h1>獣爾騎兵 紹介</h1>
    <h2 v-bind:class="{'h2-wide': titleStyleIsWide}"><slot name="title">(No Name)</slot><span class="char-reading"><slot name="reading"></slot></span></h2>
	<span class="char-formalname"><slot name="formalname"></slot></span>
    <div class="character0">
      <div class="character1">
        <p><slot><span class="p-bold">Coming Soon...</span></slot></p><br />
      </div>
	  <slot name="characterimage"><img alt="画像が見つかりませんでした" src="/img/no-image.png" class="character-img" /></slot>
      <div class="character1">
	  <p class="p-block">
          <span class="p-bold">獣種</span>：<slot name="beast">？？？</slot>
<br />
          <span class="p-bold">番手</span>：<slot name="riderno">？？？</slot><br />
          <span class="p-bold">性別</span>：<slot name="gender">？？</slot><br />
          <span class="p-bold">設定年齢</span>：<slot name="conceptage">???</slot><br />
          <span class="p-bold">身長</span>：<slot name="height">???cm</slot><br />
          <span class="p-bold">体重</span>：<slot name="weight">??kg</slot>
        </p>
	  </div>
      <div class="character2">
        <p class="p-block">
          <span class="p-bold">誕生日</span>：<slot name="birthday">？？？</slot><br />
          <span class="p-bold">所属</span>：<slot name="belonging">獣爾騎兵</slot><br />
          <span class="p-bold">獣種特性</span>：<slot name="beastspecname">？？？</slot><br />
          <slot name="beastspecabout">？？？</slot><br />
          <span class="p-bold">性格</span>：<slot name="characteristic">？？？</slot><br />
          <span class="p-bold">趣味</span>：<slot name="hobby">？？？</slot><br />
          <span class="p-bold">特技</span>：<slot name="skill">？？？</slot><br />
          <span class="p-bold">好きなもの</span>：<slot name="favors">？？？</slot><br />
          <span class="p-bold">苦手なもの</span>：<slot name="unlikes">？？？</slot>
        </p><slot name="additions"></slot></div>
    </div>
    <a href="/characters.html">
      <h2 class="h2-a-link">キャラクター一覧へ戻る</h2>
    </a>`,
	data() {
		return {
			titleStyleIsWide: this.wideStyle,
		};
	},
};

Vue.createApp({
	components: {
		"character-page-comp": characterPageComponent,
	},
}).mount("#app-character-page");
