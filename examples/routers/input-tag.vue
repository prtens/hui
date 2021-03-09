<style>
</style>
<template>
  <div style="width: 50%">
    <p>taginput 标签选择</p>
    <h-input-tag
      :limit="limit"
      v-model="tags"
      :placeholder="placeholder"
      :read-only="readOnly"
      :validate="validate"
      :add-tag-on-blur="addTagOnBlur"
      @input="changeInput"
    />
  </div>

</template>
<script>
export default {
  data() {
    return {
      readOnly: false,
      addTagOnBlur: true,
      placeholder: "添加",
      tags: ["测试", "测试", "测试", "测试", "测试", "测试", "测试", "测试", "测试", "测试"],
      limit: 10,
      validate: ""
    };
  },
  methods: {
    changeInput(tags) {
      console.log('========', tags);
    }
  }
};
</script>
