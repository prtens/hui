import { UIComponent } from './component'

/** Affix Component */
export declare class HnAffix extends UIComponent {
  /** 距离窗口顶部达到指定偏移量后触发 */
  offsetTop: Number

  /** 距离窗口底部达到指定偏移量后触发 */
  offsetBottom: Number

  /** addEventListener 原生的 useCapture 选项 */
  useCapture: Boolean

  /** 在固定状态发生改变时触发 */
  $emit(eventName: 'on-change', value: boolean): this
}
