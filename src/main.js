import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Vant UI
import Vant from "vant";
import "vant/lib/index.css";
import VConsole from 'vconsole'
// 多语
import VueI18n from "vue-i18n";
import messages from "./assets/lang/index";
import { Locals } from "./assets/lang/vantLocal";

import { Loading } from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;

if (process.env.NODE_ENV !== 'production') {
  new VConsole()
}

// element的组件
import { Select, Option, Pagination } from 'element-ui'
Vue.use(Select)
Vue.use(Option)
Vue.use(Pagination)

// 公共样式
import "@/styles/common.less";

// 刷新组件
import * as filters from "./filters";
import clipboard from "@/directive/clipboard/clipboard";

const app = process.env.VUE_APP_NAME
const appConfig = require('../appConfig/' + app + '/index')
Vue.directive("clipboard", clipboard);
Vue.use(Vant);
Vue.use(VueI18n);

// /*vue上挂在vant i18n方法*/
const i18n = new VueI18n({
  // 定义默认语言
  locale: localStorage.getItem("lang") || "zh",
  messages
});
if (!localStorage.getItem("lang")) {
  localStorage.setItem("lang", 'zh')
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.prototype.$Local = Locals;
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0
  try {
    store.state.user.noheader = true
    store.state.user.nofooter = false
    if (to.meta.title) {
      const title = i18n.messages[i18n.locale][to.meta.title] || appConfig.lowerName
      document.title = title
      store.dispatch('user/setPageTitle', title)
    } else {
      const title = appConfig.lowerName
      document.title = title
      store.dispatch('user/setPageTitle', title)
    }
  }
  catch (e) {
    console.log(e)
  }
  next()
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
