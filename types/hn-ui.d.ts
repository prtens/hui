import Vue from 'vue'
import {UIComponent} from './component'

import {HnAffix} from './affix'
import {HnAnchor, HnAnchorLink} from './anchor'
import {HnArea} from './area'
import {HnBackTop} from './back-top'
import {HnBreadcrumb} from './breadcrumb'
import {HnCalendars, HnCalendarsDatepicker, HnCalendarsRange, HnCalendarsRangepicker} from './calendars'
import {HnChartsEntrance} from './charts-entrance'
import {HnDegree} from './degree'
import {HnDuration} from './duration'
import {HnEmpty} from './empty'
import {HnError} from './error'
import {HnHamburger} from './hamburger'
import {HnHour} from './hour'
import {HnIndics} from './indics'
import {HnList, HnListItem, HnListItemMeta} from './list'
import {HnPagination} from './pagination'
import {HnScreenfull} from './screenfull'
import {HnSelect} from './select'
import {HnSkeleton} from './skeleton'
import {HnSvgIcon} from './svg-icon'
import {HnTableTree} from './table-tree'
import {HnTime} from './time'
import {HnTip} from './tip'

export interface InstallationOptions {
  locale: any,
  i18n: any,
  size: string
}

/** version */
export const version: string

/** Call `Vue.use(HnUI)` to install. */
export function install(vue: typeof Vue, options: InstallationOptions): void

/** ElementUI component common definition */
export type Component = UIComponent

/** Alert Component */
export class Affix extends HnAffix {
}

/** Alert Component */
export class Anchor extends HnAnchor {
}

/** Anchor Link Component */
export class AnchorLink extends HnAnchorLink {
}

/** Area Component */
export class Area extends HnArea {
}

/** Back Top Component */
export class BackTop extends HnBackTop {
}

/** Breadcrumb Component */
export class Breadcrumb extends HnBreadcrumb {
}

/** Calendars Component */
export class Calendars extends HnCalendars {
}

/** Calendars Datepicker Component */
export class CalendarsDatepicker extends HnCalendarsDatepicker {
}

/** Calendars Range Component */
export class CalendarsRange extends HnCalendarsRange {
}

/** Calendars Rangepicker Component */
export class CalendarsRangepicker extends HnCalendarsRangepicker {
}

/** Charts Entrance Component */
export class ChartsEntrance extends HnChartsEntrance {
}

/** Degree Component */
export class Degree extends HnDegree {
}

/** Duration Component */
export class Duration extends HnDuration {
}

/** Empty Component */
export class Empty extends HnEmpty {
}

/** Error Component */
export class Error extends HnError {
}

/** Hamburger Component */
export class Hamburger extends HnHamburger {
}

/** Hour Component */
export class Hour extends HnHour {
}

/** Indics Component */
export class Indics extends HnIndics {
}

/** List Component */
export class List extends HnList {
}

/** List Item Component */
export class ListItem extends HnListItem {
}

/** List Item Meta Component */
export class ListItemMeta extends HnListItemMeta {
}

/** Pagination Component */
export class Pagination extends HnPagination {
}

/** Screenfull Component */
export class Screenfull extends HnScreenfull {
}

/** Select Component */
export class HSelect extends HnSelect {
}

/** Skeleton Component */
export class Skeleton extends HnSkeleton {
}

/** Svg Icon Component */
export class SvgIcon extends HnSvgIcon {
}

/** Table Tree Component */
export class TableTree extends HnTableTree {
}

/** Time Component */
export class Time extends HnTime {
}

/** Tip Component */
export class Tip extends HnTip {
}
