import {UIComponent} from './component'

/** Degree Component */
export declare class HnDegree extends UIComponent {
  /**
   * 当前进度，0 ~ 100之间的数字，传入几位小数展示几位小数，最多保留两位小数
   */
  num: Number

  /**
   * 展示类型
   */
  type?: "primary" | "danger" | "warning" | "success"

  /**
   * 基础透明度，<1 的数值，
   * 表示第一个格子的透明度，后续计算为 opacity = base + i * (1 - base) / 9
   */
  opacity?: Number
}

