## Area 选择地域

可以选择城市。

### 基础用法

基础用法。

:::demo

```html
<h-area
  :selected.sync="selected"
  @on-change="change"
/>
<script>
export default {
  data() {
    return {
      selected: [1]
    };
  },
  methods: {
    change(selected, values) {
      console.log(selected)
      console.log(values)
    }
  }
}
</script>
```
:::

### 不允许选择城市

不允许选择城市。

:::demo 设置`city`为false，就不能选择了

```html
<h-area
  :selected.sync="selected"
  :city="city"
  @on-change="change"
/>
<script>
export default {
  data() {
    return {
      selected: [1],
      city: false
    };
  },
  methods: {
    change(selected, values) {
      console.log(selected)
      console.log(values)
    }
  }
}
</script>
```
:::

### Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|------------- |---------------- |---------------- |---------------------- |-------- |
| selected | 当前选中值 | array  | - | [] |
| city | 是否可选城市 | boolean  | - | false |
| data | 自定义数据 | array  | - | [] |
| lineNumber | 单行显示个数 | number  | - | 6 |
