<template>
  <div>
    <div :class="`range-wrapper ${timeType ? 'time' : ''}`">

      <div class="range">
        <div class="title clearfix">
          <span class="fl">{{ title }}：</span>
          <template v-if="vsenable">
            <el-switch class="fr" v-model="currentVs"></el-switch>
          </template>
        </div>
        <div class="clearfix">
          <div class="range-input range-input-left">
            <!-- 结束时间禁止操作的时候限制最大可选为直接时间endDisabled -->
            <calendars-datepicker :class="`${currentVs} ? 'vs1' : ''`"
                                  :min="min"
                                  :max="endDisabled?dates.endStr:max"
                                  :formatter="formatter"
                                  :disabled-weeks="disabledWeeks"
                                  :time-type="timeType"
                                  :date-type="dateType"
                                  :selected.sync="dates.startStr"
                                  :disabled="startDisabled"
                                  @change="syncDate($event, 'start')"/>
          </div>
          <div class="range-gap">-</div>
          <div class="range-input range-input-right">
            <!-- 不对比的时候，限制结束时间最小值为(开始时间或最小日期中的较大值) -->
            <calendars-datepicker :class="`${currentVs} ? 'vs2' : ''`"
                                  :min="!currentVs?endMinFn(dates.startStr,min):min"
                                  :max="max"
                                  :formatter="formatter"
                                  :disabled-weeks="disabledWeeks"
                                  :time-type="timeType"
                                  :date-type="dateType"
                                  :align="align"
                                  :selected.sync="dates.endStr"
                                  :disabled="(!currentVs&&vsSingle) || endDisabled ? true : false"
                                  @change="syncDate($event, 'end')"/>
          </div>
        </div>
      </div>

      <template v-if="quickInfos.length&&!vs&&!vsSingle">
        <div :class="`shortcuts ${quickInfos.length > quickGap ? 'shortcuts-small' : ''}`">
          <div class="title">{{ quickTip }}：</div>
          <div class="clearfix">
            <span v-for="(info, index) of quickInfos" :key="index">
              <span :class="`st ${dates.quickDateKey==info.key ? 'selected' : ''}`"
                    @click="datePicked({quick:true,quickInfo:info})"
                    :title="info.text">{{ info.text }}</span>
            </span>
          </div>
        </div>
      </template>
    </div>

    <div class="mx-output-footer">
      <el-button class="mr10" type="primary" @click="datePicked">{{ submitText }}</el-button>
      <el-button class="mr10" type="primary" plain @click="cancel">{{ cancelText }}</el-button>
      <span class="color-red">{{ errorMsg }}</span>
    </div>
  </div>
</template>

<script>
import Locale from '../../mixins/locale';
import CalendarsDatepicker from "./datepicker";

import util from './util'

const {foreverStr: ForeverStr, padZero: PadZero, dateFormat: DateFormat, dateParse: DateParse, getDefaultDate: GetDefaultDate, getQuickInfos: GetQuickInfos, getOffsetDate: GetOffsetDate, parseDateType: ParseDateType} = util;

export default {
  name: 'CalendarsRange',
  mixins: [Locale],
  components: {
    CalendarsDatepicker
  },
  props: {
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
//     是否禁止选择开始日期
//     开始日期禁止使用的时候，只允许使用动态计算的快捷日期
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
          "today",
          "yesterday",
          "passed7",
          "preWeekMon",
          "passed15",
          "lastestThisMonth",
          "passed30",
          "preMonth"
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
//     年月日选择类型：
// 可选择"year,month,day"中的一个或者多个
// 此外"all" = "year,month,day" = ""，不设置的时候默认年月日都显示
    dateType: {
      type: String,
      default: ''
    },
//     时分秒选择类型：
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
    weekstart: {
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
      title: '选择日期',
      quickDates: ['passed5', 'passed10'],
      quickInfos: [],
      quickGap: '',
      quickTip: '快捷日期',
      submitText: '确定',
      cancelText: '取消',
      dates: {
        start: '',
        end: '',
        startStr: '',
        endStr: '',
        quickDateText: '',
        quickDateKey: ''
      },
      vsSingle: false,
      errorMsg: ''
    };
  },
  mounted() {
    this.init()
  },
  computed: {
    currentVs: {
      get() {
        return this.vs;
      },
      set(val) {
        this.$emit("update:vs", val);
      }
    }
  },
  methods: {
    endMinFn(curStart, curMin) {
      if (!curMin) {
        return curStart;
      }
      let s = new Date(curStart),
        m = new Date(curMin);

      if (s.getTime() > m.getTime()) {
        return curStart;
      } else {
        return curMin
      }
    },
    init() {
      let that = this;

      let dates = that.dates,
        formatter = that.formatter;
      let startStr = that.start || dates.startStr,
        endStr = that.end || dates.endStr;

      let min = that.min,
        max = that.max;
      if (!startStr) {
        dates.startStr = startStr = GetDefaultDate(min, max, formatter);
        dates.start = DateParse(startStr);
      }
      if (!dates.start) {
        dates.start = DateParse(dates.startStr);
      }

      // 包含快捷方式不限的时候end可能为空，不需默认初始化
      if (!endStr) {
        dates.endStr = endStr = GetDefaultDate(min, max, formatter);
        dates.end = DateParse(endStr);
      }
      if (!dates.end) {
        dates.end = DateParse(dates.endStr);
      }

      let quickInfos = GetQuickInfos(that.quickDates, startStr, formatter);
      if (!dates.quickDateKey) {
        for (let index = 0; index < quickInfos.length; index++) {
          let q = quickInfos[index];
          if (q.start === startStr && q.end === endStr) {
            dates.quickDateKey = q.key;
            dates.quickDateText = q.text;
            break;
          }
        }
      }
      that.quickInfos = quickInfos;
      that.quickGap = that.quickGap || 7;
    },
    syncDate(e, trigger) {
      let that = this;

      let result = e.date + (e.time ? ' ' + e.time : '');
      that.dates[trigger + 'Str'] = result;

      let startStr = that.dates.startStr,
        endStr = that.dates.endStr;
      let start = new Date(DateFormat(startStr, that.formatter)),
        end;
      if (endStr === ForeverStr) {
        end = ForeverStr;
      } else {
        end = new Date(DateFormat(endStr, that.formatter));
        // 结束时间小于开始时间，进行修正
        if (!that.currentVs && !that.vsSingle && (end.getTime() < start.getTime())) {
          end = start;
          endStr = DateFormat(end, that.formatter);
        }
      }

      // 开始时间会影响快捷日期
      let quickInfos = GetQuickInfos(that.quickDates, startStr, that.formatter);
      let quickDateText, quickDateKey;
      for (let index = 0; index < quickInfos.length; index++) {
        let q = quickInfos[index];
        if (q.start === startStr && q.end === endStr) {
          quickDateText = q.text;
          quickDateKey = q.key;
          break;
        }
      }

      that.quickInfos = quickInfos
      that.dates.quickDateKey = quickDateKey
      that.dates.quickDateText = quickDateText
    },
    datePicked(params) {
      let that = this;
      let {dates, formatter, quickDates, vs, vsSingle, minGap, maxGap} = that;
      if (params.quick) {
        // 选择快捷方式
        // 快捷日期可能需要动态计算，已当前开始时间为准
        let quickInfo = params.quickInfo;

        let start = new Date(DateFormat(quickInfo.start, formatter));
        let end;

        if (quickInfo.end === ForeverStr) {
          // 不限的情况不考虑
          end = ForeverStr;
        } else {
          end = new Date(DateFormat(quickInfo.end, formatter));
          // 如果有最大最小值，选择快捷日期的时候会进行范围修正
          let min, max,
            minMillions, maxMillions;
          if (that.min) {
            min = new Date(DateFormat(that.min, formatter));
            minMillions = min.getTime();
          }
          if (that.max) {
            max = new Date(DateFormat(that.max, formatter));
            maxMillions = max.getTime();
          }
          let startMillions = start.getTime(),
            endMillions = end.getTime();
          if (minMillions && (startMillions < minMillions)) {
            // 开始时间小于最小值
            start = min;
          } else if (maxMillions && (startMillions > maxMillions)) {
            // 开始时间大于最大值
            start = max;
          }
          if (maxMillions && (endMillions > maxMillions)) {
            // 结束时间大于最大值
            end = max;
          } else if (minMillions && (endMillions < minMillions)) {
            // 结束时间小于最小值
            end = min;
          }
          if (end.getTime() < start.getTime()) {
            end = start;
          }
        }

        let startStr = DateFormat(start, formatter),
          endStr = (end === ForeverStr) ? ForeverStr : DateFormat(end, formatter);

        // 开始时间会影响快捷日期
        let quickInfos = GetQuickInfos(quickDates, startStr, formatter);
        let quickDateText, quickDateKey;
        for (let index = 0; index < quickInfos.length; index++) {
          let q = quickInfos[index];
          if (q.start === startStr && q.end === endStr) {
            quickDateText = q.text;
            quickDateKey = q.key;
            break;
          }
        }

        dates = {
          start,
          end,
          startStr,
          endStr,
          quickDateText,
          quickDateKey
        }
      } else {
        // 确定
        let startStr = dates.startStr,
          endStr = dates.endStr,
          start = dates.start,
          end = dates.end;
        // 修正结束时间：
        //  1. 对比的情况下，可能保留了非对比情况的不限快捷方式选项，如果结束时间为不限，切换为开始时间
        //  2. 不对比选择连续时间的时候，可能有对比切换的结果，如果结束时间小于开始时间，结束时间替换为开始时间
        if (((endStr === ForeverStr) && vs) ||
          (!vs && !vsSingle && (endStr !== ForeverStr) && (end.getTime() < start.getTime()))) {
          endStr = startStr;
          end = new Date(DateFormat(endStr, formatter));
        }
        dates.end = end
        dates.endStr = endStr
      }

      let errorMsg = '';
      if (!vs && !vsSingle && (dates.endStr !== ForeverStr)) {
        // 选择连续时间的情况下，比较天数范围
        let formatterGap = 'YYYY/MM/DD';
        let startGap = new Date(DateFormat(dates.startStr, formatterGap));
        let endGap = new Date(DateFormat(dates.endStr, formatterGap));
        let gap = (endGap.getTime() - startGap.getTime()) / (24 * 60 * 60 * 1000) + 1;
        if (minGap > 0 && gap < minGap) {
          errorMsg = `至少选择${minGap}天`;
        }
        if (maxGap > 0 && gap > maxGap) {
          errorMsg = `至多选择${maxGap}天`;
        }
      }
      this.errorMsg = errorMsg
      this.dates = dates
    },
    cancel() {
    }
  }
};
</script>

<style></style>
