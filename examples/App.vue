<template>
  <div id="app">
    <nav>
      <p>基础组件</p>
      <ul>
        <li>
          <router-link to="/affix">Affix 图钉</router-link>
        </li>
        <li>
          <router-link to="/anchor">Anchor 锚点</router-link>
        </li>
        <li>
          <router-link to="/backtop">Backtop 返回顶部</router-link>
        </li>
        <li>
          <router-link to="/breadcrumb">Breadcrumb 面包屑</router-link>
        </li>
        <li>
          <router-link to="/chartsentrance">ChartsEntrance 图标</router-link>
        </li>
        <li>
          <router-link to="/hamburger">Hamburger 面包屑</router-link>
        </li>
        <li>
          <router-link to="/list">List 列表</router-link>
        </li>
        <li>
          <router-link to="/multipleselection">MultipleSelection 选择器全选</router-link>
        </li>
        <li>
          <router-link to="/pagination">Pagination 分页</router-link>
        </li>
        <li>
          <router-link to="/screenfull">Screenfull 全屏</router-link>
        </li>
        <li>
          <router-link to="/svgicon">SvgIcon 图片</router-link>
        </li>
        <li>
          <router-link to="/table-column-tree">TableColumnTree 表格树</router-link>
        </li>
        <li>
          <router-link to="/tip">Tip 小贴士</router-link>
        </li>
        <li>
          <router-link to="/time">Time 相对时间</router-link>
        </li>
        <li>
          <router-link to="/deferror">DefError 错误提示页面</router-link>
        </li>
        <li>
          <router-link to="/effectsempty">EffectsEmpty 空状态</router-link>
        </li>
        <li>
          <router-link to="/calendar">Calendar 日历（选择单日）</router-link>
        </li>
        <li>
          <router-link to="/drawer">drawer</router-link>
        </li>
      </ul>
      <p>业务组件</p>
      <ul>
        <li>
          <router-link to="/area-selection">area 选择地域</router-link>
        </li>
        <li>
          <router-link to="/discount">duration 时段折扣</router-link>
        </li>
        <li>
          <router-link to="/hour">hour 时段选择</router-link>
        </li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import "../src/styles/index.scss";

#app {
  width: 80%;
  margin: 0 auto;
}
nav {
  margin-bottom: 40px;

  ul {
    display: flex;
    flex-wrap: wrap;
  }
  li {
    display: inline-block;
  }
  li + li {
    border-left: solid 1px #bbb;
    padding-left: 10px;
    margin-left: 10px;
  }
}
.container {
  padding: 10px 40px 0;
}
.v-link-active {
  color: #bbb;
}
</style>
