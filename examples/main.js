import Vue from 'vue';
import entry from './App';
import VueRouter from 'vue-router';
import hljs from 'highlight.js';
import routes from './route.config';
import title from './i18n/title.json';

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import zhLang from 'element-ui/lib/locale/lang/zh-CN';

import HuoNuUi from '../src/index.js';
import '../src/styles/index.scss';
import locale from '../src/locale/lang/zh-CN';

import './assets/styles/index.scss';

import demoBlock from './components/demo-block';

Vue.use(VueRouter);
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

Vue.use(HuoNuUi);
Vue.use(Element, {
  size: 'small',
  locale: [zhLang, ...locale]
});

Vue.component('demo-block', demoBlock);

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});

router.afterEach(route => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
  const data = title[route.meta.lang];
  for (let val in data) {
    if (new RegExp('^' + val, 'g').test(route.name)) {
      document.title = data[val];
      return;
    }
  }
  document.title = 'Huo Nu Ui';
});

new Vue({ // eslint-disable-line
  ...entry,
  router
}).$mount('#app');
