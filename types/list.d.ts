import {UIComponent} from './component'

/** List Component */
export declare class HnList extends UIComponent {
  /***
   *
   */
  border?: Boolean

  /***
   *
   */
  itemLayout?: "horizontal" | "vertical"

  /***
   *
   */
  header?: String

  /***
   *
   */
  footer?: String

  /***
   *
   */
  size?: "small" | "large" | "default"

  /***
   *
   */
  split?: Boolean
}

/** List Item Component */
export declare class HnListItem extends UIComponent {
}

/** List Item Meta Component */
export declare class HnListItemMeta extends UIComponent {
  /***
   *
   */
  avatar?: String

  /***
   *
   */
  title?: String

  /***
   *
   */
  description?: String
}
