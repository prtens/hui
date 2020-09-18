import { UIComponent } from './component'

/** Anchor Component */
export declare class HnAnchor extends UIComponent {
  /** 固定模式 */
  affix?: boolean

  /** 距离窗口顶部达到指定偏移量后触发 */
  offsetTop?: number

  /** 距离窗口底部达到指定偏移量后触发 */
  offsetBottom?: number

  /** 锚点区域边界，单位：px */
  bounds?: number

  /** 点击滚动的额外距离 */
  scrollOffset?: number

  /** 指定滚动的容器 */
  container?: string | HTMLElement

  /** 是否显示小圆点  */
  showInk?: boolean

  /** 点击锚点时触发，返回链接 */
  $emit(eventName: 'on-select', href: string): this

  /** 链接改变时触发，返回新链接和旧链接 */
  $emit(eventName: 'on-change', []): this
}

/** Anchor Link Component */
export declare class HnAnchorLink extends UIComponent {
  /** 锚点链接 */
  href?: string

  /** 文字内容  */
  title?: string

  /** 点击滚动的额外距离  */
  scrollOffset?: number
}
