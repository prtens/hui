<template>
  <div
    class="hn-rangepicker"
    v-clickoutside:calendarsRangePicker="hideDiv"
  >
    <div
      :id="`trigger_${viewId}`"
      :class="`hn-trigger result result-left result-with-icon ${vs ? 'result-vs':''}`"
      @click.stop="toggle"
    >
      <i class="el-icon-date prefix-icon"></i>
      <template v-if="endStr">
        <span class="co co-left">{{ startStr }}</span>
        <span class="center">{{ centerTip }}</span>
        <span class="co co-right">{{ endStr }}</span>
      </template>
      <template v-else>
        {{ startStr }}
      </template>
    </div>
    <div
      :id="`rpcnt_${viewId}`"
      :class="`hn-output hn-output__bottom ${show ? 'hn-output--open' : ''}`"
      class="calendarsRangePicker"
      :style="{left: `${left}px`, top: `${top}px`}"
    >
      <calendars-range
        :start.sync="getStart"
        :end.sync="getEnd"
        :startDisabled="startDisabled"
        :endDisabled="endDisabled"
        :vsenable="vsenable"
        :vs.sync="getVs"
        :single="single"
        :shortcuts="shortcuts"
        :shortkeys="shortkeys"
        :min="min"
        :max="max"
        :maxGap="maxGap"
        :minGap="minGap"
        :dateType="dateType"
        :formatter="formatter"
        :align="align"
        :textAlign="textAlign"
        :disabledWeeks="disabledWeeks"
        :weekStart="weekStart"
        :disabled="disabled"
        @change="choose"
      />
    </div>
  </div>
</template>

<script>
import $ from "jquery"
import util from './util'
import Locale from '../../mixins/locale';
import CalendarsRange from './range'
import Clickoutside from 'element-ui/src/utils/clickoutside';

const {
  foreverStr: ForeverStr,
  dateFormat: DateFormat,
  dateParse: DateParse,
  getDefaultDate: GetDefaultDate,
  getQuickInfos: GetQuickInfos,
  getOffsetDate: GetOffsetDate,
  parseDateType: ParseDateType
} = util;

export default {
  name: 'CalendarsRangepicker',
  components: {
    CalendarsRange
  },
  directives: {
    Clickoutside
  },
  mixins: [Locale],
  props: {
    viewId: {
      type: String,
      default: 'calendars-rangepicker'
    },
    // 默认选中开始日期
    start: {
      type: String,
      default: ''
    },
    // 默认选中结束日期，不限的情况下end=不限即可
    end: {
      type: String,
      default: ''
    },
    // 是否禁止选择开始日期
    // 开始日期禁止使用的时候，只允许使用动态计算的快捷日期
    // 动态计算的都是依据开始日期计算的
    startDisabled: {
      type: Boolean,
      default: false
    },
    // 是否禁止选中结束日期
    // 结束日期禁止使用的时候，禁止快捷操作，开始日期最大可选为结束日期
    endDisabled: {
      type: Boolean,
      default: false
    },
    // 是否可对比
    vsenable: {
      type: Boolean,
      default: false
    },
    // 对比初始值
    vs: {
      type: Boolean,
      default: false
    },
    // vsenable=true时可生效，关闭对比的时候选择单天还是连续的时间段
    single: {
      type: Boolean,
      default: false
    },
    // 是否有快捷方式
    shortcuts: {
      type: Boolean,
      default: true
    },
    shortkeys: {
      type: Array,
      default() {
        return [
          // "today", // 今日
          // "yesterday", // 昨日
          // "beforeYesterday", // 前天
          // "preMonth", // 上月
          // "preWeekSun", // 上周（周日至周六）
          // "preWeekMon", // 上周（周一至周日）
          // "lastestWeekSun", // 本周（周日开始，包含今日）
          // "lastestWeekMon", // 本周（周一开始，包含今日）
          // "passedThisMonth", // 本月（昨日开始算）
          // "lastestThisMonth", // 本月（今日开始算）
          // "passed{n}", // 过去 n 天（昨日开始算），n可为任意整数，passed1，passed15...
          // "lastest{n}", // 最近 n 天（今日开始算），n可为任意整数，lastest1，lastest15...
          // "dynamicStart{n}", // n天后结束（以开始时间为准动态计算），n可为任意整数，dynamicStart1，dynamicStart15...
          // "dynamicEndThisMonth", // 开始时间到开始时间所在月月底
          // "dynamicEndNextMonth", // 开始时间到开始时间次月月底
          // "forever" //有开始时间，结束时间不限
        ];
      }
    },
    // 最小可选的日期
    min: {
      type: String,
      default: ''
    },
    // 最大可选的日期
    max: {
      type: String,
      default: ''
    },
    // 可选择的最大天数间隔
    maxGap: {
      type: Number
    },
    // 可选择的最小天数间隔
    minGap: {
      type: Number
    },
    // 年月日选择类型：
    // 可选择"year,month,day"中的一个或者多个
    // 此外"all" = "year,month,day" = ""，不设置的时候默认年月日都显示
    dateType: {
      type: String,
      default: ''
    },
    // 时分秒选择类型：
    // 1.设置该值后会出现时间选择组件
    // 可选择"hour,minute,second"中的一个或者多个
    // 此外提供快捷的配置"all" = "hour,minute,second"
    // 2.不设置无时分秒选择
    timeType: {
      type: String,
      default: ''
    },
    // date格式
    formatter: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    // 日历选择面板与目标的对齐方式，可选left和right
    align: {
      type: String,
      default: 'left'
    },
    // 选中结果文案对齐方式，可选left，right和center，默认居中对齐
    textAlign: {
      type: String,
      default: 'center'
    },
    // 限制周几不可选，[0, 1, 2, 3, 4, 5, 6]的子集
    disabledWeeks: {
      type: Array,
      default() {
        return []
      }
    },
    // 从周几开，0-6，0表示周日
    weekStart: {
      type: Number,
      default: 0
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      vsSingle: false,
      startStr: '',
      endStr: '',
      centerTip: '',
      quickDateText: '',
      quickDateKey: '',
      show: false,
      left: '',
      top: ''
    };
  },
  computed: {
    getStart: {
      get() {
        return this.start;
      },
      set(val) {
        this.$emit("update:start", val);
      }
    },
    getEnd: {
      get() {
        return this.end;
      },
      set(val) {
        this.$emit("update:end", val);
      }
    },
    getVs: {
      get() {
        return this.vs;
      },
      set(val) {
        this.$emit("update:vs", val);
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let that = this;

      // vsEnable 是否可对比，默认关闭
      // vs 对比初始状态
      // vsSingle 可对比情况下，关闭对比时是选择时间段还是单天
      let vsEnable = (/^true$/i).test(that.vsenable) || false,
        vs = false;
      if (vsEnable) {
        vs = (/^true$/i).test(that.getVs) || false;
      }
      let vsSingle = vsEnable ? ((/^true$/i).test(that.single) || false) : false;

      let timeType = that.timeType; // 可选时分秒
      let formatter = that.formatter || ('YYYY-MM-DD' + (timeType ? ' hh:mm:ss' : ''));
      let dateType = that.dateType; // 可选年月日
      let types = ParseDateType(dateType); // 解析年月日
      if (types.day) {
        // 可选择日期
      } else {
        if (types.month) {
          // 可选择月份 todo
          formatter = formatter.slice(0, 7);
        } else {
          // 只可选择年份 todo
          formatter = formatter.slice(0, 4);
        }
      }

      // 快捷选项
      let startDisabled = (/^true$/i).test(that.startDisabled) || false; // 开始时间是否可选
      let endDisabled = (/^true$/i).test(that.endDisabled) || false;// 结束时间是否可选
      let showShortcuts = !(/^false$/i).test(that.shortcuts); // 默认开启快捷选项的
      let quickDates = showShortcuts ? (that.shortkeys || ['today', 'yesterday', 'preWeekMon', 'lastestWeekMon', 'preMonth', 'lastestThisMonth']) : [];

      if (startDisabled) {
        // 开始时间禁止使用的时候，只允许使用动态计算的快捷日期
        // 动态计算的都是依据开始时间计算的
        showShortcuts = false;
        for (let i = 0; i < quickDates.length; i++) {
          if ((quickDates[i].indexOf('dynamic') < 0) && (quickDates[i].indexOf('forever') < 0)) {
            quickDates.splice(i--, 1);
          }
        }
      }
      if (endDisabled) {
        // 结束时间禁止选择的时候，不允许使用快捷方式
        showShortcuts = false;
        quickDates = [];
      }

      let { start, end, min, max } = that;
      if (!start) {
        start = GetDefaultDate(min, max, formatter);
      }
      // 包含快捷方式不限的时候end=不限，不需默认初始化
      if (!end && (!showShortcuts || (quickDates.indexOf('forever') < 0))) {
        end = GetDefaultDate(min, max, formatter);
      }

      let dateStartStr = DateFormat(start, formatter);
      let dateStart = DateParse(dateStartStr);
      let dateEnd, dateEndStr;
      if (end === ForeverStr) {
        dateEnd = dateEndStr = ForeverStr;
      } else {
        dateEndStr = DateFormat(end, formatter);
        dateEnd = DateParse(dateEndStr);
      }

      // 快捷操作，检测是否匹配到快捷日期
      let quickInfos = GetQuickInfos(quickDates, dateStartStr, formatter);

      let quickDateText, quickDateKey;
      // 可能匹配到多个
      for (let index = 0; index < quickInfos.length; index++) {
        let q = quickInfos[index];
        if (q.start === dateStartStr && q.end === dateEndStr) {
          quickDateText = q.text;
          quickDateKey = q.key;
          break;
        }
      }

      that.vsSingle = vsSingle
      // that.start = dateStart // Date
      that.startStr = dateStartStr
      // that.end = dateEnd // Date or Forever
      that.endStr = dateEndStr
      that.quickDateText = quickDateText
      that.quickDateKey = quickDateKey

      that.fillToNode()
    },
    fillToNode() {
      let that = this;
      let vs = that.getVs,
        vsSingle = that.vsSingle,
        formatter = that.formatter;

      let startStr = that.startStr,
        endStr = that.endStr,
        quickDateText = that.quickDateText;

      let result = {
        centerTip: vs ? this.t('h.calendar.vs') : this.t('h.calendar.to')
      }

      let today = DateFormat(GetOffsetDate(0), formatter),
        yesterday = DateFormat(GetOffsetDate(-1), formatter),
        tomorrow = DateFormat(GetOffsetDate(1), formatter);
      let map = {
        [today]: this.t('h.calendar.today'),
        [yesterday]: this.t('h.calendar.yesterday'),
        [tomorrow]: this.t('h.calendar.tomorrow')
      };
      let textFn = (str) => {
        return map[str] || str;
      }

      if (vs) {
        result.startStr = textFn(startStr);
        result.endStr = textFn(endStr);
      } else {
        // 非对比情况
        if (vsSingle) {
          // 选择单日
          result.startStr = textFn(startStr);
        } else {
          // 选择连续时间
          if (quickDateText) {
            if (quickDateText === ForeverStr) {
              // 不限的情况显示开始时间
              result.startStr = startStr;
              result.endStr = ForeverStr;
            } else {
              result.startStr = quickDateText;
            }
          } else {
            result.startStr = startStr;
            result.endStr = endStr;
          }
        }
      }

      that.centerTip = result.centerTip
      that.startStr = result.startStr
      that.endStr = result.endStr
    },
    toggle() {
      if (this.disabled) {
        return false
      }
      let show = this.show;
      if (show) {
        this.hideDiv();
      } else {
        this.showDiv();
      }
    },
    showDiv() {
      let that = this;
      let show = that.show;
      if (!show) {
        that.show = true

        let inputNode = $('#trigger_' + that.viewId),
          calNode = $('#rpcnt_' + that.viewId);

        let left = 0,
          top = inputNode.outerHeight();
        if (that.align === 'right') {
          left = inputNode.outerWidth() - calNode.outerWidth();
        }

        that.top = top
        that.left = left
      }
    },
    hideDiv() {
      let that = this;
      let show = that.show;
      if (show) {
        that.show = false
      }
    },
    choose(params) {
      let that = this
      that.startStr = DateFormat(params.startStr, that.formatter)
      let endStr = params.endStr
      if (ForeverStr !== endStr) {
        endStr = DateFormat(params.endStr, that.formatter)
      }
      that.endStr = endStr
    }
  }
};
</script>

<style></style>
