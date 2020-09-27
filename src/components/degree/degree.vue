<template>
  <div class="hn-degree">
    <div class="hn-degree__bg">
      <span class="hn-degree--box"
            v-for="i in 10"
            :key="i"></span>
    </div>
    <div class="hn-degree__on">
      <span
        v-for="i in degree"
        :key="i"
        :class="classes"
        :style="{ opacity: (opacity + i * (1 - opacity) / 9), 'background-color': color}"></span>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: "HDegree",
  props: {
    // 当前进度，0 ~ 100之间的数字，传入几位小数展示几位小数，最多保留两位小数
    num: Number,
    // 展示类型
    // error：红色错误类型提示
    // warn：黄色警告类型提示
    // pass：绿色通过类型提示
    // highlight：品牌色图标强调提示（默认）
    type: {
      type: String,
      validator(value) {
        return ['primary', 'danger', 'warning', 'success'].indexOf(value) !== -1;
      },
      default: 'primary'
    },
    // 基础透明度，<1 的数值，
    // 表示第一个格子的透明度，后续计算为 opacity = base + i * (1 - base) / 9
    opacity: {
      type: Number,
      default: 0.08
    }
  },
  data() {
    return {
      degree: null,
      color: ''
    };
  },
  computed: {
    classes() {
      return [
        `hn-degree--box`,
        `hn-degree--${this.type}`
      ];
    }
  },
  mounted() {
    this.assign()
  },
  methods: {
    assign() {
      let that = this;

      let num = +that.num || 0;
      let s = num + '';
      let i = s.indexOf('.');
      if (i >= 0) {
        i = s.slice(i + 1).length;
      } else {
        i = 0;
      }
      // 最多保留两位小数
      if (i > 2) {
        i = 2;
      }

      if (num < 0) {
        num = 0;
      }

      if (num > 100) {
        num = 100;
      }

      that.degree = Math.round(num / 10)
    }
  }
};
</script>

<style scoped></style>
