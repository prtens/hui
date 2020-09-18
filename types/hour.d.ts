import {UIComponent} from './component'

/** Hour Component */
export declare class HnHour extends UIComponent {
  simple?: Boolean

  /* 分组信息：
  1. 简单配置方式
  假设分组为周一至周四，周五至周日，则groups=[1234, 567]；
  假设分组为周一，周二至周四，周五，周六至周日，则groups=[1, 234, 5, 67]；
  以此类推

  2. 完全自定义
  groups = [{
    text: '工作日',
    value: 12345
  }, {
    text: '双休日',
    value: 67
  }] */
  groups?: Array<any>

  /* 当前选中值，week表示周几（1周一，7周日，以此类推），
  times表示当前选中小时，0 ~ 23
  selected = [{
    week: 1, //周一
    times: [2,3,4]
  },
    {
      week: 2, //周二
      times: [2,3,4]
    },
    ...
      {
        week: 7, //周日
        times: [1,2,4]
      }]

  备注：也支持合并配置，假设周一至周六都选中[2,3,4]，周日选中[1,2,4]，则可配置为
  selected = [{
    week: 123456, //周一至周六
    times: [2,3,4]
  },
    {
      week: 7, //周日
      times: [1,2,4]
    }] */
  selected?: Array<any>

  /**
   *  右下角提示文案信息
   */
  tip?: String
}
