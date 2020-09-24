<template>
  <div id="app" :class="{ 'is-component': isComponent }">
    <h-header v-if="lang !== 'play'"></h-header>
    <div class="main-cnt">
      <router-view></router-view>
    </div>
    <h-footer-nav v-if="lang !== 'play' && !isComponent"></h-footer-nav>
  </div>
</template>

<script>
import {use} from '../src/locale';
import zhLocale from '../src/locale/lang/zh-CN';
import HHeader from './components/header';
import HFooterNav from './components/footer-nav';

const lang = location.hash.replace('#', '').split('/')[1] || 'zh-CN';
const localize = lang => {
  switch (lang) {
    case 'zh-CN':
      use(zhLocale);
      break;
  }
};
localize(lang);

export default {
  name: 'app',
  components: {
    HHeader,
    HFooterNav
  },

  computed: {
    lang() {
      return this.$route.path.split('/')[1] || 'zh-CN';
    },
    isComponent() {
      return /^component-/.test(this.$route.name || '');
    }
  },

  watch: {},

  methods: {},

  mounted() {
  }
};
</script>
