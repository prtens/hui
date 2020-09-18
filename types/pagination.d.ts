import {UIComponent} from './component'

/** Pagination Component */
export declare class HnPagination extends UIComponent {
  /***/
  total?: Number

  /***/
  page?: Number

  /***/
  limit?: Number

  /***/
  pageSizes?: Array<number>

  /***/
  layout?: String

  /***/
  background?: Boolean

  /***/
  autoScroll?: Boolean

  /***/
  $emit(eventName: 'pagination', pagination: Object): this;
}
