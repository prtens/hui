import Affix from './components/affix';
import Anchor from './components/anchor';
import AnchorLink from './components/anchor-link';
import Area from './components/area';
import BackTop from './components/back-top';
import Breadcrumb from './components/breadcrumb';
import Calendars from './components/calendars';
import ChartsEntrance from './components/charts-entrance';
import Duration from './components/duration';
import Empty from './components/empty';
import Error from './components/error';
import Hamburger from './components/hamburger';
import Hour from './components/hour';
import Indics from './components/indics';
import List from './components/list';
import Pagination from './components/pagination';
import Screenfull from './components/screenfull';
import Select from './components/select';
import Skeleton from './components/skeleton';
import SvgIcon from './components/svg-icon';
import TableTree from './components/table-tree';
import Time from './components/time';
import Tip from './components/tip';
import locale from './locale/index';

const CalendarsDatepicker = Calendars.Datepicker;
const CalendarsRange = Calendars.Range;
const CalendarsRangepicker = Calendars.Rangepicker;

const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;

const components = [
  Affix,
  Anchor,
  AnchorLink,
  Area,
  BackTop,
  Breadcrumb,
  Calendars,
  CalendarsDatepicker,
  CalendarsRange,
  CalendarsRangepicker,
  ChartsEntrance,
  Duration,
  Empty,
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
  Skeleton,
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
  version: '0.0.1',
  locale: locale.use,
  i18n: locale.i18n,
  install,
  ...components
};
