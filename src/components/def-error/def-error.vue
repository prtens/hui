<template>
  <div class="hn-error">

    <el-image
      class="bad-img"
      :src="img"
      fit="contain"
    ></el-image>

    <div class="info">{{tip}}</div>

    <div
      class="btns"
      v-if="btns"
    >
      <el-button
        class="home-btn"
        type="primary"
        @click="home"
      >回到首页</el-button>
      <el-button
        class="back-btn"
        type="primary"
        plain
        @click="back"
      >返回上一页</el-button>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: "DefError",
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
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let that = this,
        tip = '',
        src = ""
      switch (that.type) {
        case 404:
          src = 'http://img.alicdn.com/tfs/TB1tAmuRCzqK1RjSZFpXXakSXXa-1262-668.png';
          tip = '抱歉，您查看的页面不存在或无权限查看当前页面';
          break;
        case 500:
          src = 'http://img.alicdn.com/tfs/TB1yZ5sRAvoK1RjSZPfXXXPKFXa-1182-792.png';
          tip = '500 Internal Server Error';
          break;
        case 502:
          src = 'http://img.alicdn.com/tfs/TB1yZ5sRAvoK1RjSZPfXXXPKFXa-1182-792.png';
          tip = '502 Bad Gateway';
          break;
      }

      that.img = src
      that.tip = that.def || tip
    },
    home() {
      this.$router.replace({ path: '/' })
    },
    back(e) {
      e.preventDefault();
      // history.back();
      this.$router.go(-1)
    }
  }
};
</script>

<style scoped></style>
