import Vue from 'vue'
import {UIComponent} from './component'

import {HnAffix} from './affix'
import {HnAnchor} from './anchor'
import {HnAreaSelection} from './area-selection'
import {HnBackTop} from './back-top'
import {HnBreadcrumb} from './breadcrumb'
import {HnChartsEntrance} from './charts-entrance'
import {HnDefError} from './def-error'
import {HnDuration} from './duration'
import {HnEffectsEmpty} from './effects-empty'
import {HnHamburger} from './hamburger'
import {HnHour} from './hour'
import {HnIndics} from './indics'
import {HnList} from './list'
import {HnMultipleSelection} from './multiple-selection'
import {HnPagination} from './pagination'
import {HnScreenfull} from './screenfull'
import {HnSvgIcon} from './svg-icon'
import {HnTableColumnTree} from './table-column-tree'
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

/** Area Selection Component */
export class AreaSelection extends HnAreaSelection {
}

/** Back Top Component */
export class BackTop extends HnBackTop {
}

/** Breadcrumb Component */
export class Breadcrumb extends HnBreadcrumb {
}

/** Charts Entrance Component */
export class ChartsEntrance extends HnChartsEntrance {
}

/** Def Error Component */
export class DefError extends HnDefError {
}

/** Duration Component */
export class Duration extends HnDuration {
}

/** Effects Empty Component */
export class EffectsEmpty extends HnEffectsEmpty {
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

/** Multiple Selection Component */
export class MultipleSelection extends HnMultipleSelection {
}

/** Pagination Component */
export class Pagination extends HnPagination {
}

/** Screenfull Component */
export class Screenfull extends HnScreenfull {
}

/** Svg Icon Component */
export class SvgIcon extends HnSvgIcon {
}

/** Table Column Tree Component */
export class TableColumnTree extends HnTableColumnTree {
}

/** Time Component */
export class Time extends HnTime {
}

/** Tip Component */
export class Tip extends HnTip {
}