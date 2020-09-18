import {UIComponent} from './component'

/** Time Tree Component */
export declare class HnTime extends UIComponent {
  /** 需要对比的时间，可以是时间戳或 Date 类型 */
  time?: number |Date |string;

  /** 类型，可选值为 relative、date 或 datetime */
  type?: 'relative'|'date'|'datetime';

  /** 自动更新的间隔，单位：秒 60 */
  interval?: number;

  /** 填写该值，点击会定位锚点 */
  hash?: string;
}
