import { UIComponent } from './component'

/** Area Selection Component */
export declare class HnAreaSelection extends UIComponent {
  /**
   * 当前选中值
   * 每个省份和城市都有各自的id
   * 若选择了省份，则其所有城市id都不传
   */
  selected?: Array<any>

  /**	是否可选城市 */
  city?: Boolean

  /**
   * 自定义数据，数据格式：
   */
  data?: Array<any>

  /**
   * 单行显示个数
   * default 6
   */
  lineNumber?: Number
}
