<template>
  <div class="hn-empty">
    <div :class="classes">
      <div class="hn-empty__inner">
        <div>
          <i class="el-icon-chat-dot-round hn-empty--nodata">
          </i>
        </div>
        <div>{{ getContent }}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import Locale from '../../mixins/locale';

export default {
  name: 'HEmpty',
  mixins: [Locale],
  props: {
    bg: {
      type: String,
      default: 'white'
    },
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  },
  computed: {
    classes() {
      let white = this.bg === 'white';
      return [(white ? 'hn-empty__white' : 'hn-empty__area')];
    },
    getContent() {
      let content = this.t('h.effectsEmpty.content');
      if (this.content) {
        content = this.content;
      }

      return content;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$emit('toggleClick');
    }
  }
};
</script>

<style scoped></style>
