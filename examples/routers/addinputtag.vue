<style>
</style>
<template>
  <div style="width: 50%">
    <p>taginput 标签选择</p>
    <h-add-input-tag
      :limit="limit"
      v-model="tags"
      :placeholder="placeholder"
      :read-only="readOnly"
      :validate="validate"
      :add-tag-on-blur="addTagOnBlur"
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
  watch: {
    tags(val) {
      console.log(val)
    }
  },
  methods: {
  }
};
</script>
