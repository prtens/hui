import { UIComponent } from './component'

/** InputTag Component */
export declare class HnInputTag extends UIComponent {
  value?: Array<any>

  // 没有标签时显示的占位符
  placeholder?: number

  // 将输入设置为只读
  readOnly?: Boolean

  // 验证规则
  validate?: String | Function | Object

  // 添加时候键盘 keys
  addTagOnKeys?: Array<any>

  addTagOnBlur?: Boolean

  // 设置标签数量限制
  limit?: Number

  // 允许重复标签
  allowDuplicates?: Boolean

  beforeAdding?: Function

  $emit(eventName: 'input', innerTags: Array<any>): this
}
