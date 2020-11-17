import Vue from "vue";
import VueRouter from "vue-router";
import home from '@/views/home/index.vue'
import test from '@/views/test/index.vue'
import help from '@/views/help/index.vue'
import type from '@/views/type/index.vue'
import announcement from '@/views/announcement/index.vue'
import noticeDetails from '@/views/noticeDetails/index.vue'
import cooperation from '@/views/cooperation/index.vue'

import routerConfig from './router_config'

const app = process.env.VUE_APP_NAME
const appConfig = require('../../appConfig/' + app + '/index')
for (const key in appConfig.source) {
  appConfig.source[key].src = require('../../appConfig/' + app + '/' + appConfig.source[key].src)
  console.log(appConfig.source[key].src)
}
let ele = document.documentElement
// console.log(ele)
if (appConfig.differenceSource) {

	for (let key in appConfig.differenceSource) {
		let img = require('../../appConfig/' + app + '/' + appConfig.differenceSource[key])
		console.log(img)
		ele.style.setProperty('--'+key, 'url('+img+')')
	}
}
console.log(appConfig)
Vue.prototype.$appConfig = appConfig
Vue.prototype.$moduleControl = appConfig.moduleControl;
Vue.use(VueRouter);

const routes = [];
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/test',
      name: 'test',
      component: test,
      meta: {
        title: '测试'
      }
    },

    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/help',
      name: 'help',
      component: help,
      meta: {
        title: '帮助中心'
      }
    },
    {
      path: '/type',
      name: 'type',
      component: type,
      meta: {
        title: ''
      }
    },
    {
      path: '/announcement',
      name: 'announcement',
      component: announcement,
      meta: {
        title: '公告中心'
      }
    },
    {
      path: '/noticeDetails/:id',
      name: 'noticeDetails',
      component: noticeDetails,
      meta: {
        title: '公告详情'
      }
    },
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/cooperation',
      name: 'cooperation',
      component: cooperation,
      meta: {
        title: '商户合作'
      }
    }
  ].concat(routerConfig)

});

export default router;
