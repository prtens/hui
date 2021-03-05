import { UIComponent } from './component'

/** Multiple Selection Component */
export declare class HnSelect extends UIComponent {
  /***/
  options?: Array<any>

  /***/
  selects?: Array<any>

  /***/
  filterable?: Boolean

  /***/
  props?: Object

  /***/
  $emit(eventName: 'change', value: Array<any>): this
}
