import {UIComponent} from './component'

/** Calendars Component */
export declare class HnCalendars extends UIComponent {
  /**
   * 最小可选的日期
   */
  min?: String

  /**
   * 最大可选的日期
   */
  max?: String

  /**
   * 默认选中的日期
   */
  selected?: String

  /**
   * 默认选中的日期
   */
  value?: String

  /**
   * 年月日选择类型
   */
  dateType?: "year" | "month" | "day"

  /**
   * 时分秒选择类型
   */
  timeType?: "hour" | "minute" | "second"

  /**
   * date格式
   */
  formatter?: String

  /**
   * 限制周几不可选，[0, 1, 2, 3, 4, 5, 6]的子集
   */
  disabledWeeks?: Array<any>

  /**
   * 从周几开，0-6，0表示周日
   */
  weekStart?: Number
}

/** Calendars Datepicker Component */
export declare class HnCalendarsDatepicker extends UIComponent {
  // ID
  viewId?: String

  // 最小可选的日期
  min?: String

  // 最大可选的日期
  max?: String

  // 默认选中的日期
  selected?: String

  // 年月日选择类型 year,month,day
  dateType?: "year" | "month" | "day"

  // 时分秒选择类型 hour,minute,second
  timeType?: "hour" | "minute" | "second"

  // date格式
  formatter?: String

  // 日历选择面板与目标的对齐方式，可选left和right
  align?: String

  // 提示文案前缀，展示为prefix：date time
  prefix?: String

  // 限制周几不可选，[0, 1, 2, 3, 4, 5, 6]的子集
  disabledWeeks?: Array<any>

  // 从周几开，0-6，0表示周日
  weekStart?: Number

  // 空状态文案
  placeholder?: String

  // 是否禁用
  disabled?: Boolean
}

/** Calendars Range Component */
export declare class HnCalendarsRange extends UIComponent {
  // 默认选中开始日期
  start?: String

  // 默认选中结束日期，不限的情况下end=不限即可
  end?: String

  // 是否禁止选择开始日期
  // 开始日期禁止使用的时候，只允许使用动态计算的快捷日期
  // 动态计算的都是依据开始日期计算的
  startDisabled?: Boolean

  // 是否禁止选中结束日期
  // 结束日期禁止使用的时候，禁止快捷操作，开始日期最大可选为结束日期
  endDisabled?: Boolean

  // 是否可对比
  vsenable?: Boolean

  // 对比初始值
  vs?: Boolean

  // vsenable=true时可生效，关闭对比的时候选择单天还是连续的时间段
  single?: Boolean

  // 是否有快捷方式
  shortcuts?: Boolean

  /**
   *
   */
  shortkeys?: Array<any>

  // 最小可选的日期
  min?: String

  // 最大可选的日期
  max?: String

  // 可选择的最大天数间隔
  maxGap?: Number

  // 可选择的最小天数间隔
  minGap?: Number

  // 年月日选择类型：
  // 可选择"year,month,day"中的一个或者多个
  // 此外"all" = "year,month,day" = ""，不设置的时候默认年月日都显示
  dateType?: String

  // 时分秒选择类型：
  // 1.设置该值后会出现时间选择组件
  // 可选择"hour,minute,second"中的一个或者多个
  // 此外提供快捷的配置"all" = "hour,minute,second"
  // 2.不设置无时分秒选择
  timeType?: String

  // date格式
  formatter?: String

  // 日历选择面板与目标的对齐方式，可选left和right
  align?: String

  // 选中结果文案对齐方式，可选left，right和center，默认居中对齐
  textAlign?: String

  // 限制周几不可选，[0, 1, 2, 3, 4, 5, 6]的子集
  disabledWeeks?: Array<any>

  // 从周几开，0-6，0表示周日
  weekStart?: Number

  // 是否禁用
  disabled?: Boolean
}

/** Calendars Rangepicker Component */
export declare class HnCalendarsRangepicker extends UIComponent {
  // ID
  viewId?: String

  // 默认选中开始日期
  start?: String

  // 默认选中结束日期，不限的情况下end=不限即可
  end?: String

  // 动态计算的都是依据开始日期计算的
  startDisabled?: Boolean

  // 结束日期禁止使用的时候，禁止快捷操作，开始日期最大可选为结束日期
  endDisabled?: Boolean

  // 是否可对比
  vsenable?: Boolean

  // 对比初始值
  vs?: Boolean

  // vsenable=true时可生效，关闭对比的时候选择单天还是连续的时间段
  single?: Boolean

  // 是否有快捷方式
  shortcuts?: Boolean

  //
  shortkeys?: Array<any>

  // 最小可选的日期
  min?: String

  // 最大可选的日期
  max?: String

  // 可选择的最大天数间隔
  maxGap?: Number

  // 可选择的最小天数间隔
  minGap?: Number

  // 此外"all" = "year,month,day" = ""，不设置的时候默认年月日都显示
  dateType?: String

  // 2.不设置无时分秒选择
  timeType?: String

  // date格式
  formatter?: String

  // 日历选择面板与目标的对齐方式，可选left和right
  align?: String

  // 选中结果文案对齐方式，可选left，right和center，默认居中对齐
  textAlign?: String

  // 限制周几不可选，[0, 1, 2, 3, 4, 5, 6]的子集
  disabledWeeks?: Array<any>

  // 从周几开，0-6，0表示周日
  weekStart?: Number

  // 是否禁用
  disabled?: Boolean
}
