import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import hui from '../src/index';

import '../src/icons/index';

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import zhLang from 'element-ui/lib/locale/lang/zh-CN';
import locale from '../src/locale/lang/zh-CN';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(hui);
Vue.use(Element, {
  size: 'small',
  locale: [zhLang, ...locale]
});

const router = new VueRouter({
  esModule: false,
  mode: 'history',
  routes: [
    {
      path: '/affix',
      component: resolve => require(['./routers/affix.vue'], resolve)
    },
    {
      path: '/anchor',
      component: resolve => require(['./routers/anchor.vue'], resolve)
    },
    {
      path: '/backtop',
      component: resolve => require(['./routers/back-top.vue'], resolve)
    },
    {
      path: '/breadcrumb',
      component: resolve => require(['./routers/breadcrumb.vue'], resolve)
    },
    {
      path: '/chartsentrance',
      component: resolve => require(['./routers/charts-entrance.vue'], resolve)
    },
    {
      path: '/hamburger',
      component: resolve => require(['./routers/hamburger.vue'], resolve)
    },
    {
      path: '/list',
      component: resolve => require(['./routers/list.vue'], resolve)
    },
    {
      path: '/select',
      component: resolve =>
        require(['./routers/select.vue'], resolve)
    },
    {
      path: '/pagination',
      component: resolve => require(['./routers/pagination.vue'], resolve)
    },
    {
      path: '/screenfull',
      component: resolve => require(['./routers/screenfull.vue'], resolve)
    },
    {
      path: '/svgicon',
      component: resolve => require(['./routers/svg-icon.vue'], resolve)
    },
    {
      path: '/table-tree',
      component: resolve =>
        require(['./routers/table-tree.vue'], resolve)
    },
    {
      path: '/tip',
      component: resolve => require(['./routers/tip.vue'], resolve)
    },
    {
      path: '/time',
      component: resolve => require(['./routers/time.vue'], resolve)
    },
    {
      path: '/error',
      component: resolve => require(['./routers/error.vue'], resolve)
    },
    {
      path: '/Empty',
      component: resolve => require(['./routers/empty.vue'], resolve)
    },
    {
      path: '/calendar',
      component: resolve => require(['./routers/calendar.vue'], resolve)
    },
    {
      path: '/indics',
      component: resolve => require(['./routers/indics.vue'], resolve)
    },
    {
      path: '/drawer',
      component: resolve => require(['./routers/drawer.vue'], resolve)
    },
    {
      path: '/dialog',
      component: resolve => require(['./routers/dialog.vue'], resolve)
    },
    {
      path: '/skeleton',
      component: resolve => require(['./routers/skeleton.vue'], resolve)
    },
    {
      path: '/clipboard',
      component: resolve => require(['./routers/clipboard.vue'], resolve)
    },
    {
      path: '/mixin',
      component: resolve => require(['./routers/mixin.vue'], resolve)
    },
    {
      path: '/hour',
      component: resolve =>
        require(['./routers/hour.vue'], resolve)
    },
    {
      path: '/area',
      component: resolve => require(['./routers/area.vue'], resolve)
    },
    {
      path: '/duration',
      component: resolve =>
        require(['./routers/duration.vue'], resolve)
    }
  ]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
