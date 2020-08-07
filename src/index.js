import Affix from "./components/affix";
import BackTop from "./components/back-top";
import Breadcrumb from "./components/breadcrumb";
import ChartsEntrance from "./components/charts-entrance";
import Hamburger from "./components/hamburger";
import List from "./components/list";
import MultipleSelection from "./components/multiple-selection";
import Pagination from "./components/pagination";
import Screenfull from "./components/screenfull";
import SvgIcon from "./components/svg-icon";
import TableTreeColumn from "./components/table-tree-column";
import Tip from "./components/tip";
import locale from "./locale/index";

const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;
const components = [
  Affix,
  BackTop,
  Breadcrumb,
  ChartsEntrance,
  Hamburger,
  List,
  ListItem,
  ListItemMeta,
  MultipleSelection,
  Pagination,
  Screenfull,
  SvgIcon,
  TableTreeColumn,
  Tip
];

const install = function(Vue, opts = {}) {
  locale.use(opts.locale);
  locale.i18n(opts.i18n);

  components.forEach(component => {
    Vue.component(component.name, component);
  });

  Vue.prototype.$HUI = {
    size: opts.size || ""
  };
};

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  version: "0.0.1",
  install,
  ...components
};
