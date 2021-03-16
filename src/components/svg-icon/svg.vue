<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="hn-svg-icon hn-svg-icon--external"
    v-on="$listeners"
  />
  <svg
    v-else
    :class="svgClass"
    aria-hidden="true"
    v-on="$listeners"
  >
    <use :href="iconName" />
  </svg>
</template>

<script type="text/babel">
import { isExternal } from 'hn-utils/lib/validates';

export default {
  name: "HSvgIcon",
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ""
    }
  },
  computed: {
    isExternal() {
      return isExternal(this.iconClass);
    },
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return "hn-svg-icon " + this.className;
      } else {
        return "hn-svg-icon";
      }
    },
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        "-webkit-mask": `url(${this.iconClass}) no-repeat 50% 50%`
      };
    }
  }
};
</script>

<style scoped></style>
