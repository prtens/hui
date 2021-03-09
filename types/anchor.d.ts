import { UIComponent } from './component'

/** Anchor Component */
export declare class HnAnchor extends UIComponent {
  /** 固定模式 */
  affix?: Boolean

  /** 距离窗口顶部达到指定偏移量后触发 */
  offsetTop?: Number

  /** 距离窗口底部达到指定偏移量后触发 */
  offsetBottom?: Number

  /** 锚点区域边界，单位：px */
  bounds?: Number

  /** 点击滚动的额外距离 */
  scrollOffset?: Number

  /** 指定滚动的容器 */
  container?: String | HTMLElement

  /** 是否显示小圆点  */
  showInk?: Boolean

  /** 点击锚点时触发，返回链接 */
  $emit(eventName: 'select', href: String): this

  /** 链接改变时触发，返回新链接和旧链接 */
  $emit(eventName: 'change', []): this
}

/** Anchor Link Component */
export declare class HnAnchorLink extends UIComponent {
  /** 锚点链接 */
  href?: String

  /** 文字内容  */
  title?: String

  /** 点击滚动的额外距离  */
  scrollOffset?: Number
}
