<template>
  <div class="calendar-wrapper">
    <el-row :gutter="20">
      <el-col :span="5">
        <p>直接使用日历面板</p>
        <h-calendars
          :selected="calendars.selected"
          :min="calendars.min"
          :max="calendars.max"
          @change="calendarsChange"
        />
      </el-col>
      <el-col :span="5">
        <p>限制最大最小值 + 右对齐 + 提示文案前缀 + 事件处理</p>
        <h-date-picker
          :min="datepicker.min"
          :max="datepicker.max"
          :selected="datepicker.selected"
          :align="datepicker.align"
          :prefix="datepicker.prefix"
          @change="datePickerChange"
        />
      </el-col>
      <el-col :span="6">
        <p>自定义快捷日期，至少选择3天，至多选择10天</p>
        <h-date-range
          :start.sync="range.start"
          :end.sync="range.end"
          :vsenable="range.vsenable"
          :vs.sync="range.vs"
        />
      </el-col>
      <el-col :span="8">
        <p>rangepicker 日历面板右对齐</p>
        <div style="width: 250px">
          <h-date-range-picker
            :start.sync="rangeDatepicker.start"
            :end.sync="rangeDatepicker.end"
            :vsenable.sync="rangeDatepicker.vsenable"
            :vs.sync="rangeDatepicker.vs"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HCalendars from "../../src/components/calendars/calendars";
import HDatePicker from "../../src/components/calendars/datepicker";
import HDateRange from "../../src/components/calendars/range";
import HDateRangePicker from "../../src/components/calendars/rangepicker";

export default {
  components: { HDateRangePicker, HDateRange, HDatePicker, HCalendars },
  data() {
    return {
      calendars: {
        min: '2020-12-05',
        max: '2025-1-19',
        selected: '2021-1-8'
      },
      datepicker: {
        min: '2020-12-05',
        max: '2025-1-19',
        selected: '2021-1-8',
        align: 'left',
        prefix: '截止至'
      },
      range: {
        start: '2020-09-01',
        end: '2020-10-01',
        vsenable: true,
        vs: false
      },
      rangeDatepicker: {
        start: '2020-09-01',
        end: '2020-10-01',
        vsenable: true,
        vs: false
      }
    };
  },
  methods: {
    init() {
      let that = this;
    },
    calendarsChange(row) {
      this.calendars.selected = row.date
      console.log(row)
    },
    datePickerChange(row) {
      this.datepicker.selected = row.date
      console.log(row)
    }
  }
};
</script>

<style scoped>
.calendar-wrapper {
  font-size: 12px;
}
</style>
