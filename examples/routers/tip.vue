<style></style>
<template>
  <div>
    <h-tip>
      <slot>Input 为受控组件，它<strong>总会显示 Vue 绑定值</strong>。不支持
        <code>v-model</code> 修饰符。
      </slot>
    </h-tip>
    <h-tip type="danger">
      <slot>Input 为受控组件，它<strong>总会显示 Vue 绑定值</strong>。不支持
        <code>v-model</code> 修饰符。
      </slot>
    </h-tip>
  </div>
</template>
<script>
export default {
  data() {
    return {
      arr: []
    };
  },
  created() { }
};
</script>
