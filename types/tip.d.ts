import { UIComponent } from './component'

/** Tip Component */
export declare class HnTip extends UIComponent {
  /**
   * 类型，可选值为 primary、danger、warning、success
   */
  type?: "primary" | "danger" | "warning" | "success";

  description?: String
}
