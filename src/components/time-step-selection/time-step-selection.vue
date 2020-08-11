<template>
  <div class="hn-time-setp-picker">
    <div class="hn-time-setp-picker__content">
      <ul
        class="hn-time-setp-picker__items"
        v-for="(item, k) of periods"
        :key="k"
      >
        <li class="hn-time-setp-picker__item">
          <span>时间段</span>
          <a
            href="javascript:;"
            class="btn btn-small"
            :class="item.selected ? 'btn-primary' : ''"
            @click="toggleAll({ pIndex: k })"
          >{{ item.name }}</a>
        </li>

        <li
          v-for="(hour, hk) of item.hours"
          :key="hk"
          class="hn-time-setp-picker__item"
          :class="getClass(hour)"
          :data-period="k"
          :data-hour="hour.index"
          @mousedown="drag($event)"
        >
          <div class="block"></div>
          <div
            class="line-select"
            :class="hour.firstSelected ? '' : 'hide'"
            :style="`z-index: ${hour.zIndex};`"
          >
            <span class="line-top-number">{{ hour.index }}</span>
          </div>
          <div
            class="line-select1"
            :class="hour.endSelected ? '' : 'hide'"
            :style="`z-index: ${hour.zIndex};`"
          >
            <span class="line-top-number">{{ hour.indexNext }}</span>
          </div>
          <div class="line-select-not">
            <span class="line-top-number-not">{{ hour.index }}</span>
          </div>
        </li>

        <li class="hn-time-setp-picker__item milestone">
          <span class="line-select-not"><span class="line-top-number-not">24</span></span>
        </li>
      </ul>
    </div>
    <div class="hn-time-setp-picker__footer">
      <a
        href="javascript:;"
        class="btn btn-primary btn-small"
        @click="add"
      >保存为模板</a>
      <a
        @click="clearAll"
        href="javascript:;"
        class="btn btn-small clear"
      >清空</a>
      <span class="fr reminder">蓝色为已选投放时段</span>
    </div>
  </div>
</template>

<script type="text/babel">
import $ from "jquery";
import { converse, reverse } from "../../utils/timeStep";

var a = {
  1: "周一",
  2: "周二",
  3: "周三",
  4: "周四",
  5: "周五",
  6: "周六",
  7: "周日"
};

export default {
  name: "TimeStepSelection",
  props: {
    tmp: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      periods: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    getClass(t) {
      var Class = "";
      if (t.milestone) {
        Class += " milestone ";
      }

      if (t.selected) {
        Class += " select-block ";
      }
      return Class;
    },
    init() {
      var t = converse(this.tmp);
      var h = [12345, 67];
      var i = {};
      t.forEach(function (r) {
        (r.week + "").split("").forEach(function (e) {
          i[e] = (r.times || []).map(function (r) {
            return r + "";
          });
        });
      });

      var n = function () {
        for (var r = [], e = 0; e < 24; e++) {
          r.push({
            index: e,
            indexNext: e + 1,
            milestone: e % 6 === 0,
            zIndex: e + 10
          });
        }
        return r;
      };

      var o = h.map(function (r, e) {
        r = (r + "").split("");
        var s = i[r[0]] || [];
        var t = n();
        return (
          t.forEach(function (r) {
            r.selected = s.indexOf(r.index + "") > -1;
          }),
          {
            name: r.length > 1 ? a[r[0]] + "至" + a[r[r.length - 1]] : a[r[0]],
            hours: t,
            weeks: r
          }
        );
      });

      var ttt = this.sync(o);
      this.periods = ttt;
    },
    sync(r) {
      return (
        r.forEach(function (r) {
          for (var e = r.hours, s = !0, t = 0; t < e.length; t++) {
            var c = e[t],
              d = e[t - 1],
              a = e[t + 1];
            (c.firstSelected = !1),
              (c.endSelected = !1),
              c.selected &&
              (((d && !d.selected) || !d) && (c.firstSelected = !0),
                ((a && !a.selected) || !a) && (c.endSelected = !0)),
              (s = s && c.selected);
          }
          r.selected = s;
        }),
        r
      );
    },
    toggleAll(r) {
      var e = this.periods;
      var s = e[r.pIndex];
      var t = !s.selected;
      s.hours.forEach(function (r) {
        r.selected = t;
      });

      this.sync(e);
    },
    drag(r) {
      var e = this,
        s = e.periods,
        t = $(r.currentTarget),
        d = t.data("period"),
        a = t.data("hour"),
        h = !s[d].hours[a].selected;
      e.toggle(d, a, h);
      var i = t.parent(".hn-time-setp-picker__items").find("[data-hour]");
      return (
        i.on("mouseenter.drag", function (r) {
          r.preventDefault();
          var s = $(r.currentTarget);
          e.toggle(s.data("period"), s.data("hour"), h);
        }),
        $(document.body)
          .off("mouseup.drag")
          .on("mouseup.drag", function (r) {
            i.off("mouseenter.drag");
          }),
        r.preventDefault()
      );
      return false;

      var e = this,
        s = e.periods,
        d = r.currentTarget.getAttribute("data-period"),
        a = r.currentTarget.getAttribute("data-hour"),
        h = !s[d].hours[a].selected;

      e.toggle(d, a, h);

      var i = r.currentTarget.parentElement.querySelectorAll("[data-hour]");
      for (var s = 0; s < i.length; s++) {
        var aaa = i[s];
        aaa.onmouseenter = function (r) {
          console.log("进入");
          r.preventDefault();
          r.cancelBubble = false;
          var s = r.currentTarget;
          e.toggle(
            s.getAttribute("data-period"),
            s.getAttribute("data-hour"),
            h
          );
        };
        aaa.onmouseup = function (r, that = aaa) {
          console.log("松开");
          // console.log(that.onmouseenter)
          r.preventDefault();
          that.onmouseenter = null;
          that.onmouseup = null;
        };
      }
    },
    toggle(r, e, s) {
      var t = this.periods;
      t[r].hours[e].selected = s;
      this.periods = this.sync(t);
    },
    clearAll() {
      var e = this.periods;
      e.forEach(function (r) {
        r.hours.forEach(function (r) {
          r.selected = !1;
        });
      });
      this.periods = this.sync(e);
    },
    __l: function () {
      var e = this.val();
      this.tmpPeriods = e;
    },
    val: function () {
      var r = this.periods;
      var e = [];
      return (
        r.forEach(function (r) {
          var s = [];
          r.hours.forEach(function (r) {
            r.selected && s.push(r.index);
          }),
            r.weeks.forEach(function (r) {
              e.push({
                week: r,
                name: a[r],
                times: s
              });
            });
        }),
        e
      );
    },
    add() {
      this.__l();
      // console.log(this.periods)
      var data = reverse(this.tmpPeriods);
      console.log(data);
    }
  }
};
</script>
