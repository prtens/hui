<template>
  <div id="app">
    <nav>
      <p>基础组件</p>
      <ul>
        <li>
          <router-link to="/HelloWorld">HelloWorld</router-link>
        </li>
        <li>
          <router-link to="/affix">Affix</router-link>
        </li>
        <li>
          <router-link to="/anchor">Anchor</router-link>
        </li>
        <li>
          <router-link to="/backtop">Backtop</router-link>
        </li>
        <li>
          <router-link to="/breadcrumb">Breadcrumb</router-link>
        </li>
        <li>
          <router-link to="/chartsentrance">ChartsEntrance</router-link>
        </li>
        <li>
          <router-link to="/hamburger">Hamburger</router-link>
        </li>
        <li>
          <router-link to="/list">List</router-link>
        </li>
        <li>
          <router-link to="/multipleselection">MultipleSelection</router-link>
        </li>
        <li>
          <router-link to="/pagination">Pagination</router-link>
        </li>
        <li>
          <router-link to="/screenfull">Screenfull</router-link>
        </li>
        <li>
          <router-link to="/svgicon">SvgIcon</router-link>
        </li>
        <li>
          <router-link to="/tabletreecolumn">TableTreeColumn</router-link>
        </li>
        <li>
          <router-link to="/tip">Tip</router-link>
        </li>
      </ul>
      <p>业务组件</p>
      <ul>
        <li>
          <router-link to="/areaselection">选择地域</router-link>
        </li>
        <li>
          <router-link to="/timestepdiscount">时段折扣</router-link>
        </li>
        <li>
          <router-link to="/timestepselection">时段选择</router-link>
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
  width: 1200px;
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
