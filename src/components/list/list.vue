<template>
  <div :class="classes">
    <div
      class="hn-list__header"
      v-if="header || $slots.header"
    >
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="hn-list__container">
      <ul class="hn-list__items">
        <slot></slot>
      </ul>
    </div>
    <div
      class="hn-list__footer"
      v-if="footer || $slots.footer"
    >
      <slot name="footer">{{ footer }}</slot>
    </div>
  </div>
</template>

<script type="text/babel">
const prefixCls = "hn-list";

export default {
  name: "List",
  provide() {
    return {
      ListInstance: this
    };
  },
  props: {
    // 是否显示边框
    border: {
      type: Boolean,
      default: false
    },
    // 设置 ListItem 布局, 可选值为 horizontal（横排）或 vertical（竖直）
    itemLayout: {
      validator(value) {
        return ["horizontal", "vertical"].indexOf(value) !== -1;
      },
      default: "horizontal"
    },
    // 列表头部 或 slot
    header: {
      type: String,
      default: ""
    },
    // 列表底部 或 slot
    footer: {
      type: String,
      default: ""
    },
    // 列表尺寸，可选值为 small、large、default
    size: {
      validator(value) {
        return ["small", "large", "default"].indexOf(value) !== -1;
      },
      default() {
        return !this.$HNUI || this.$HNUI.size === ""
          ? "default"
          : this.$HNUI.size;
      }
    },
    // 是否展示分割线
    split: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        `${prefixCls}--${this.size}`,
        `${prefixCls}--${this.itemLayout}`,
        {
          [`${prefixCls}--bordered`]: this.border,
          [`${prefixCls}--split`]: this.split
        }
      ];
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped></style>
