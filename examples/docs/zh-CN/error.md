## Error 异常页面

提示反馈

### 基础用法

基础的异常页面。

:::demo 使用`type`属性来定义异常页。
```html
<el-row>
  <h-error />
</el-row>

<el-row>
  <h-error :type="502" />
</el-row>

<el-row>
  <h-error def="自定义提示信息" />
</el-row>
<script>
  export default {
    data() {
      return {};
    },
    methods: {}
  }
</script>
```
:::

### Collapse Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 异常类型 | number | 404 / 500 / 502 | 404 |
| tip | 自定义提示信息 | string | — | false |
| btns | 是否需要返回首页 + 返回上一页按钮 | boolean | — | true |
