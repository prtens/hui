import {UIComponent} from './component'

/** Skeleton Component */
export declare class HnSkeleton extends UIComponent {
  boilerplate?: Boolean

  loading?: Boolean

  tile?: Boolean

  transition?: String

  type?: String

  types?: Object

  height: Number | String

  minHeight: Number | String

  minWidth: Number | String

  maxHeight: Number | String

  maxWidth: Number | String

  width: Number | String
}
