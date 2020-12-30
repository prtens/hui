<style>
</style>
<template>
  <div>
    <p>实心打标</p>
    <h-effects-icon content="默认灰色" />
    <h-effects-icon
      type="error"
      content="红色错误"
    />
    <h-effects-icon
      type="warn"
      content="黄色警告"
    />
    <h-effects-icon
      type="pass"
      content="绿色通过"
    />
    <h-effects-icon
      type="highlight"
      content="品牌色强调"
    />

    <p>带提示的打标</p>
    <h-effects-icon
      type="highlight"
      content="hover提示"
      tip="提示信息"
    />

    <h-effects-icon
      mode="hollow"
      type="highlight"
      content="hover提示"
      tip="提示信息"
    />

    <p>空心打标</p>
    <h-effects-icon
      mode="hollow"
      content="默认灰色"
    />
    <h-effects-icon
      mode="hollow"
      type="error"
      content="红色错误"
    />
    <h-effects-icon
      mode="hollow"
      type="warn"
      content="黄色警告"
    />
    <h-effects-icon
      mode="hollow"
      type="pass"
      content="绿色通过"
    />
    <h-effects-icon
      mode="hollow"
      type="highlight"
      content="品牌色强调"
    />

    <p>自定义颜色</p>
    <h-effects-icon
      color="#51a300"
      content="测试"
    />

    <h-effects-icon
      mode="hollow"
      color="#51a300"
      content="测试"
    />

    <h-effects-icon
      class="mr10"
      color="#303a58"
      color-text="#ffb400"
      content="测试"
    />

    <h-effects-icon
      class="mr10"
      mode="hollow"
      color="#999999"
      color-text="#ffb400"
      content="测试"
    />
  </div>

</template>
<script>
export default {
  data() {
    return {
      selected: "9"
    };
  },
  methods: {
  }
};
</script>
