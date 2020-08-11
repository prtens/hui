<template>
  <div
    class="hn-time-step-discount"
    :style="{width: `${maxWidth}px`}"
  >
    <div class="feedsn-cP">
      <!--移动弹窗-->
      <div
        v-show="hoverInfo.show"
        :style="{top: `${hoverInfo.top}px`, left: `${hoverInfo.left}px`}"
        class="feedsn-cR mx-shadow"
      >
        <div class="mb5">{{ hoverInfo.week }}</div>
        <div class="mb5">
          <strong>{{ hoverInfo.time }}</strong>
        </div>
        <div>
          <strong>{{ hoverInfo.discount }}</strong>%折扣
        </div>
      </div>
      <!--选中块-->
      <div
        v-show="maskInfo.show"
        :style="{top: `${maskInfo.top}px`, left: `${maskInfo.left}px`, width: `${maskInfo.width}px`, height: `${maskInfo.height}px`}"
        class="feedsn-cQ"
      ></div>
      <!--选中弹窗-->
      <div
        v-show="settingInfo.show"
        :style="{top: `${settingInfo.top}px`, left: `${settingInfo.left}px`}"
        class="feedsn-cS mx-shadow"
      >
        <div class="feedsn-cT">
          <div class="mb10">
            <span>{{ settingInfo.week }}</span>：<strong class="ml5">{{ settingInfo.time }}</strong>
          </div>
          <div class="mb5">
            <el-radio-group
              v-model="settingInfo.type"
              @change="changeSettingType"
            >
              <el-row class="mb20">
                <el-radio
                  :label="1"
                  style="margin-right: 5px"
                >自定义:</el-radio>
                <el-input-number
                  controls-position="right"
                  :min="30"
                  :max="250"
                  label="请输入内容"
                  :disabled="settingInfo.disabled"
                  v-model="settingInfo.discount"
                >
                </el-input-number>
              </el-row>
              <el-row class="mb20">
                <el-radio :label="2">无折扣</el-radio>
              </el-row>
              <el-row class="mb20">
                <el-radio :label="3">不投放</el-radio>
              </el-row>
            </el-radio-group>
          </div>
        </div>
        <div class="feedsn-cU">
          <el-button
            type="primary"
            @click="submitSetting"
          >确定</el-button>
          <el-button
            type="primary"
            plain
            @click="cancelSetting"
          >取消</el-button>
        </div>
      </div>

      <!--时段块-->
      <el-row
        class="feedsn-cF"
        :id="`${viewId}_duration`"
        :style="{width: `${maxWidth}px`}"
      >
        <ul
          class="feedsn-cG fl"
          :style="{width: `${boxWidth * multiple}px`}"
        >
          <li
            class="feedsn-cH"
            :style="{height: `${headerHeight + 1}px`, lineHeight: `${headerHeight}px`}"
          >星期</li>
          <li
            class="feedsn-cH"
            :style="{height: `${boxHeight}px`, lineHeight: `${boxHeight}px`}"
            v-for="(week, key) in weeks"
            :key="key"
          >{{ week }}
          </li>
        </ul>
        <div
          class="feedsn-cI fl"
          :style="{width: `${boxWidth * rowNum - 2}px`}"
        >
          <ul class="feedsn-cJ">
            <li
              class="feedsn-cK"
              :style="{width: `${boxWidth * (rowNum / 4) - 1.5}px`, height: `${headerHeight / 2}px`, lineHeight: `${headerHeight / 2}px`}"
              v-for="(range, key) in ranges"
              :key="key"
            >{{ range }}
            </li>
          </ul>
          <ul class="feedsn-cL">
            <li
              class="feedsn-cM"
              :style="{width: `${boxWidth * multiple - 1.1}px`, height: `${headerHeight / 2}px`, lineHeight: `${headerHeight / 2}px`}"
              v-for="(C, key) in 24"
              :key="C"
            >{{ key }}
            </li>
          </ul>
          <ul class="feedsn-cN">
            <li
              :id="viewId"
              class="feedsn-cO fl"
              :style="{width: `${boxWidth - 1.1}px`, height: `${boxHeight}px`, backgroundColor: `${boxZone.bg}`}"
              v-for="(boxZone, key) of boxZones"
              :key="key"
              @click="clickOutside(key)"
              @mousedown="select($event, key)"
              @mouseover="showTip(key)"
              @mouseout="hideTip(key)"
            ></li>
          </ul>
        </div>
      </el-row>
    </div>
    <!--清空、重置 等提示信息-->
    <el-row
      :gutter="20"
      class="reset-empty"
    >
      <el-col :span="10">
        <el-button
          type="primary"
          plain
          @click="clear"
        >清空</el-button>
        <el-button
          type="primary"
          plain
          @click="reset"
        >重置</el-button>
      </el-col>
      <el-col
        :span="14"
        class="notify"
      >
        <span
          class="ce"
          style="background-color: rgba(97,199,242,0.7)"
        ></span>
        <span class="color-c">30-100%</span>
        <span
          class="ce"
          style="background-color: rgba(77,166,255,0.7)"
        ></span>
        <span class="color-c">100-200%</span>
        <span
          class="ce"
          style="background-color: rgba(134,115,230,0.7)"
        ></span>
        <span class="color-c">200-250%</span>
        <i class="fa fa-bell-o"></i>
        <span>可以拖拽鼠标选择投放时段</span>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/babel">
import { formatWeek, discountArray2Report, report2Array, getDuration } from '../../utils/discount'

export default {
  name: "TimeStepDiscount",
  props: {
    item: {
      type: Object,
      require: true
    },
    query: {
      type: Object,
      default() {
        return {}
      }
    },
    viewId: {
      type: String,
      default: 'hn-time-step-discount'
    },
    multiple: {
      type: Number,
      default: 1
    },
    maxWidth: {
      type: Number,
      default: 850
    }
  },
  data() {
    return {
      wrapper: `${this.viewId}_duration`,
      weeks: ['一', '二', '三', '四', '五', '六', '日'],
      ranges: ['00:00 - 06:00', '06:00 - 12:00', '12:00 - 18:00', '18:00 - 24:00'],
      rowNum: 0,
      columnNum: 7,
      headerHeight: 60,
      boxWidth: 0,
      boxHeight: 41,
      boxLength: 0,
      boxZones: [],
      hoverTimeout: 0,
      hideTimeout: 0,
      maskInfo: {
        show: !1,
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
      settingInfo: { show: !1, week: '', time: '', discount: '', type: 1, disabled: false },
      hoverInfo: { show: !1, left: 0, top: 0, week: '', time: '', discount: '' },
      template: {
        closeShow: false,
        show: false,
        name: ''
      }
    };
  },
  watch: {
    item: {
      handler(val, oldVal) {
        this.initialCommon()
        this.initial(val)
      }
    },
    boxZones: {
      handler(val, oldVal) {
        let e = val.map(function (e) {
          return e.discount
        })
        let t = discountArray2Report(this.columnNum, this.rowNum, this.multiple, e)
        this.$emit('transformPeriod', t)
      },
      deep: true
    },
    'template.name': {
      handler(val, oldVal) {
        this.$emit('changeTemplateName', {
          name: val,
          type: 'launchPeriod'
        })
      }
    }
  },
  mounted() {
    this.initialCommon()
    this.initial(this.item)
  },
  methods: {
    initialCommon() {
      this.rowNum = 24 * this.multiple
      this.boxWidth = this.maxWidth / (25 * this.multiple)
      this.boxLength = 7 * this.rowNum

      let t = []
      for (let s = 0; s < this.boxLength; s++) {
        t.push({ index: s, bg: 'rgba(97,199,242,0.4)', discount: 100 })
      }
      this.boxZones = t
    },
    initial(row) {
      if (!row.id) {
        if (this.query.campaignId === undefined) {
          this.template = {
            closeShow: true,
            show: false,
            name: ''
          }
        } else {
          this.template = {
            closeShow: true,
            show: false,
            name: ''
          }
        }
      } else {
        this.template = {
          closeShow: false,
          show: true,
          name: row.name
        }
      }

      // 问题 第一次mounted 的时候  row 还没初始化完 会报错
      if (row.model !== undefined && row.model.length !== 0) {
        for (let e = this, t = row.model, s = e.boxLength, o = report2Array(this.rowNum, this.multiple, t), r = 0; r < s; r++) this.setBoxDiscount(r, o[r])
      }
    },
    clickOutside(index) {
      let t = +index
      let s = this.maskInfo
      !s.show || (s.show && s.selectedZones.indexOf(t) > -1) || this.cancelSetting()
    },
    select(e) {
      e.preventDefault()
      const _this = this
      let hoverInfo = _this.hoverInfo
      let settingInfo = _this.settingInfo
      let maskInfo = _this.maskInfo
      let boxWidth = _this.boxWidth
      let multiple = _this.multiple
      let headerHeight = _this.headerHeight
      let boxHeight = _this.boxHeight
      let columnNum = _this.columnNum
      let rowNum = _this.rowNum

      hoverInfo.show = !1
      settingInfo.show = !1
      let el = document.getElementById(_this.wrapper)
      let l = el.offsetLeft
      let f = el.offsetTop
      let u = e.layerX - l
      let p = e.layerY - f

      el.onmousemove = (e) => {
        // 鼠标移动
        e.preventDefault()
        let s = e.layerX - l
        let h = e.layerY - f
        let g = Math.min(s, el.offsetWidth)
        let m = Math.min(h, el.offsetHeight)
        let b = Math.max(boxWidth * multiple, Math.min(u, g))
        let v = Math.max(headerHeight, Math.min(p, m))

        maskInfo.left = b
        maskInfo.top = v + 1
        maskInfo.width = Math.max(u, g) - b
        maskInfo.height = Math.max(p, m) - v
        maskInfo.show = !0
      }
      document.onmouseup = function (e, eThis = _this) {
        // 松开鼠标
        if (maskInfo.show) {
          e.preventDefault()

          let c = parseInt((maskInfo.top - headerHeight) / boxHeight)
          let l = parseInt((maskInfo.height + maskInfo.top - headerHeight) / boxHeight)
          let f = parseInt((maskInfo.left - boxWidth * multiple) / boxWidth)
          let u = parseInt((maskInfo.width + maskInfo.left - boxWidth * multiple) / boxWidth)
          let p = Math.max(0, c)
          let h = Math.min(columnNum - 1, l)
          let g = Math.max(0, f)
          let m = Math.min(rowNum - 1, u)

          let b = []
          for (let v = p; v <= h; v++) for (let x = g; x <= m; x++) b.push(v * rowNum + x)
          maskInfo.selectedZones = b
          maskInfo.startRow = p
          maskInfo.endRow = h
          maskInfo.startColumn = g
          maskInfo.endColumn = m
          maskInfo.left = boxWidth * multiple + g * boxWidth
          maskInfo.top = headerHeight + p * boxHeight + 1 + p * 1
          maskInfo.width = (m - g + 1) * boxWidth
          maskInfo.height = (h - p + 1) * (boxHeight + 1)
          maskInfo.show = !0

          // 选中弹窗 settingInfo
          eThis.showSetting()

          el.onmousemove = null
          document.onmouseup = null
        }
      }
    },
    showSetting() {
      let e = ''
      let s = this.settingInfo
      let o = this.maskInfo
      let r = this.boxZones
      let n = o.startRow
      let i = o.endRow
      if (n !== i) {
        e = formatWeek(n) + ' - ' + formatWeek(i)
      } else {
        e = formatWeek(n)
      }
      s.week = e
      s.time = getDuration(this.rowNum, this.multiple, o.startColumn, o.endColumn + 1, '%s - %s')

      let a
      let d = o.selectedZones
      let c = !0
      for (let l = 0; l < d.length; l++) {
        let f = r[d[l]].discount
        if (!f || (a && f !== a)) {
          c = !1
          break
        }
        a = f
      }

      s.discount = c ? a : ''
      let u = document.getElementById(this.wrapper).offsetWidth
      let p = document.getElementById(this.wrapper).offsetHeight
      let h = o.left + o.width / 2
      h + 260 > u && (h -= 260)
      let g = o.top + o.height / 2
      g + 238 > p + 100 && (g -= 238)
      s.left = h
      s.top = g
      s.show = !0
      s.type = 1
      s.disabled = false
    },
    showTip(index) {
      clearTimeout(this.hoverTimeout)
      clearTimeout(this.hideTimeout)
      if (!this.maskInfo.show && !this.settingInfo.show) {
        this.hoverTimeout = setTimeout(() => {
          let o = parseInt(index)
          let r = this.boxWidth + (o % this.rowNum + 1) * this.boxWidth
          let f = this.headerHeight + (parseInt(o / this.rowNum) + 1) * this.boxHeight
          let u = formatWeek(parseInt(o / this.rowNum))
          let p = getDuration(this.rowNum, this.multiple, o, o + 1, '%s - %s')
          let h = this.boxZones[o].discount
          this.hoverInfo = {
            left: r,
            top: f,
            week: u,
            time: p,
            discount: h,
            show: !0
          }
        }, 200)
      }
    },
    hideTip(index) {
      clearTimeout(this.hoverTimeout)
      clearTimeout(this.hideTimeout)
      this.hideTimeout = setTimeout(() => {
        this.hoverInfo.show = !1
      }, 200)
    },
    clear() {
      for (let t = this.boxLength, s = 0; s < t; s++) this.setBoxDiscount(s, 0)
    },
    reset() {
      for (let t = this.boxLength, s = 0; s < t; s++) this.setBoxDiscount(s, 100)
    },
    changeSettingType(val) {
      let disable = false
      if (val !== 1) {
        disable = true
      }
      this.settingInfo.disabled = disable
    },
    submitSetting() {
      let t = this.settingInfo
      let s = this.maskInfo
      let o = 0
      let r = !0

      switch (+t.type) {
        case 1:
          r = true
          o = t.discount
          break
        case 2:
          o = 100
          break
        case 3:
          o = 0
      }
      if (r) {
        t.show = !1
        t.type = 1
        s.show = !1
        s.show = !1
        for (let n = 0; n < s.selectedZones.length; n++) this.setBoxDiscount(s.selectedZones[n], o)
      }
    },
    cancelSetting() {
      let t = this.settingInfo
      let s = this.maskInfo
      s.show = !1
      t.show = !1
      t.type = 1
      t.disabled = false
    },
    setBoxDiscount(e, t) {
      t = parseInt(t) || 0
      let s = this.getColorMap()[t]
      let o = this.boxZones
      o[e].bg = s
      o[e].discount = t
    },
    getColorMap() {
      let t = {
        '[0,1)': '#ffffff',
        '[30,40)': 'rgba(97,199,242,0.05)',
        '[40,50)': 'rgba(97,199,242,0.1)',
        '[50,60)': 'rgba(97,199,242,0.15)',
        '[60,70)': 'rgba(97,199,242,0.2)',
        '[70,80)': 'rgba(97,199,242,0.25)',
        '[80,90)': 'rgba(97,199,242,0.3)',
        '[90,100)': 'rgba(97,199,242,0.35)',
        '[100,101)': 'rgba(97,199,242,0.4)',
        '[101,110)': 'rgba(77,166,255,0.15)',
        '[110,120)': 'rgba(77,166,255,0.2)',
        '[120,130)': 'rgba(77,166,255,0.25)',
        '[130,140)': 'rgba(77,166,255,0.3)',
        '[140,150)': 'rgba(77,166,255,0.35)',
        '[150,160)': 'rgba(77,166,255,0.4)',
        '[160,170)': 'rgba(77,166,255,0.45)',
        '[170,180)': 'rgba(77,166,255,0.5)',
        '[180,190)': 'rgba(77,166,255,0.55)',
        '[190,200)': 'rgba(77,166,255,0.6)',
        '[200,210)': 'rgba(134,115,230,0.3)',
        '[210,220)': 'rgba(134,115,230,0.35)',
        '[220,230)': 'rgba(134,115,230,0.4)',
        '[230,240)': 'rgba(134,115,230,0.45)',
        '[240,250)': 'rgba(134,115,230,0.5)',
        '[250,251)': 'rgba(134,115,230,0.55)'
      }
      let s = []

      for (let o = 0; o <= 250; o++) {
        for (let r in t) {
          let n = r.substring(1, r.length - 1).split(',')
          let i = n[0]
          let a = n[1]
          if (o >= i && o < a) {
            s[o] = t[r]
            break
          } else {
            s[o] = '#ffffff'
          }
        }
      }
      return s
    },
    handleConfirm() {
      this.$emit('saveTemplate', 'launchPeriod')
    }
  }
};
</script>
