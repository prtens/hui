<template>
  <div :class="[typeClass]">
    <p v-if="$slots.default && !description">
      <slot name="default"></slot>
    </p>
    <p v-if="description && !$slots.default">{{ description }}</p>
  </div>
</template>

<script type="text/babel">
const types = ["default", "danger"]

export default {
  name: "HTip",
  props: {
    type: {
      type: String,
      validator: function (value) {
        return types.indexOf(value) !== -1;
      },
      default: "default"
    },
    description: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      prefix: 'hn-tip'
    };
  },
  computed: {
    typeClass() {
      return [this.prefix, `${this.prefix}--${this.type}`];
    }
  }
};
</script>

<style lang="scss" scoped></style>
