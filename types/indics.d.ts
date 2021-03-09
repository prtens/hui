import { UIComponent } from './component'

/** Indics Component */
export declare class HnIndics extends UIComponent {
  /**
   * 指标数组
   */
  fields?: Array<any>

  /**
   * 分组数组
   */
  parents?: Array<any>

  /**
   * 渲染text时读取的key
   */
  textKey?: String

  /**
   * 渲染value时读取的key
   */
  valueKey?: String

  /**
   * 表示父节点value的字段
   */
  parentKey?: String

  /**
   * 当前是否为自定义指标，false（默认指标），true（自定义指标）
   * 可能存在customs=defaults的情况，因此需要明确指定当前是自定义还是默认
   */
  custom?: Boolean

  /**
   * 自定义指标value值的数组，例如["cost"]
   * 为[]的时候，默认=defaults，确保每次切换都有选中的指标
   */
  customs?: Array<any>

  /**
   * 默认指标value值的数组，必填
   */
  defaults: Array<any>

  /**
   * 指标选中上限，不传不限制选择个数
   */
  max?: Number

  /**
   * 指标选中下限
   */
  min?: Number

  /**
   * 是否需要排序
   */
  sortable?: Boolean

  /**
   * 浮层内标题旁提示文案
   */
  tip?: String

  $emit(eventName: 'change', selectedValue: Array<any>): this
}
