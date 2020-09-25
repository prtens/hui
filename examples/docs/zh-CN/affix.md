## Affix 图钉

使用图钉，可以将内容固定在屏幕上，并且不随页面的滚动而滚动。常用于侧边菜单等。

### 基本用法

简单使用，当元素不可见时，直接固定在最顶端。

:::demo
```html
<template>
  <h-affix>
    <div class="demoaffix">固定在最顶部</div>
  </h-affix>
</template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<style>
.demoaffix{
  width: 100px;
  height: 30px;
  background: #f60;
  color: #fff;
  border-radius: 5px;
}
</style>
```
:::

### 偏移

当滚动到一定距离时再固定。

:::demo
```html
<template>
  <h-affix :offsetTop="offsetTop">
    <span class="demoaffix">固定在最顶部</span>
  </h-affix>
</template>

<script>
  export default {
    data () {
      return {
        offsetTop: 200
      }
    }
  }
</script>

<style>
.demoaffix{
  width: 100px;
  height: 30px;
  background: blue;
  color: #fff;
  border-radius: 5px;
}
</style>
```
:::

### Attributes

| 参数              | 说明                             | 类型            | 可选值 | 默认值 |
| ----------------- | -------------------------------- | --------------- | ------ | ------ |
| offsetTop | 距离窗口顶部达到指定偏移量后触发 | number | - | 0 |
| offsetBottom | 距离窗口底部达到指定偏移量后触发 | number | - | - |
| useCapture | addEventListener 原生的 useCapture 选项 | boolean | - | false |

### Events

| 事件名 | 说明               | 回调参数 |
| ------ | ------------------ | -------- |
| onChange  | 在固定状态发生改变时触发 | true / false |

