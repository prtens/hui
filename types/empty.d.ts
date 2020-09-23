import {UIComponent} from './component'

/** Empty Component */
export declare class HnEmpty extends UIComponent {
  /**
   *  背景样式，默认灰色，需要白底空状态时配置bg="white"
   */
  bg?: String

  /**
   * 空状态提示文案
   */
  content?: String
}