<template>
  <div class="hn-datepicker">
    <div
      :id="`trigger_${viewId}`"
      :class="`mx-trigger result ${!prefix ? 'result-with-icon' : ''}`"
      v-clickoutside="hideDiv"
      @click="toggle"
    >
      <template v-if="!prefix">
        <i class="el-icon-date prefix-icon"></i>
      </template>
      <template v-else>
        <span class="color-9">{{ prefix }}：</span>
      </template>
      {{ (selected || placeholder) }}
    </div>

    <div
      :id="`dpcnt_${viewId}`"
      :class="`mx-output mx-output-bottom ${show ? 'mx-output-open' : ''}`"
      :style="{left: `${left}px`, top: `${top}px`}"
    >
      <calendars
        :min="min"
        :max="max"
        :selected="selected"
        :dateType="dateType"
        :timeType="timeType"
        :formatter="formatter"
        :disabledWeeks="disabledWeeks"
        :weekStart="weekStart"
        @change="choose"
      />
    </div>
  </div>
</template>

<script>
import Calendars from './calendars'
import $ from "jquery"
import Clickoutside from 'element-ui/src/utils/clickoutside';

export default {
  name: 'CalendarsDatepicker',
  components: {
    Calendars
  },
  directives: {
    Clickoutside
  },
  props: {
    viewId: {
      type: String,
      default: 'calendars-datepicker'
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
    // 默认选中的日期
    selected: {
      type: String,
      default: ''
    },
    // 年月日选择类型 year,month,day
    dateType: {
      type: String,
      default: ''
    },
    // 时分秒选择类型 hour,minute,second
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
    // 提示文案前缀，展示为prefix：date time
    prefix: {
      type: String,
      default: ''
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
    // 空状态文案
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      left: '',
      top: '',
      show: false
    };
  },
  computed: {},
  mounted() {
  },
  methods: {
    toggle() {
      let that = this
      if (that.disabled) {
        return false
      }

      let show = that.show;
      if (show) {
        that.hideDiv();
      } else {
        that.showDiv();
      }
    },
    showDiv() {
      let that = this;
      let { show, align, viewId } = that;
      if (!show) {
        that.show = true

        let inputNode = $(`#trigger_${viewId}`)
        let calNode = $(`#dpcnt_${viewId}`);
        let left = 0,
          top = inputNode.outerHeight();

        if (align === 'right') {
          left = inputNode.outerWidth() - calNode.outerWidth()
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
      this.hideDiv()
      this.$emit('update:selected', params.date)
      this.$emit('change', params)
    }
  }
};
</script>

<style></style>
