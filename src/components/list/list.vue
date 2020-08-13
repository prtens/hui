<template>
  <div :class="classes">
    <div
      class="hn-list-header"
      v-if="header || $slots.header"
    >
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="hn-list-container">
      <ul class="hn-list-items">
        <slot></slot>
      </ul>
    </div>
    <Spin
      v-if="loading"
      fix
      size="large"
    >
      <slot name="spin"></slot>
    </Spin>
    <div
      class="hn-list-footer"
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
    border: {
      type: Boolean,
      default: false
    },
    itemLayout: {
      validator(value) {
        return ["horizontal", "vertical"].indexOf(value) !== -1;
      },
      default: "horizontal"
    },
    // 或 slot
    header: {
      type: String,
      default: ""
    },
    // 或 slot
    footer: {
      type: String,
      default: ""
    },
    // 含 slot: spin
    loading: {
      type: Boolean,
      default: false
    },
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
        `${prefixCls}-${this.size}`,
        `${prefixCls}-${this.itemLayout}`,
        {
          [`${prefixCls}-bordered`]: this.border,
          [`${prefixCls}-split`]: this.split
        }
      ];
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped></style>
