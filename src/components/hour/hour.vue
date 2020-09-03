<template>
  <div class="hn-hour">
    <div class="period">

      <!-- 每日分隔是才有该功能 -->
      <div v-if="periods.length === 7">
        <span class="color-9 mr10">快捷操作：</span>
        <el-radio-group
          v-model="type"
          @change="changeType"
        >
          <el-radio
            v-for="(t, index) of types"
            :label="t.value"
            :key="index"
          >
            {{ t.text }}
          </el-radio>
        </el-radio-group>
      </div>

      <ul
        class="hours clearfix"
        v-for="(p,pIndex) of periods"
        :key="pIndex"
      >
        <li class="all">
          <span class="all-tip">时间段</span>
          <a
            href="javascript:;"
            :class="`btn btn-small all-btn ${p.selected ? 'btn-primary' : ''}`"
            @click="toggleAll({pIndex: pIndex})"
          >{{p.name}}</a>
        </li>
        <li
          v-for="(h,hIndex) of p.hours"
          :key="hIndex"
          :class="`hour ${h.milestone ? 'milestone' : ''} ${h.selected ? 'selected' : ''}`"
          :data-period="pIndex"
          :data-hour="h.index"
          @mousedown="drag($event)"
        >
          <div class="hour-inner"></div>
          <div
            :class="`line-start ${!h.firstSelected ? 'hide' : ''}`"
            :style="{'z-index': `${h.zIndex}`}"
          >
            <span class="line-info">{{h.index}}</span>
          </div>
          <div
            :class="`line-end ${!h.endSelected ? 'hide' : ''}`"
            :style="{'z-index': `${h.zIndex}`}"
          >
            <span class="line-info">{{h.indexNext}}</span>
          </div>
          <div class="hour-line">
            <span class="hour-info">{{h.index}}</span>
          </div>
        </li>
        <li class="hour milestone hour-last">
          <span class="hour-line">
            <span class="hour-info">24</span>
          </span>
        </li>
      </ul>
    </div>

    <div class="clearfix opers-wrapper">
      <a
        href="javascript:;"
        class="btn btn-small clear-btn"
        @click="clearAll"
      >
        清空
      </a>
      <span class="fr oper-tip">{{tip}}</span>
    </div>
  </div>
</template>

<script type="text/babel">
import $ from "jquery";

const WeekMap = {
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
  7: '周日'
}

export default {
  name: "Hour",
  props: {
    // 历史可配置参数simple
    // 1. true：极简模式，默认只区分工作日和双休日
    // 2. false：每日单独设置
    simple: {
      type: Boolean,
      default: true
    },
    groups: {
      type: Array,
      default() {
        return [12345, 67];
      }
    },
    selected: {
      type: Array,
      default() {
        return [];
      }
    },
    tip: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      periods: [],
      type: [],
      types: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let that = this;

      let selected = that.selected;

      let simple = (that.simple + '' !== 'false'),
        groups = that.groups; // 分组信息
      if (!groups || !groups.length) {
        groups = simple ? [12345, 67] : [1, 2, 3, 4, 5, 6, 7]
      }

      // 所有选中的日期
      let map = {};
      selected.forEach(item => {
        // 支持合并配置，具体计算是展开成单日
        let weeks = (item.week + '').split('');
        weeks.forEach(week => {
          map[week] = (item.times || []).map(time => {
            return time + '';
          });
        })
      })

      let getHours = () => {
        let hours = [];
        for (var i = 0; i < 24; i++) {
          hours.push({
            'index': i,
            'indexNext': (i + 1),
            'milestone': (i % 6 === 0),
            'zIndex': (i + 10) // fix样式
          })
        }
        return hours;
      }

      let periods = [];
      if ($.isPlainObject(groups[0])) {
        // groups = [{
        //     text,
        //     value
        // }]
        periods = groups.map((g, index) => {
          // 多天合并的，取一天即可
          let weeks = (g.value + '').split('');
          let times = map[weeks[0]] || [];
          let hours = getHours();
          hours.forEach(h => {
            h.selected = (times.indexOf(h.index + '') > -1);
          })
          return {
            name: g.text,
            hours,
            weeks
          };
        });
      } else {
        periods = groups.map((weeks, index) => {
          // 多天合并的，取一天即可
          weeks = (weeks + '').split('');
          let times = map[weeks[0]] || [];
          let hours = getHours();
          hours.forEach(h => {
            h.selected = (times.indexOf(h.index + '') > -1);
          })
          return {
            name: (weeks.length > 1) ? `${WeekMap[weeks[0]]}至${WeekMap[weeks[weeks.length - 1]]}` : WeekMap[weeks[0]],
            hours,
            weeks
          };
        });
      }

      // 拆分成单日选择时的批量操作功能
      let types = [
        {
          text: '全日程',
          value: '1234567'
        }, {
          text: '工作日',
          value: '12345'
        }, {
          text: '双休日',
          value: '67'
        }
      ]
      let type = '';
      for (let i = 0; i < types.length; i++) {
        let t = types[i];
        let weeks = (t.value + '').split('');
        let all = true;
        weeks.forEach(week => {
          all = all && ((map[week] || []).length === 24);
        })

        if (all) {
          type = types[i].value;
          break;
        }
      }

      that.periods = that.sync(periods)
      that.type = type
      that.types = types
    },

    sync(periods) {
      periods.forEach(p => {
        let hours = p.hours;
        let allSelected = true;
        for (let i = 0; i < hours.length; i++) {
          let h = hours[i];
          let prev = hours[i - 1],
            next = hours[i + 1];

          h.firstSelected = false;
          h.endSelected = false;
          if (h.selected) {
            if ((prev && !prev.selected) || !prev) {
              h.firstSelected = true;
            }
            if ((next && !next.selected) || !next) {
              h.endSelected = true;
            }
          }
          allSelected = allSelected && h.selected;
        }
        p.selected = allSelected;
      })
      return periods;
    },

    toggleAll(event) {
      let that = this
      let periods = that.periods;
      let { pIndex } = event
      let period = periods[pIndex];
      let allSelected = !period.selected;
      period.hours.forEach(h => {
        h.selected = allSelected;
      })

      that.periods = this.sync(periods)
      that.fire();
    },

    clearAll() {
      let periods = this.periods;
      periods.forEach(p => {
        p.hours.forEach(h => {
          h.selected = false;
        })
      })
      this.periods = this.sync(periods)
      this.fire();
    },

    fire() {
      let that = this;
      let selected = that.val();
      let values = selected.map(item => item.id);

      this.$emit("on-change", selected, values);
    },

    /**
     * 拖动选择，第一个是什么状态，则所有选中标签都是什么状态
     */
    drag(event) {
      let that = this;
      let periods = that.periods;
      let target = $(event.currentTarget);
      let pIndex = target.data('period'),
        hourIndex = target.data('hour');

      let selected = !periods[pIndex].hours[hourIndex].selected;
      that.toggle(pIndex, hourIndex, selected);

      let parent = target.parent('.hours');
      let siblings = parent.find('[data-hour]');

      siblings.on('mouseenter.drag', (dragStartEvent) => {
        dragStartEvent.preventDefault();
        let t = $(dragStartEvent.currentTarget);
        that.toggle(t.data('period'), t.data('hour'), selected);
      })

      $(document.body).off('mouseup.drag').on('mouseup.drag', (dragEndEvent) => {
        siblings.off('mouseenter.drag');
        that.fire();
      })

      event.preventDefault();
      return false;
    },

    toggle(pIndex, hourIndex, selected) {
      let periods = this.periods;
      periods[pIndex].hours[hourIndex].selected = selected;
      this.periods = this.sync(periods)
    },

    /**
     * 每日单独选择时有的批量功能
     */
    changeType() {
      let that = this;
      let value = that.type;
      let periods = that.periods;
      let weeks = (value + '').split('');
      periods.forEach(p => {
        p.hours.forEach(h => {
          h.selected = (weeks.indexOf(p.weeks + '') > -1);
        })
      })

      that.periods = that.sync(periods)
      that.fire();
    },

    val() {
      let periods = this.periods;
      let results = [];
      periods.forEach(p => {
        let times = [];
        p.hours.forEach(h => {
          if (h.selected) {
            times.push(h.index);
          }
        })
        p.weeks.forEach(week => {
          results.push({
            week,
            name: WeekMap[week],
            times
          })
        })
      })
      return results;
    }
  }
};
</script>
