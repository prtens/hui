<template>
  <div id="app">
    <nav>
      <p>基础组件</p>
      <ul>
        <li>
          <router-link to="/affix">Affix 图钉</router-link>
        </li>
        <li>
          <router-link to="/Select">Select 选择器全选</router-link>
        </li>
        <li>
          <router-link to="/tip">Tip 小贴士</router-link>
        </li>
        <li>
          <router-link to="/drawer">drawer</router-link>
        </li>
        <li>
          <router-link to="/dialog">dialog</router-link>
        </li>
        <li>
          <router-link to="/anchor">Anchor 锚点</router-link>
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
          <router-link to="/pagination">Pagination 分页</router-link>
        </li>
        <li>
          <router-link to="/screenfull">Screenfull 全屏</router-link>
        </li>
        <li>
          <router-link to="/svgicon">SvgIcon 图片</router-link>
        </li>
        <li>
          <router-link to="/table-tree">TableTree 表格树</router-link>
        </li>
        <li>
          <router-link to="/time">Time 相对时间</router-link>
        </li>
        <li>
          <router-link to="/Error">Error 错误提示页面</router-link>
        </li>
        <li>
          <router-link to="/clipboard">clipboard</router-link>
        </li>
        <li>
          <router-link to="/mixin">Mixin 小组件</router-link>
        </li>
        <li>
          <router-link to="/excel-export">Excel 导出</router-link>
        </li>
      </ul>
      <p>数据交互</p>
      <ul>
        <li>
          <router-link to="/indics">Indics 指标默认配置及选择排序</router-link>
        </li>
        <li>
          <router-link to="/status">status icon状态切换与显示</router-link>
        </li>
        <li>
          <router-link to="/editor">editor 可编辑内容</router-link>
        </li>
        <li>
          <router-link to="/input-tag">input-tag 添加标签</router-link>
        </li>
      </ul>
      <p>业务组件</p>
      <ul>
        <li>
          <router-link to="/area">area 选择地域</router-link>
        </li>
        <li>
          <router-link to="/duration">duration 时段折扣</router-link>
        </li>
        <li>
          <router-link to="/hour">hour 时段选择</router-link>
        </li>
      </ul>
      <p>样式</p>
      <ul>
        <li>
          <router-link to="/degree">Degree 刻度型进度比例</router-link>
        </li>
        <li>
          <router-link to="/effectsicon">effects icon 打标</router-link>
        </li>
      </ul>
      <p>其它组件</p>
      <ul>
        <li>
          <router-link to="/backtop">Backtop 返回顶部</router-link>
        </li>
      </ul>
    </nav>
    <keep-alive>
      <router-view />
    </keep-alive>
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
  margin-bottom: 50px;

  ul {
    display: flex;
    flex-wrap: wrap;
  }

  li {
    display: inline-block;

    a {
      color: #333;
      text-decoration: none;
      transition: all 0.2s;

      &:hover {
        color: #4d7fff;
      }

      &:hover,
      &:focus,
      &:active,
      &:visited {
        outline: 0;
        text-decoration: none;
      }
    }
  }

  li + li {
    border-left: solid 1px #bbb;
    padding-left: 10px;
    margin-left: 10px;
  }
}
</style>
