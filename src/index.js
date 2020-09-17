import Affix from "./components/affix";
import Anchor from "./components/anchor";
import AnchorLink from "./components/anchor-link";
import AreaSelection from "./components/area-selection";
import BackTop from "./components/back-top";
import Breadcrumb from "./components/breadcrumb";
import ChartsEntrance from "./components/charts-entrance";
import Calendars from "./components/calendars";
import DefError from "./components/def-error";
import EffectsEmpty from "./components/effects-empty";
import Hamburger from "./components/hamburger";
import List from "./components/list";
import Indics from "./components/indics";
import MultipleSelection from "./components/multiple-selection";
import Pagination from "./components/pagination";
import Screenfull from "./components/screenfull";
import SvgIcon from "./components/svg-icon";
import TableColumnTree from "./components/table-column-tree";
import Time from "./components/time";
import Duration from "./components/duration";
import Hour from "./components/hour";
import Tip from "./components/tip";
import locale from "./locale/index";

const ListItem = List.Item;
const ListItemMeta = List.Item.Meta;

const CalendarsDatepicker = Calendars.Datepicker;
const CalendarsRange = Calendars.Range;
const CalendarsRangepicker = Calendars.Rangepicker;

const components = [
  Affix,
  Anchor,
  AnchorLink,
  AreaSelection,
  BackTop,
  Breadcrumb,
  ChartsEntrance,
  Calendars,
  CalendarsDatepicker,
  CalendarsRange,
  CalendarsRangepicker,
  DefError,
  EffectsEmpty,
  Hamburger,
  List,
  ListItem,
  ListItemMeta,
  Indics,
  MultipleSelection,
  Pagination,
  Screenfull,
  SvgIcon,
  TableColumnTree,
  Time,
  Duration,
  Hour,
  Tip
];

const install = function (Vue, opts = {}) {
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
  locale: locale.use,
  i18n: locale.i18n,
  install,
  ...components
};
