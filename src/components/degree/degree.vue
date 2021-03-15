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
    color: {
      type: String
    }
  },
  data() {
    return {
      degree: 0
    };
  },
  computed: {
    classes() {
      return [
        'hn-degree'
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
      if (i >= 1) {
        opacity = base + i * (1 - base) / 9
      }
      return {
        opacity: opacity,
        'background-color': this.color
      }
    },
    genSpan() {
      let spanChild = []
      const degree = this.getDegree

      for (let i = 0; i < degree; i += 1) {
        spanChild.push(this.$createElement(
          'span',
          {
            class: [
              'hn-degree--bg',
              {
                [`hn-degree--${this.type}`]: !this.color
              }
            ],
            style: this.styles(i)
          },
          this.$slots.default
        ))
      }

      for (let i = degree; i < 10; i += 1) {
        spanChild.push(this.$createElement(
          'span',
          {
            class: 'hn-degree--bg'
          },
          this.$slots.default
        ))
      }

      return spanChild
    }
  },

  render(h) {
    return h(
      'div',
      {
        class: this.classes
      },
      [this.genSpan()]
    )
  }
};
</script>

<style scoped></style>
