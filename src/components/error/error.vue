<template>
  <div class="hn-error">

    <el-image
      class="hn-error__img"
      :src="img"
      fit="contain"
    ></el-image>

    <div class="hn-error__info">{{ tip }}</div>

    <div
      class="hn-error__footer"
      v-if="btns"
    >
      <el-button
        class="hn-error__btn"
        type="primary"
        @click="home"
      >{{ t('h.error.goHome') }}
      </el-button>
      <el-button
        class="hn-error__btn"
        type="primary"
        plain
        @click="back"
      >{{ t('h.error.goBack') }}
      </el-button>
    </div>
  </div>
</template>

<script type="text/babel">
import Locale from '../../mixins/locale';

export default {
  name: 'HError',
  mixins: [Locale],
  props: {
    type: {
      type: Number,
      default: 404
    },
    def: {
      type: String,
      default: ''
    },
    btns: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      img: '',
      tip: ''
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let that = this,
        tip = '',
        src = '';
      switch (that.type) {
        case 404:
          src = 'http://img.alicdn.com/tfs/TB1tAmuRCzqK1RjSZFpXXakSXXa-1262-668.png';
          tip = this.t('h.error.404');
          break;
        case 500:
          src = 'http://img.alicdn.com/tfs/TB1yZ5sRAvoK1RjSZPfXXXPKFXa-1182-792.png';
          tip = this.t('h.error.500');
          break;
        case 502:
          src = 'http://img.alicdn.com/tfs/TB1yZ5sRAvoK1RjSZPfXXXPKFXa-1182-792.png';
          tip = this.t('h.error.502');
          break;
      }

      that.img = src;
      that.tip = that.def || tip;
    },
    home() {
      this.$router.replace({path: '/'});
    },
    back(e) {
      e.preventDefault();
      // history.back();
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped></style>
