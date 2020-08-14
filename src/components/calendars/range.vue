<template>
  <div :class="`range-wrapper ${timeType ? 'time' : ''}`" >
  
    <div class="range">
  
      <div class="clearfix pr">
        <div class="range-input range-input-left">
          <!-- 结束时间禁止操作的时候限制最大可选为直接时间endDisabled -->
          <calendars-datepicker  :class="`${vs ? 'vs1' : ''}`"
          :min="min"
          :max="(endDisabled?dates.endStr:max)"
          :formatter="formatter"
          :disabled-weeks="disabledWeeks"
          :time-type="timeType"
          :date-type="dateType"
          :selected="startStr" />
        </div>
        <div class="range-gap">-</div>
        <div class="range-input range-input-right">
          <!-- 不对比的时候，限制结束时间最小值为(开始时间或最小日期中的较大值) -->
          <calendars-datepicker  :class="`${vs ? 'vs2' : ''}`"
                                 :min="!vs?endMinFn(startStr,min):min"
                                 :max="max"
                                 :formatter="formatter"
                                 :disabled-weeks="disabledWeeks"
                                 :time-type="timeType"
                                 :date-type="dateType"
                                 :selected="startStr" />
        </div>
      </div>
      
    </div>
  
    <template v-if="quickInfos.length&&!vs&&!vsSingle">
    <div :class="shortcuts `${quickInfos.length > quickGap ? 'shortcuts-small' : ''}`">
      <div class="title">{{quickTip}}：</div>
      <div class="clearfix">
        <span v-for="(info, index) of quickInfos" :key="index">
          
          <span :class="st `${dates.quickDateKey==info.key ? 'selected' : ''}`"
                @click="datePicked({quick:true,quickInfo:info})"
                :title="info.text">info.text</span>
          
        </span>
        
      </div>
    </div>
    </template>
  
  
  </div>
</template>

<script>
import Locale from '../../mixins/locale';
import CalendarsDatepicker from "./datepicker";

import util from './util'
const { foreverStr: ForeverStr, padZero: PadZero, dateFormat: DateFormat, dateParse: DateParse, getDefaultDate: GetDefaultDate, getQuickInfos: GetQuickInfos, getOffsetDate: GetOffsetDate, parseDateType: ParseDateType } = util;

export default {
  components: { CalendarsDatepicker },
  name: 'CalendarsRange',
  mixins: [Locale],
  props: {
    // 对比初始值
    vs: {
      type: Boolean,
      default: false
    },
    timeType: {
      type: String,
      default: ''
    },
    dateType: {
      type: String,
      default: ''
    },
    startStr: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      disabledWeeks: [],
      title: '',
      quickDates: [],
      quickInfos: '',
      quickGap: '',
      quickTip: '',
      submitText: '',
      cancelText: '',
    };
  },
  mounted() {
    this.init()
  },
  methods:{
    init() {
  
      let that = this;
      that.formatter = that.formatter || 'YYYY-MM-DD';
      that.title = that.title || this.t('calendar.range.title');
  
      let quickDates = that.quickDates || [];
      let startStr = that.startStr,
        endStr = that.endStr;
      let min = that.min,
        max = that.max;
      if (!startStr) {
        that.startStr = startStr = GetDefaultDate(min, max, formatter);
        that.start = DateParse(startStr);
      }
      if (!that.start) {
        that.start = DateParse(that.startStr);
      }
  
      // 包含快捷方式不限的时候end可能为空，不需默认初始化
      if (!endStr) {
        that.endStr = endStr = GetDefaultDate(min, max, formatter);
        that.end = DateParse(endStr);
      }
      if (!that.end) {
        that.end = DateParse(that.endStr);
      }
  
      let quickInfos = GetQuickInfos(that.quickDates, startStr, formatter);
      if (!that.quickDateKey) {
        for (let index = 0; index < quickInfos.length; index++) {
          let q = quickInfos[index];
          if (q.start == startStr && q.end == endStr) {
            that.quickDateKey = q.key;
            that.quickDateText = q.text;
            break;
          }
        }
      }
      that.quickInfos = quickInfos;
      that.quickGap = that.quickGap || 7;
      that.quickTip = this.t('calendar.quick');
  
      that.submitText = this.t('dialog.submit');
      that.cancelText = this.t('dialog.cancel');
  
      that.endMinFn = (curStart, curMin) => {
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
      }
      
      
    },
  
    datePicked() {
      let that = this;
      let data = updater.get();
      let { dates, formatter, quickDates, vs, vsSingle, minGap, maxGap } = data;
    
      let params = e.params;
      if (params.quick) {
        // 选择快捷方式
        // 快捷日期可能需要动态计算，已当前开始时间为准
        let quickInfo = params.quickInfo;
      
        let start = new Date(DateFormat(quickInfo.start, formatter));
        let end;
        if (quickInfo.end == ForeverStr) {
          // 不限的情况不考虑
          end = ForeverStr;
        } else {
          end = new Date(DateFormat(quickInfo.end, formatter));
          // 如果有最大最小值，选择快捷日期的时候会进行范围修正
          let min, max,
            minMillions, maxMillions;
          if (data.min) {
            min = new Date(DateFormat(data.min, formatter));
            minMillions = min.getTime();
          }
          if (data.max) {
            max = new Date(DateFormat(data.max, formatter));
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
          endStr = (end == ForeverStr) ? ForeverStr : DateFormat(end, formatter);
      
        // 开始时间会影响快捷日期
        let quickInfos = GetQuickInfos(quickDates, startStr, formatter);
        let quickDateText, quickDateKey;
        for (let index = 0; index < quickInfos.length; index++) {
          let q = quickInfos[index];
          if (q.start == startStr && q.end == endStr) {
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
        if (((endStr == ForeverStr) && vs) ||
          (!vs && !vsSingle && (endStr != ForeverStr) && (end.getTime() < start.getTime()))) {
          endStr = startStr;
          end = new Date(DateFormat(endStr, formatter));
        }
        Magix.mix(dates, {
          end: end,
          endStr: endStr
        })
      }
      let errorMsg = '';
      if (!vs && !vsSingle && (dates.endStr != ForeverStr)) {
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
      updater.digest({
        dates: dates,
        errorMsg
      });
      if (!errorMsg) {
        that['@{owner.node}'].trigger({
          type: 'change',
          vs,
          dates
        });
      }
    },
  }
};
</script>

<style></style>
