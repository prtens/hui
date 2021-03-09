<template>
  <div class="hn-degree">
    <div class="hn-degree__bg">
      <span
        class="hn-degree--box"
        v-for="i in 10"
        :key="i"
      ></span>
    </div>
    <div class="hn-degree__on">
      <span
        v-for="i in getDegree"
        :key="i"
        :class="classes"
        :style="styles(i - 1)"
      ></span>
    </div>
  </div>
</template>

<script type="text/babel">
const types = ["primary", "danger", "warning", "success"]

export default {
  name: "HDegree",
  props: {
    // 当前进度，0 ~ 100之间的数字，传入几位小数展示几位小数，最多保留两位小数
    num: {
      type: Number | String,
      required: true
    },
    // 展示类型
    type: {
      type: String,
      validator(value) {
        return types.indexOf(value) !== -1;
      },
      default: 'primary'
    },
    // 基础透明度，<1 的数值，
    // 表示第一个格子的透明度，后续计算为 opacity = base + i * (1 - base) / 9
    opacity: {
      type: Number | String,
      default: 0.08
    },
    // 自定义颜色
    color: String
  },
  data() {
    return {
      degree: null
    };
  },
  computed: {
    classes() {
      return [
        'hn-degree--box',
        {
          [`hn-degree--${this.type}`]: !this.color
        }
      ]
    },
    getDegree() {
      let num = +this.num;
      if (num < 0) {
        num = 0;
      }

      if (num > 100) {
        num = 100;
      }

      return Math.round(num / 10);
    }
  },
  methods: {
    styles(i) {
      let base = +this.opacity;
      let opacity = base;
      console.log(i)
      if (i >= 1) {
        opacity = base + i * (1 - base) / 9
      }
      return {
        opacity: opacity,
        'background-color': this.color
      }
    }
  }
};
</script>

<style scoped></style>
