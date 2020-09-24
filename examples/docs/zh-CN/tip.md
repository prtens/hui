
## Tip 小贴纸

用于提示

###  小贴纸

:::demo 组件下类型由`type`属性指定。
```html
<template>
  <div class="block">
    <span class="demonstration">默认</span>
    <h-tip>
      <slot>Input 为受控组件，它<strong>总会显示 Vue 绑定值</strong>。不支持
        <code>v-model</code> 修饰符。
      </slot>
    </h-tip>
  </div>
  <div class="block">
    <span class="demonstration">危险的</span>
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
      return {};
    }
  };
</script>
```
:::

### Tip Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type  | 类型 | string | default / danger | default |
| description | 提示语 | string | — | - |
