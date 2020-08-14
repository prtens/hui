import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import hui from "../src/index";

import "../src/icons/index";

import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import zhLang from "element-ui/lib/locale/lang/zh-CN";
import locale from '../src/locale/lang/zh-CN';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(hui);
Vue.use(Element, {
  size: "small",
  locale: [zhLang, ...locale]
});

const router = new VueRouter({
  esModule: false,
  mode: "history",
  routes: [
    {
      path: "/affix",
      component: resolve => require(["./routers/affix.vue"], resolve)
    },
    {
      path: "/anchor",
      component: resolve => require(["./routers/anchor.vue"], resolve)
    },
    {
      path: "/backtop",
      component: resolve => require(["./routers/back-top.vue"], resolve)
    },
    {
      path: "/breadcrumb",
      component: resolve => require(["./routers/breadcrumb.vue"], resolve)
    },
    {
      path: "/chartsentrance",
      component: resolve => require(["./routers/charts-entrance.vue"], resolve)
    },
    {
      path: "/hamburger",
      component: resolve => require(["./routers/hamburger.vue"], resolve)
    },
    {
      path: "/list",
      component: resolve => require(["./routers/list.vue"], resolve)
    },
    {
      path: "/multipleselection",
      component: resolve =>
        require(["./routers/multiple-selection.vue"], resolve)
    },
    {
      path: "/pagination",
      component: resolve => require(["./routers/pagination.vue"], resolve)
    },
    {
      path: "/screenfull",
      component: resolve => require(["./routers/screenfull.vue"], resolve)
    },
    {
      path: "/svgicon",
      component: resolve => require(["./routers/svg-icon.vue"], resolve)
    },
    {
      path: "/tabletreecolumn",
      component: resolve =>
        require(["./routers/table-tree-column.vue"], resolve)
    },
    {
      path: "/tip",
      component: resolve => require(["./routers/tip.vue"], resolve)
    },
    {
      path: "/time",
      component: resolve => require(["./routers/time.vue"], resolve)
    },
    {
      path: "/deferror",
      component: resolve => require(["./routers/def-error.vue"], resolve)
    },
    {
      path: "/effectsempty",
      component: resolve => require(["./routers/effects-empty.vue"], resolve)
    },
    {
      path: "/calendar",
      component: resolve => require(["./routers/calendar.vue"], resolve)
    },
    {
      path: "/timestepselection",
      component: resolve =>
        require(["./routers/time-step-selection.vue"], resolve)
    },
    {
      path: "/areaselection",
      component: resolve => require(["./routers/area-selection.vue"], resolve)
    },
    {
      path: "/timestepdiscount",
      component: resolve =>
        require(["./routers/time-step-discount.vue"], resolve)
    }
  ]
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
