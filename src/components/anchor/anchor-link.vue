<template>
  <div :class="anchorLinkClasses">
    <el-link
      :underline="false"
      :class="linkTitleClasses"
      :href="href"
      :data-scroll-offset="scrollOffset"
      :data-href="href"
      @click.prevent="goAnchor"
      :title="title"
    >
      {{ title }}
    </el-link>
    <slot></slot>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'HAnchorLink',
  inject: ['anchorCom'],
  props: {
    href: String,
    title: String,
    scrollOffset: {
      type: Number,
      default() {
        return this.anchorCom.scrollOffset;
      }
    }
  },
  data() {
    return {
      prefix: 'hn-anchor__link'
    };
  },
  computed: {
    anchorLinkClasses() {
      return [
        this.prefix,
        this.anchorCom.currentLink === this.href ? `${this.prefix}-active` : ''
      ];
    },
    linkTitleClasses() {
      return [
        `${this.prefix}-title`
      ];
    }
  },
  methods: {
    goAnchor() {
      this.currentLink = this.href;
      this.anchorCom.handleHashChange();
      this.anchorCom.handleScrollTo();
      this.anchorCom.$emit('select', this.href);
      const isRoute = this.$router;
      if (isRoute) {
        this.$router.push(this.href, () => {
        });
      } else {
        window.location.href = this.href;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.anchorCom.init();
    });
  }
};
</script>
