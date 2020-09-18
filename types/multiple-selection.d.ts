import {UIComponent} from './component'

/** Multiple Selection Component */
export declare class HnMultipleSelection extends UIComponent {
  /***/
  options?: Array<any>

  /***/
  selects?: Array<any>

  /***/
  filterable?: Boolean

  /***/
  props?: Object

  /***/
  $emit(eventName: 'on-change', value: Array<any>): this
}
