import { UIComponent } from './component'

/** Duration Component */
export declare class HnDuration extends UIComponent {

  viewId?: String

  // 单格宽度
  boxWidth?: Number

  // 当前选中值
  selected?: String

  // 是否以半小时为选择间隔
  half?: Boolean
}
