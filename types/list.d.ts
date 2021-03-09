import { UIComponent } from './component'

/** List Component */
export declare class HnList extends UIComponent {
  /***
   * 是否显示边框
   */
  border?: Boolean

  /***
   * 设置 ListItem 布局, 可选值为 horizontal（横排）或 vertical（竖直）
   */
  itemLayout?: "horizontal" | "vertical"

  /***
   * 列表头部
   */
  header?: String

  /***
   * 列表底部
   */
  footer?: String

  /***
   * 列表尺寸，可选值为 small、large、default
   */
  size?: "small" | "large" | "default"

  /***
   * 是否展示分割线
   */
  split?: Boolean
}

/** List Item Component */
export declare class HnListItem extends UIComponent {
}

/** List Item Meta Component */
export declare class HnListItemMeta extends UIComponent {
  /***
   * 列表元素的图标
   */
  avatar?: String

  /***
   * 列表元素的标题
   */
  title?: String

  /***
   * 列表元素的描述内容
   */
  description?: String
}
