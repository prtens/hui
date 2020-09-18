import {UIComponent} from './component'

/** Tip Component */
export declare class HnTip extends UIComponent {
  /**
   * 类型，可选值为 default、danger
   */
  type?: "default" | "danger";

  description?: String
}
