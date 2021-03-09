import { UIComponent } from './component'

/** hamburger Component */
export declare class HnHamburger extends UIComponent {

  isActive?: Boolean

  $emit(eventName: 'change', value: Boolean): this
}
