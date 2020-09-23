<template>
  <li
    class="hn-list__item"
    :class="classes"
  >
    <template v-if="itemLayout === 'vertical' && $slots.extra">
      <div class="hn-list__item-main">
        <slot></slot>
        <ul
          class="hn-list__item-action"
          v-if="$slots.action"
        >
          <slot name="action"></slot>
        </ul>
      </div>
      <div class="hn-list__item-extra">
        <slot name="extra"></slot>
      </div>
    </template>
    <template v-else>
      <slot></slot>
      <ul
        class="hn-list__item-action"
        v-if="$slots.action"
      >
        <slot name="action"></slot>
      </ul>
      <div class="hn-list__item-extra">
        <slot name="extra"></slot>
      </div>
    </template>
  </li>
</template>

<script type="text/babel">
export default {
  name: "HListItem",
  inject: ["ListInstance"],
  props: {},
  computed: {
    itemLayout() {
      return this.ListInstance.itemLayout;
    },
    isItemContainsTextNode() {
      let result;
      this.$slots.default.forEach(item => {
        if (typeof item === "string") {
          result = true;
        }
      });
      return result;
    },
    isFlexMode() {
      const extra = this.$slots.extra;

      if (this.itemLayout === "vertical") {
        return !!extra;
      }

      return !this.isItemContainsTextNode;
    },
    classes() {
      return [
        {
          "hn-list__item-no-flex": !this.isFlexMode
        }
      ];
    }
  }
};
</script>
