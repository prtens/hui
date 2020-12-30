<style>
</style>
<template>
  <div>
    <p>hover元素显示编辑按钮</p>
    <h-editor :content.sync="content" />

    <p>校验</p>
    <h-editor
      :content.sync="ruleContent"
      :rules="rules"
    />
  </div>

</template>
<script>
export default {
  data() {
    return {
      content: "2000",
      ruleContent: "10",
      rules: {
        required: true,
        min: [200, '不小于200']
      }
    };
  },
  methods: {
  }
};
</script>
