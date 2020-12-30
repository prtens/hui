<template>
  <div :class="`editor ${editing ? 'editor-on' : ''}`">
    <el-input
      ref="editorInput"
      class="editor-input"
      v-model="getContent"
      :size="size"
      :style="`width: ${width}px;`"
      @blur="out"
      @input="change"
    ></el-input>
    <div class="editor-content">
      {{content}}
      <!-- operations 表格hover展示样式 -->
      <i
        class="el-icon-edit operations editor-oper"
        @click="show"
      ></i>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: "HEditor",
  props: {
    // 需要编辑的文案
    content: {
      type: String,
      required: true,
      default: ""
    },
    // 校验规则
    rules: {
      type: Object
    },
    // 尺寸
    size: {
      type: String,
      default: "medium"
    },
    // input的宽度
    width: {
      type: Number,
      default: 140
    }
  },
  data() {
    return {
      editing: false
    };
  },
  computed: {
    getContent: {
      get() {
        return this.content;
      },
      set(val) {
        console.log(val)
        this.$emit("update:content", val);
      }
    }
  },
  methods: {
    init() {
    },
    show() {
      this.editing = true
      this.$nextTick(() => {
        this.$refs.editorInput.focus();
      })
    },
    out() {
      this.editing = false
    },
    change(val) {
      console.log(this.rules)
      console.log(val)
      //
      // this.$emit("update:content", val);
    }
  }
};
</script>

<style scoped></style>
