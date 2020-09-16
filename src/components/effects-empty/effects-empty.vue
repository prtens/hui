<template>
  <div class="hn-empty">
    <div :class="classes">
      <div class="hn-empty__inner">
        <div>
          <i class="el-icon-chat-dot-round hn-empty--nodata">
          </i>
        </div>
        <div>{{content}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: "EffectsEmpty",
  props: {
    bg: {
      type: String,
      default: "white"
    },
    content: {
      type: String,
      default: "暂无内容"
    }
  },
  data() {
    return {};
  },
  computed: {
    classes() {
      let white = this.bg === 'white';
      return [(white ? 'hn-empty__white' : 'hn-empty__area')];
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$emit("toggleClick");
    }
  }
};
</script>

<style scoped></style>
