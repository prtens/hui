<template>
  <div
    :style="{width: `${maxWidth}px`}"
    class="hn-duration-wrapper"
  >
    <!-- 鼠标hover提示浮层 -->
    <div
      v-show="hoverInfo.show"
      :style="{top: `${hoverInfo.top}px`, left: `${hoverInfo.left}px`}"
      class="hn-discount-hover hn-shadow"
    >
      <div>{{ hoverInfo.week }}</div>
      <div><strong>{{ hoverInfo.time }}</strong></div>
      <div><strong>{{ hoverInfo.discount }}</strong>%折扣</div>
    </div>

    <!-- 选择区域遮罩浮层 -->
    <div
      v-show="maskInfo.show"
      :style="{top: `${maskInfo.top}px`, left: `${maskInfo.left}px`, height: `${maskInfo.height}px`, width: `${maskInfo.width}px`}"
      class="hn-discount-mask"
    >
    </div>

    <!-- 选中区域设置浮层 -->
    <div
      v-if="settingInfo.show"
      :style="{top: `${settingInfo.top}`, left: `${settingInfo.left}px`}"
      class="hn-discount-setting hn-shadow"
    >
      <div class="hn-discount-setting__content">
        <div class="hn-discount-setting__box">
          <span>{{ settingInfo.week }}</span>：
          <strong>{{ settingInfo.time }}</strong>
        </div>
        <div class="hn-discount-setting__box">
          <el-radio-group v-model="settingInfo.type">
            <div
              class="hn-discount-setting__box"
              v-for="(sItem, key) of settingList"
              :key="key"
            >
              <template v-if="(sItem.value === 1)">
                <el-radio :label="+sItem.value">{{ sItem.text }}</el-radio>
                <el-input
                  v-model="settingInfo.discount"
                  :disabled="(settingInfo.type !== sItem.value)"
                  placeholder="请输入折扣"
                  style="width: 150px;"
                >
                  <template slot="append">%</template>
                </el-input>
              </template>
              <template v-else>
                <el-radio :label="sItem.value">{{ sItem.text }}</el-radio>
              </template>
            </div>
          </el-radio-group>
        </div>
      </div>
      <div class="hn-discount-setting__footer">
        <el-button
          type="primary"
          plain
          @click="submitSetting"
        >确定
        </el-button>
        <el-button
          type="primary"
          plain
          @click="cancelSetting"
        >取消
        </el-button>
      </div>
    </div>

    <!-- 区域选择 -->
    <div
      class="hn-duration clearfix"
      :id="`${viewId}_duration`"
      :style="{width: `${maxWidth}px`}"
    >
      <ul
        class="hn-duration__week"
        :style="{width: `${boxWidth * multiple}px`}"
      >
        <li
          class="hn-duration__week-item"
          :style="{height: `${headerHeight + 1}px`, lineHeight: `${headerHeight}px`}"
        >星期
        </li>
        <li
          class="hn-duration__week-item"
          :style="{height: `${boxHeight}px`, lineHeight: `${boxHeight}px`}"
          v-for="(week, key) in weeks"
          :key="key"
        >{{ week }}
        </li>
      </ul>
      <div
        class="hn-duration__content"
        :style="{width: `${boxWidth*rowNum}px`}"
      >
        <ul class="hn-duration__range clearfix">
          <li
            class="hn-duration__range-item"
            :style="{width: `${(boxWidth*(rowNum/4))}px`, height: `${headerHeight/2}px`, 'line-height': `${headerHeight/2}px`}"
            v-for="(range, key) in ranges"
            :key="key"
          >{{ range }}
          </li>
        </ul>
        <ul class="hn-duration__time clearfix">
          <li
            class="hn-duration__time-item"
            :style="{width: `${(boxWidth*multiple)}px`, height: `${headerHeight/2}px`, 'line-height': `${headerHeight/2}px`}"
            v-for="(C, i) in 24"
            :key="C"
          >{{ i }}
          </li>
        </ul>
        <ul class="hn-duration__boxzones clearfix">
          <li
            class="hn-duration__boxzone"
            :style="{width: `${boxWidth}px`, height: `${boxHeight}px`, 'background-color': `${zone.bg}`}"
            v-for="(zone, key) of boxZones"
            :key="key"
            @click="clickOutside($event, zone.index)"
            @mousedown="select($event, key)"
            @mouseover="showTip(key)"
            @mouseout="hideTip(key)"
          ></li>
        </ul>
      </div>
    </div>
    <div class="hn-duration__footer clearfix">
      <el-button
        type="primary"
        plain
        @click="clear"
      >清空
      </el-button>
      <el-button
        type="primary"
        plain
        @click="reset"
      >重置
      </el-button>

      <span class="hn-duration__tip">
        <template v-for="(dot, key) of dots">
          <span
            class="hn-duration--circle-percent"
            :key="key"
          >
            <span
              class="hn-duration--circle"
              :style="{'background-color': `${dot.value}`}"
            ></span>
            <span class="hn-duration--percent">{{ dot.text }}</span>
          </span>
        </template>
        <i class="el-icon-bell"></i>
        <span>可以拖拽鼠标选择投放时段</span>
      </span>

    </div>
  </div>
</template>

<script type="text/babel">
import $ from "jquery"
import ColorMap from './colors';

const Data = {
  none: '0;0;0;0;0;0;0',
  def: '00:00-24:00:100;00:00-24:00:100;00:00-24:00:100;00:00-24:00:100;00:00-24:00:100;00:00-24:00:100;00:00-24:00:100'
}

const SettingList = [
  {
    text: '自定义',
    value: 1
  },
  {
    text: '无折扣',
    value: 2
  }, {
    text: '不投放',
    value: 3
  }
]

export default {
  name: "HDuration",
  props: {
    viewId: {
      type: String,
      default: "time-step-discount"
    },
    /**
     * 单个格子宽度
     * 1. 选择一小时的场景默认 32px
     * 2. 选择半小时的场景默认 18px
     */
    boxWidth: {
      type: Number,
      default: 32
    },
    /**
     * 当前选中值
     */
    selected: {
      type: String,
      default: Data.def
    },
    /**
     * 是否以半小时为选择间隔
     * false，默认一小时为间隔
     */
    half: {
      type: Boolean,
      default: false
    },
    bizCode: {
      type: String,
      default: "def"
    }
  },
  data() {
    return {
      wrapper: "",
      discountColorMap: {},
      dots: [],
      timeDiscount: "",
      weeks: ['一', '二', '三', '四', '五', '六', '日'],
      ranges: ['00:00 - 06:00', '06:00 - 12:00', '12:00 - 18:00', '18:00 - 24:00'],
      multiple: false, // 以一小时算一格还是半小时算一格 1半小时，2一小时
      maxWidth: 0,
      rowNum: 0, // 一行有多少个格子
      columnNum: 0, // 一列有多少个格子
      headerHeight: 60, // 头部内容高度（+border1）
      boxHeight: 40, // 单个格子高度
      boxLength: 0, // 格子总数
      boxZones: [],
      // 选择区域遮罩浮层
      maskInfo: {
        show: false,
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        startRow: 0,
        endRow: 0,
        startColumn: 0,
        endColumn: 0,
        selectedZones: []
      },
      // 支持的折扣设置选项
      settingList: SettingList,
      // 选中区域设置浮层
      settingInfo: {
        show: false,
        week: '',
        time: '',
        discount: '',
        type: SettingList[0].value
      },
      // 鼠标hover提示浮层
      hoverInfo: {
        show: false,
        left: 0,
        top: 0,
        week: '',
        time: '',
        discount: ''
      },
      hoverTimeout: 0,
      hideTimeout: 0
    };
  },
  watch: {},
  mounted() {
    this.init()

    $(document.body).off('mousemove.duration');
    $(document.body).off('mouseup.duration');
    clearTimeout(this.hoverTimeout);
    clearTimeout(this.hideTimeout);

    this.render()
  },
  methods: {
    init() {
      let half = (/^true$/i).test(this.half),
        timeDiscount = this.selected || Data.none,
        gap = 24,
        columnNum = 7, // 一列有多少个格子
        multiple = half ? 2 : 1; // 倍数

      let colorMap = ColorMap[this.bizCode];
      let discountColorMap = {};
      for (let i = 0; i <= 250; i++) {
        discountColorMap[i] = '#ffffff';
        for (let k in colorMap) {
          let range = k.substring(1, k.length - 1).split(',');
          let rangeMin = range[0];
          let rangeMax = range[1];
          if (i >= rangeMin && i < rangeMax) {
            discountColorMap[i] = colorMap[k];
            break;
          }
        }
      }

      // 提示渐变点
      this.dots = [
        {
          text: '30-100%',
          value: discountColorMap[65]
        },
        {
          text: '100-200%',
          value: discountColorMap[150]
        },
        {
          text: '200-250%',
          value: discountColorMap[225]
        }
      ]

      // 单格宽度
      let boxWidth = +this.boxWidth;
      if (!boxWidth) {
        boxWidth = half ? 18 : 32;
      }
      let maxWidth = boxWidth * (25 * multiple);
      let rowNum = gap * multiple;
      let boxLength = rowNum * columnNum;

      this.discountColorMap = discountColorMap
      this.timeDiscount = timeDiscount
      this.multiple = multiple // 以一小时算一格还是半小时算一格 1半小时，2一小时
      this.maxWidth = maxWidth // 容器整体宽度
      this.rowNum = rowNum // 一行有多少个格子
      this.columnNum = columnNum // 一列有多少个格子
      this.boxWidth = boxWidth // 单个格子宽度
      this.boxLength = boxLength // 格子总数
      this.boxZones = this.getBoxzone(boxLength)
    },
    render() {
      let that = this
      let { timeDiscount, boxLength } = that;
      let array = that.report2Array(timeDiscount);
      let boxZones = []
      for (let i = 0; i < boxLength; i++) {
        let boxZone = that.setBoxDiscount(i, array[i]);
        boxZones.push(boxZone)
      }

      that.wrapper = $(`#${that.viewId}_duration`);
      that.boxZones = boxZones
    },
    /**
     * 提交格式转化为数组，半小时一格
     * 00:00-24:00:100;
     * 00:00-01:00:100,01:00-14:00:120,14:00-21:00:70,21:00-24:00:200;
     * 00:00-24:00:100......
     */
    report2Array(report) {
      let array = [];
      let that = this;
      let { rowNum, multiple } = that;

      let arr = report.split(';'); // ;分隔天的内容
      for (let i = 0, aLen = arr.length; i < aLen; i++) {
        let list = arr[i].split(','); // ,分隔一天内时段的内容
        for (let j = 0, lLen = list.length; j < lLen; j++) {
          if (list[j] === '0') { // 该日下全部不投放
            continue;
          }
          let darray = list[j].match(/(\d{2}):(\d{2})-(\d{2}):(\d{2}):(\d+)/);
          // for (let t = 1; t <= 5; t++) {
          //     darray[t] = parseInt(darray[t]);
          // }
          // 00:00-24:00:100
          // 分解成['00:00-24:00:100', '00', '00', '24', '00', '100']
          // i表示星期几，第几行
          let start = parseInt(darray[1]) * multiple + rowNum * i;
          if (darray[2] === '30') {
            start++;
          }
          let end = parseInt(darray[3]) * multiple + rowNum * i;
          if (darray[4] === '30') {
            end++;
          }

          let discount = parseInt(darray[5]);

          for (let index = start; index <= end - 1; index++) {
            array[index] = discount;
          }
        }
      }
      return array;
    },
    /**
     * 将时段设置成对应的折扣值及颜色
     */
    setBoxDiscount(index, discount) {
      let that = this;
      discount = parseInt(discount) || 0;

      let { discountColorMap } = that;

      return {
        index: index,
        bg: discountColorMap[discount],
        discount: discount
      }
    },

    // 时段选择
    select(downEvent) {
      downEvent.preventDefault();

      let that = this;
      let { hoverInfo, settingInfo, maskInfo, boxWidth, multiple, headerHeight } = this;
      hoverInfo.show = false;
      settingInfo.show = false;

      let wrapper = that.wrapper;
      let { left: wrapperLeft, top: wrapperTop } = wrapper.offset();
      let startX = downEvent.pageX - wrapperLeft;
      let startY = downEvent.pageY - wrapperTop;

      $(document.body).off('mousemove.duration')
        .on('mousemove.duration', function (moveEvent) {
          moveEvent.preventDefault();

          let diffX = moveEvent.pageX - wrapperLeft;
          let diffY = moveEvent.pageY - wrapperTop;
          let endX = Math.min(diffX, wrapper.outerWidth());
          let endY = Math.min(diffY, wrapper.outerHeight());

          let left = Math.max(boxWidth * multiple, Math.min(startX, endX)),
            top = Math.max(headerHeight, Math.min(startY, endY));
          maskInfo.left = left
          maskInfo.top = top + 1
          maskInfo.width = Math.max(startX, endX) - left
          maskInfo.height = Math.max(startY, endY) - top
          maskInfo.show = true
        });

      $(document.body).off('mouseup.duration')
        .on('mouseup.duration', function (upEvent) {
          if (!maskInfo.show) {
            return;
          }

          upEvent.preventDefault();
          $(document.body).off('mousemove.duration');

          that.selectEnd();
          $(document.body).off('mouseup.duration');
        });
    },

    selectEnd() {
      let that = this;
      let { maskInfo, headerHeight, boxHeight, boxWidth, multiple, columnNum, rowNum } = that;

      // 从0开始
      let row1 = parseInt((maskInfo.top - headerHeight) / boxHeight);
      let row2 = parseInt((maskInfo.height + maskInfo.top - headerHeight) / boxHeight);
      let column1 = parseInt((maskInfo.left - boxWidth * multiple) / boxWidth);
      let column2 = parseInt((maskInfo.width + maskInfo.left - boxWidth * multiple) / boxWidth);
      let startRow = Math.max(0, row1);
      let endRow = Math.min(columnNum - 1, row2);
      let startColumn = Math.max(0, column1);
      let endColumn = Math.min(rowNum - 1, column2);

      let selected = [];
      for (let i = startRow; i <= endRow; i++) {
        for (let j = startColumn; j <= endColumn; j++) {
          selected.push(i * rowNum + j);
        }
      }

      maskInfo.selectedZones = selected
      maskInfo.startRow = startRow
      maskInfo.endRow = endRow
      maskInfo.startColumn = startColumn
      maskInfo.endColumn = endColumn
      maskInfo.left = boxWidth * multiple + startColumn * boxWidth
      maskInfo.top = headerHeight + startRow * boxHeight + 1
      maskInfo.width = (endColumn - startColumn + 1) * boxWidth
      maskInfo.height = (endRow - startRow + 1) * boxHeight
      maskInfo.show = true

      that.showSetting();
    },

    // 选中情况下点击其他区域隐藏选中区域
    clickOutside(event, index) {
      let that = this;
      let { maskInfo } = that;
      if (!maskInfo.show ||
        (maskInfo.show && maskInfo.selectedZones.indexOf(index) > -1)) {
        return;
      }

      event.preventDefault();
      $(document.body).off('mousemove.duration');
      $(document.body).off('mouseup.duration');
      $(document.body).off('click.duration');
      that.cancelSetting();
    },

    submitSetting() {
      let that = this;
      let { settingList, settingInfo, maskInfo, boxZones } = that;
      let discount = 0;
      let valid = true;

      switch (+settingInfo.type) {
        case 1: // 自定义
          // valid = that.isValid();
          discount = settingInfo.discount;
          break;
        case 2: // 无折扣
          discount = 100;
          break;
        case 3: // 不投放
          discount = 0;
          break;
      }

      if (!valid) {
        return;
      }

      settingInfo.show = false;
      settingInfo.type = settingList[0].value;
      maskInfo.show = false;

      for (let i = 0; i < maskInfo.selectedZones.length; i++) {
        let index = maskInfo.selectedZones[i]
        boxZones[index] = that.setBoxDiscount(index, discount);
      }

      // TODO get Value
      console.log(this.val())
      // this.$emit('change', this.val())
    },

    cancelSetting() {
      let that = this;
      let { settingList, settingInfo, maskInfo } = that;

      maskInfo.show = false;
      settingInfo.show = false;
      settingInfo.type = settingList[0].value;
    },

    showSetting() {
      let that = this;
      let { settingInfo, maskInfo, boxZones } = that;

      let startWeek = maskInfo.startRow + 1;
      let endWeek = maskInfo.endRow + 1;

      let week;
      if (startWeek !== endWeek) {
        week = that.formatWeek(startWeek) + ' - ' + that.formatWeek(endWeek);
      } else {
        week = that.formatWeek(startWeek);
      }
      settingInfo.week = week;
      settingInfo.time = that.getDuration(maskInfo.startColumn, maskInfo.endColumn + 1, '%s - %s');

      let selectedZones = maskInfo.selectedZones;
      let lastDiscount;
      let isSame = true;
      for (let i = 0; i < selectedZones.length; i++) {
        let index = selectedZones[i];
        let tempDiscount = boxZones[index].discount;
        if (!tempDiscount || (lastDiscount && tempDiscount !== lastDiscount)) {
          isSame = false;
          break;
        }
        lastDiscount = tempDiscount;
      }
      settingInfo.discount = isSame ? lastDiscount : '';

      let settingInfoWidth = 260;
      let settingInfoHeight = 238;
      let wrapperWidth = that.wrapper.outerWidth();
      let wrapperHeight = that.wrapper.outerHeight();

      let left = (maskInfo.left + maskInfo.width / 2);
      if (left + settingInfoWidth > wrapperWidth) {
        left -= settingInfoWidth;
      }
      let top = (maskInfo.top + maskInfo.height / 2);
      if (top + settingInfoHeight > wrapperHeight + 100) {
        top -= settingInfoHeight;
      }

      settingInfo.left = left
      settingInfo.top = top
      settingInfo.show = true
    },

    /**
     * 鼠标hover时段tip
     */
    showTip(index) {
      let that = this;
      clearTimeout(that.hoverTimeout);
      clearTimeout(that.hideTimeout);
      let { maskInfo, settingInfo, boxWidth, boxHeight, headerHeight, rowNum, hoverInfo, boxZones } = that;
      if (maskInfo.show || settingInfo.show) {
        return;
      }

      that.hoverTimeout = setTimeout(() => {
        index = parseInt(index);

        let left = boxWidth + (index % rowNum + 1) * boxWidth;
        let top = headerHeight + (parseInt(index / rowNum) + 1) * boxHeight;
        let week = that.formatWeek(parseInt(index / rowNum) + 1);
        let time = that.getDuration(index, index + 1, '%s - %s');
        let discount = boxZones[index].discount;

        hoverInfo.left = left
        hoverInfo.top = top
        hoverInfo.week = week
        hoverInfo.time = time
        hoverInfo.discount = discount
        hoverInfo.show = true
      }, 200);
    },

    hideTip() {
      let that = this;
      clearTimeout(that.hoverTimeout);
      clearTimeout(that.hideTimeout);
      let { maskInfo, settingInfo, hoverInfo } = that;
      if (maskInfo.show || settingInfo.show) {
        return;
      }

      that.hideTimeout = setTimeout(() => {
        hoverInfo.show = false;
      }, 200)
    },

    /**
     * 重置
     */
    reset() {
      let that = this;
      let boxLength = that.boxLength;
      let boxZones = []
      for (let i = 0; i < boxLength; i++) {
        let boxZone = that.setBoxDiscount(i, 100);
        boxZones.push(boxZone)
      }
      that.boxZones = boxZones
    },

    /**
     * 清空
     */
    clear() {
      let that = this;
      let boxLength = that.boxLength;
      let boxZones = []
      for (let i = 0; i < boxLength; i++) {
        let boxZone = that.setBoxDiscount(i, 0);
        boxZones.push(boxZone)
      }
      that.boxZones = boxZones
    },

    array2Report(array) {
      let that = this;
      let { columnNum, rowNum, multiple } = that;

      let result = [];
      for (let row = 0; row < columnNum; row++) {
        result[row] = 0;
        let rowDatas = [];
        for (let column = 0; column < rowNum; column++) {
          let index = row * rowNum + column;
          let discount = array[index];
          if (!discount) {
            continue;
          }

          let last = rowDatas[rowDatas.length - 1];
          if (last && last.discount === discount && last.end === column) {
            last.end = column + 1;
          } else {
            rowDatas.push({
              start: column,
              end: column + 1,
              discount: discount
            })
          }
        }
        let rowStrs = rowDatas.map(r => {
          return that.getDuration(r.start, r.end) + ':' + r.discount;
        })
        if (rowStrs && rowStrs.length > 0) {
          result[row] = rowStrs.join(',');
        }
      }
      return result.join(';');
    },

    val() {
      let that = this;
      let { boxZones } = that;
      let discounts = boxZones.map(zone => {
        return zone.discount;
      })
      return that.array2Report(discounts);
    },

    /**
     * 包含校验
     */
    submit() {
      let val = this.val();
      if (val === Data.none) {
        return {
          ok: false
        }
      } else {
        return {
          ok: true,
          val: val
        }
      }
    },

    formatWeek(week) {
      return '星期' + ['日', '一', '二', '三', '四', '五', '六'][week % 7];
    },

    getDuration(start, end, format) {
      let rowNum = this.rowNum;
      let startStr = this.getTimeFromNum(start);
      let endStr = '';
      if (end % rowNum === 0) {
        endStr = '24:00';
      } else {
        endStr = this.getTimeFromNum(end);
      }
      let str = startStr + '-' + endStr;
      if (format) {
        str = format.replace('%s', startStr).replace('%s', endStr);
      }
      return str;
    },

    getTimeFromNum(num) {
      let that = this;
      let { rowNum, multiple } = that;
      let h = Math.floor((num % rowNum) / multiple);
      if ((h + '').length === 1) {
        h = '0' + h;
      }
      let m = ((num % rowNum) % multiple === 1) ? '30' : '00';
      return h + ':' + m;
    },

    getBoxzone(boxLength) {
      let boxzone = []; // 可选择范围
      for (let i = 0; i < boxLength; i++) {
        boxzone.push({
          index: i,
          bg: '#ffffff',
          discount: 0
        })
      }

      return boxzone;
    }
  }
};
</script>

<style lang="scss" scoped></style>
