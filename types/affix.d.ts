import { UIComponent } from './component'

/** Affix Component */
export declare class HnAffix extends UIComponent {
  /**
   * 距离窗口顶部达到指定偏移量后触发
   * @default 0
   */
  offsetTop?: Boolean

  /**
   * 距离窗口底部达到指定偏移量后触发
   */
  offsetBottom?: Number

  /**
   * 在固定状态发生改变时触发
   * @param value true | false
   */
  $emit(eventName: 'change', value: Boolean): this;
}
