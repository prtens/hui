<template>
  <div class="hn-calendar">
    <div
      class="clearfix"
      v-if="types.day"
    >
      <div class="header">
        <i
          class="el-icon-arrow-left minus"
          @click="changeMonth"
        ></i>

        <template v-if="types.month">
          <span
            class="title"
            @click="showMonths"
          >{{ year }} - {{ ('0' + month).slice(-2) }}</span>
        </template>
        <template v-else>
          <span
            class="title"
            @click="showYears"
          >{{ year }} - {{ ('0' + month).slice(-2) }}</span>
        </template>

        <i
          class="el-icon-arrow-left plus"
          @click="changeMonth({next:true})"
        ></i>
      </div>

      <div class="body">
        <div class="weeks clearfix">
          <span
            class="week"
            v-for="(text, key) in weekText"
            :key="key"
          >{{ text }}</span>
        </div>
        <div class="days clearfix">
          <span
            v-for="(tds, indexT) of days"
            :key="indexT"
            style="width: 100%;display: inline-block"
          >
            <span
              v-for="(td, index) of tds"
              :key="index"
              :class="`day ${td.today ? 'today' : ''} ${td.otherMonth ? 'gray' : ''} ${td.disabled ? 'notallowed' : ''} ${td.selected ? 'selected' : ''}`"
              @click="choose({toMonth:td.month,date:td.full})"
            >
              {{ td.day }}
            </span>
          </span>
        </div>
      </div>
    </div>

    <template v-if="types.month">
      <div :class="`clearfix ${types.day ? 'm-panel' : ''} ${showMonth ? 'ym-show' : ''}`">
        <div class="header">
          <i
            class="el-icon-arrow-left minus"
            @click="changeYear"
          ></i>
          <span
            class="title"
            @click="showYears"
          >{{ year }}</span>
          <i
            class="el-icon-arrow-left plus"
            @click="changeYear({next:true})"
          ></i>
        </div>
        <div class="body clearfix">
          <span
            v-for="(m, indexM) of months"
            :key="indexM"
            :class="`ym ${m.disabled ? 'notallowed' : ''} ${m.selected ? 'selected' : ''}`"
          >
            <span
              v-if="!m.disabled"
              @click="pickMonth({month:m.month})"
            >
              {{ m.month }}
            </span>
            <span v-else>
              {{ m.month }}
            </span>
          </span>
        </div>
      </div>
    </template>

    <template v-if="types.year">
      <div :class="`clearfix ${types.day||types.month ? 'y-panel' : ''} ${showYear ? 'ym-show' : ''}`">
        <div class="header">
          <i
            class="el-icon-arrow-left minus"
            @click="changeYear({range:true})"
          ></i>
          <span class="title">{{ startYear }} - {{ endYear }}</span>
          <i
            class="el-icon-arrow-left plus"
            @click="changeYear({range:true,next:true})"
          ></i>
        </div>
        <div class="body clearfix">
          <span
            v-for="(y, index) of years"
            :key="index"
            :class="`ym ${y.selected ? 'selected' : ''} ${y.disabled ? 'notallowed' : ''}`"
          >
            <span
              v-if="!y.disabled"
              @click="pickYear({year:y.year})"
            >
              {{ y.year }}
            </span>
            <span v-else>
              {{ y.year }}
            </span>
          </span>
        </div>
      </div>
    </template>

  </div>
</template>

<script type="text/babel">
import Locale from "../../mixins/locale";
import util from './util'

const {
  today: Today,
  foreverStr: ForeverStr,
  dateFormat: DateFormat,
  getDefaultDate: GetDefaultDate,
  dateParse: DateParse,
  parseDateType: ParseDateType,
  getWeekText: GetWeekText,
  yearDisabled: YearDisabled,
  monthDisabled: MonthDisabled,
  getNumOfDays: GetNumOfDays,
  dateDisabled: DateDisabled
} = util;

export default {
  name: "HCalendars",
  mixins: [Locale],
  props: {
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
    // 默认选中的日期
    // 1. 今天小于min，默认为min
    // 2. 今天大于max，默认为max
    // 3. 今天在可选范围之内，默认为今天
    selected: {
      type: String,
      default: ''
    },
    // 年月日选择类型 all,year,month,day
    dateType: {
      type: String,
      default: 'all'
    },
    // 时分秒选择类型 all,hour,minute,second
    timeType: {
      type: String,
      default: 'all'
    },
    // date格式
    formatter: {
      type: String,
      default: 'YYYY-MM-DD'
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
      type: Number | String,
      default: 0
    }
  },
  data() {
    return {
      year: '',
      month: '',
      selectedYear: '',
      selectedMonth: '',
      tselected: '',
      timeValue: '',
      dateValue: '',
      showYear: 0,
      showMonth: 0,
      types: {},
      tdisabledWeeks: [],
      weekText: '',
      startYear: '',
      endYear: '',
      years: [],
      months: [],
      days: []
    }
  },
  computed: {
    // 最大不关心时分秒，时分秒的大小不限制
    getMax: function () {
      let me = this;
      return me.max ? new Date(DateFormat(me.max, 'YYYY/MM/DD') + ' 23:59:59') : me.max;
    },
    // 最小不关心时分秒，时分秒的大小不限制
    getMix: function () {
      let me = this;
      return me.min ? new Date(DateFormat(me.min, 'YYYY/MM/DD') + ' 00:00:00') : me.min;
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    selected: {
      immediate: true,
      handler(val) {
        this.init()
      }
    }
  },
  methods: {
    init() {
      let me = this;
      let forever = (me.selected === ForeverStr);

      let tselected = '';
      if (!me.selected || forever) {
        tselected = GetDefaultDate(me.getMix, me.getMax, me.formatter);
      } else {
        tselected = DateParse(me.selected);
      }

      let timeValue = DateFormat(tselected, 'hh:mm:ss');
      let dateValue = DateFormat(tselected, me.formatter.slice(0, 10));
      let types = ParseDateType(me.dateType);

      let tdisabledWeeks = (me.disabledWeeks || []).map(w => {
        return +w;
      });

      me.timeValue = timeValue;
      me.dateValue = dateValue;
      me.types = types;
      me.tdisabledWeeks = tdisabledWeeks;
      me.weekText = GetWeekText(me.weekStart)

      // 不限的情况特殊处理，不设置选中值
      me.updateSelected(tselected, forever);
      me.updateYears();
      me.updateMonths();
      me.updateDays();
    },
    updateSelected(selected, forever) {
      let me = this
      selected = DateParse(selected);
      let formatter = me.formatter;
      if (selected) {
        me.year = selected.getFullYear();
        me.month = selected.getMonth() + 1;
        me.selectedYear = selected.getFullYear();
        me.selectedMonth = selected.getMonth() + 1;
        me.tselected = forever ? '' : DateFormat(selected, formatter);
      }
    },
    updateYears() {
      let me = this;
      let year = me.year;
      let min = me.getMix;
      let max = me.getMax;
      let startYear = year - year % 10 - 1;
      let endYear = startYear + 11;
      let rows = [];
      for (let i = startYear; i <= endYear; i++) {
        rows.push({
          year: i,
          selected: i === me.selectedYear,
          disabled: YearDisabled(i, min, max)
        });
      }
      me.startYear = startYear;
      me.endYear = endYear;
      me.years = rows;
    },
    updateMonths() {
      let me = this,
        rows = [],
        year = me.year,
        min = me.getMix,
        max = me.getMax;
      for (let i = 1; i <= 12; i++) {
        rows.push({
          month: i,
          selected: year === me.selectedYear && i === me.selectedMonth,
          disabled: MonthDisabled(year, i - 1, min, max)
        });
      }
      me.months = rows;
    },
    updateDays() {
      let me = this;
      let trs = [];
      let weekStart = me.weekStart;
      let disabledWeeks = me.tdisabledWeeks;
      let year = me.year;
      let month = me.month;
      let startOffset = (7 - weekStart + new Date(year, month - 1, 1).getDay()) % 7;
      let tds = [];
      let days = GetNumOfDays(year, month),
        i;

      let preDays = GetNumOfDays(year, month - 1);
      let max = me.getMax;
      let min = me.getMix;

      let day, date, formatDay;
      // 日期不关注时分秒
      let formatter = me.formatter;
      formatter = formatter.slice(0, 10);

      let selected = me.selected;
      if (selected) {
        // 不限的情况下，selected = ''
        selected = DateFormat(selected, formatter);
      }

      let today = DateFormat(Today, formatter);
      for (i = 1; i <= startOffset; i++) {
        day = preDays - (startOffset - i);
        date = new Date(year, month - 2, day);
        tds.push({
          month: month - 1,
          full: DateFormat(date, formatter),
          day: day,
          otherMonth: true,
          disabled: DateDisabled(date, min, max, disabledWeeks)
        });
      }
      for (i = 1; i <= days; i++) {
        date = new Date(year, month - 1, i);
        formatDay = DateFormat(date, formatter);
        tds.push({
          today: formatDay === today,
          selected: formatDay === selected,
          day: i,
          month: month,
          full: formatDay,
          disabled: DateDisabled(date, min, max, disabledWeeks)
        });
        if (((i + startOffset) % 7) === 0) {
          trs.push(tds);
          tds = [];
        }
      }
      let fillStart = tds.length; // 补充
      let fillEnd = 14; // 2周
      for (i = fillStart; i < fillEnd; i++) {
        day = i - fillStart + 1;
        date = new Date(year, month, day);
        tds.push({
          month: month + 1,
          day: day,
          otherMonth: true,
          full: DateFormat(date, formatter),
          disabled: DateDisabled(date, min, max, disabledWeeks)
        });
        if ((i + 1) % 7 === 0) {
          trs.push(tds);
          tds = [];
          if (trs.length === 6) break;
        }
      }
      me.days = trs;
    },
    changeMonth(params) {
      let me = this,
        month = me.month,
        year = me.year;
      if (params.next) {
        month += 1;
        if (month > 12) {
          month = 1;
          year++;
        }
      } else {
        month -= 1;
        if (month < 1) {
          month = 12;
          year--;
        }
      }
      me.year = year;
      me.month = month;
      me.updateDays();
    },
    changeYear(params) {
      let me = this;
      let year = me.year;
      if (params.range) {
        year = year + (params.next ? 10 : -10);
      } else {
        year = year + (params.next ? 1 : -1);
      }
      me.year = year;
      if (params.range) {
        me.updateYears();
      } else {
        me.updateMonths();
      }
    },
    showMonths() {
      let me = this;
      me.showMonth = 1;
      me.updateMonths();
    },
    showYears() {
      let me = this;
      me.showYear = 1;
      me.updateYears();
    },
    pickYear(params) {
      let year = params.year;
      let me = this;
      let types = me.types;
      if (types.day || types.month) {
        me.showYear = 0;
        me.year = +year;
        if (types.month) {
          me.updateMonths();
        } else {
          me.updateDays();
        }
      } else {
        me.updateSelected(year + '-01-01');
        me.updateYears();
        me.fireEvent();
      }
    },
    pickMonth(params) {
      let month = params.month;
      let me = this;
      if (me.types.day) {
        me.showMonth = 0;
        me.month = +month;
        me.updateDays();
      } else {
        me.updateSelected(me.year + '-' + month + '-01');
        me.updateMonths();
        me.fireEvent();
      }
    },
    choose(params) {
      let me = this;
      let month = me.month;
      let turnMonth = params.toMonth !== month;
      me.updateSelected(params.date);
      if (turnMonth) {
        me.updateYears();
        me.updateMonths();
      }
      me.dateValue = params.date;
      me.updateDays();
      me.fireEvent();
    },
    fireEvent() {
      let me = this;
      if (me.types.day) {
        if (me.timeType) {
          me.$emit('change', {
            date: me.dateValue,
            time: me.timeType ? me.timeValue : null
          })
        }
      } else {
        me.$emit('change', {
          date: me.selectedYear + (me.types.month ? '-' + ('0' + me.selectedMonth).slice(-2) : '')
        })
      }
    }
  }
};
</script>

<style scoped></style>
