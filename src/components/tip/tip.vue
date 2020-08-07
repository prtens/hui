<template>
  <div :class="[typeClass]">
    <p v-if="$slots.default && !description">
      <slot name="default"></slot>
    </p>
    <p v-if="description && !$slots.default">{{ description }}</p>
  </div>
</template>

<script type="text/babel">
const prefixCls = "hn-tip";

export default {
  name: "Tip",
  props: {
    type: {
      type: String,
      validator: function(value) {
        return ["default", "warning"].indexOf(value) !== -1;
      },
      default: "default"
    },
    description: {
      type: String,
      default: ""
    }
  },
  computed: {
    typeClass() {
      return [prefixCls, `${prefixCls}--${this.type}`];
    }
  }
};
</script>

<style lang="scss" scoped></style>
