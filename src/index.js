import AddInputTag from './components/add-input-tags';
import Anchor from './components/anchor';
import AnchorLink from './components/anchor-link';
import Area from './components/area';
import Backtop from './components/backtop';
import Breadcrumb from './components/breadcrumb';
import ChartsEntrance from './components/charts-entrance';
import Degree from './components/degree';
import Duration from './components/duration';
import Editor from './components/editor';
import EffectsIcon from './components/effects-icon';
import Error from './components/error';
import Hamburger from './components/hamburger';
import Hour from './components/hour';
import Indics from './components/indics';
import List from './components/list';
import Pagination from './components/pagination';
import Screenfull from './components/screenfull';
import Select from './components/select';
import Status from './components/status';
import SvgIcon from './components/svg-icon';
import TableTree from './components/table-tree';
import Time from './components/time';
import Tip from './components/tip';
import locale from './locale/index';

const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;

const components = [
  AddInputTag,
  Anchor,
  AnchorLink,
  Area,
  Backtop,
  Breadcrumb,
  ChartsEntrance,
  Degree,
  Duration,
  Editor,
  EffectsIcon,
  Error,
  Hamburger,
  Hour,
  Indics,
  List,
  ListItem,
  ListItemMeta,
  Pagination,
  Screenfull,
  Select,
  Status,
  SvgIcon,
  TableTree,
  Time,
  Tip

];

const install = function (Vue, opts = {}) {
  locale.use(opts.locale);
  locale.i18n(opts.i18n);

  components.forEach(component => {
    Vue.component(component.name, component);
  });

  Vue.prototype.$HUI = {
    size: opts.size || ''
  };
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: process.env.VERSION,
  locale: locale.use,
  i18n: locale.i18n,
  install,
  ...components
};
