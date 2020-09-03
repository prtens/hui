<template>
  <div class="calendar-wrapper">
    <el-row :gutter="20">
      <el-col :span="5">
        <p style="height: 50px; line-height: 50px">=====calendars=====</p>
        <calendars
          :selected.sync="calendars.selected"
          :min="calendars.min"
          :max="calendars.max"
          :disabledWeeks="calendars.disabledWeeks"
        />
      </el-col>
      <el-col :span="5">
        <p style="height: 50px; line-height: 50px">=====datepicker=====</p>
        <calendars-datepicker
          :min="datepicker.start"
          :max="datepicker.end"
          :selected.sync="datepicker.selected"
          :dateType="datepicker.dateType"
          :align="datepicker.align"
          :prefix="datepicker.prefix"
          :disabledWeeks="datepicker.disabledWeeks"
          :weekStart="datepicker.weekStart"
          :disabled="datepicker.disabled"
        />
      </el-col>
      <el-col :span="6">
        <p style="height: 50px; line-height: 50px">=====range=====</p>
        <calendars-range
          :start.sync="range.start"
          :end.sync="range.end"
          :startDisabled="range.startDisabled"
          :endDisabled="range.endDisabled"
          :vsenable="range.vsenable"
          :vs.sync="range.vs"
          :single="range.single"
          :shortcuts="range.shortcuts"
          :shortkeys="range.shortkeys"
          :min="range.min"
          :max="range.max"
          :maxGap="range.maxGap"
          :minGap="range.minGap"
          :dateType="range.dateType"
          :formatter="range.formatter"
          :align="range.align"
          :textAlign="range.textAlign"
          :disabledWeeks="range.disabledWeeks"
          :weekStart="range.weekStart"
          :disabled="range.disabled"
        />
      </el-col>
      <el-col :span="8">
        <p style="height: 50px; line-height: 50px">=====rangepicker=====</p>
        <div style="width: 240px">
          <calendars-rangepicker
            :start.sync="rangeDatepicker.start"
            :end.sync="rangeDatepicker.end"
            :startDisabled="rangeDatepicker.startDisabled"
            :endDisabled="rangeDatepicker.endDisabled"
            :vsenable.sync="rangeDatepicker.vsenable"
            :vs.sync="rangeDatepicker.vs"
            :single="rangeDatepicker.single"
            :shortcuts="rangeDatepicker.shortcuts"
            :shortkeys="rangeDatepicker.shortkeys"
            :min="rangeDatepicker.min"
            :max="rangeDatepicker.max"
            :maxGap="rangeDatepicker.maxGap"
            :minGap="rangeDatepicker.minGap"
            :dateType="rangeDatepicker.dateType"
            :formatter="rangeDatepicker.formatter"
            :align="rangeDatepicker.align"
            :textAlign="rangeDatepicker.textAlign"
            :disabledWeeks="rangeDatepicker.disabledWeeks"
            :weekStart="rangeDatepicker.weekStart"
            :disabled="rangeDatepicker.disabled"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      calendars: {
        min: '2020-09-01',
        max: '2020-12-01',
        selected: '',
        dateType: '',
        disabledWeeks: [],
        weekStart: 0
      },
      datepicker: {
        min: '2020-09-01',
        max: '2020-12-01',
        selected: '2020-09-01',
        dateType: '',
        formatter: 'YYYY/MM/DD',
        align: 'left',
        prefix: '截止至',
        disabledWeeks: [],
        weekStart: 0,
        disabled: false
      },
      range: {
        start: '2020-09-01',
        end: '2020-10-01',
        startDisabled: false,
        endDisabled: false,
        vsenable: true,
        vs: false,
        single: false,
        shortcuts: true,
        shortkeys: [
          "today",
          "yesterday",
          "beforeYesterday",
          "preMonth",
          "preWeekSun",
          "preWeekMon",
          "lastestWeekSun",
          "lastestWeekMon",
          "passedThisMonth",
          "lastestThisMonth",
          "passed7",
          "passed15",
          "passed30",
          "lastest7",
          "lastest15",
          "lastest30",
          "dynamicStart7",
          "dynamicStart15",
          "dynamicStart30",
          "dynamicEndThisMonth",
          "dynamicEndNextMonth",
          "forever"
        ],
        min: '',
        max: '',
        maxGap: 0,
        minGap: 0,
        dateType: '',
        formatter: '',
        align: 'left',
        textAlign: 'left',
        disabledWeeks: [],
        weekStart: 0,
        disabled: false
      },
      rangeDatepicker: {
        start: '2020-09-01',
        end: '2020-10-01',
        startDisabled: false,
        endDisabled: false,
        vsenable: false,
        vs: false,
        single: false,
        shortcuts: true,
        shortkeys: [
          "today",
          "passed7",
          "yesterday",
          "passed15",
          "preWeekMon",
          "passed30",
          "preMonth",
          "forever"
        ],
        min: '2020-05-01',
        max: '2020-12-01',
        maxGap: 0,
        minGap: 0,
        dateType: '',
        formatter: '',
        align: 'left',
        textAlign: 'left',
        disabledWeeks: [],
        weekStart: 0,
        disabled: false
      }
    };
  },
  watch: {
    'calendars.selected': {
      immediate: true,
      handler(val) {
        console.log('==========calendars', val)
      }
    },
    'datepicker.selected': {
      immediate: true,
      handler(val) {
        console.log('==========datepicker', val)
      }
    },
    range: {
      deep: true,
      immediate: true,
      handler(val) {
        console.log('==========range', val)
      }
    },
    rangeDatepicker: {
      deep: true,
      immediate: true,
      handler(val) {
        console.log('==========rangeDatepicker', val)
      }
    }
  },
  methods: {
    init() {
      let that = this;
    }
  }
};
</script>

<style scoped>
.calendar-wrapper {
  font-size: 12px;
}
</style>
