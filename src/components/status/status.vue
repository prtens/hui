<template>
  <div
    class="hn-status"
    @mouseleave="out"
  >
    <div
      class="status-handle-icon"
      @mouseenter="over"
    >
      <template v-if="showInfo">
        <span
          v-html="info.icon"
          class="status-icon"
          :style="`color: ${info.color};`"
        ></span>
      </template>
      <template v-else>
        <span
          v-html="cur.icon"
          class="status-icon"
          :style="`color: ${cur.color};`"
        ></span>
      </template>

      <template v-if="opers.length > 0">
        <i class="status-arrow el-icon-caret-bottom"></i>
      </template>
    </div>

    <template v-if="show">
      <ul class="hn-output status-info">
        <template v-if="showInfo">
          <li class="status-desc clearfix">
            <span
              v-html="info.icon"
              class="status-icon"
              :style="`color: ${info.color}`"
            ></span>
            <span class="status-name">{{info.text}}</span>
          </li>
          <template v-if="info.tip">
            <li
              class="status-tip"
              v-html="info.tip"
            ></li>
          </template>
          <template v-if="info.tipView">
            <li class="status-tip">
              <div class="status-tip-tag">
                <h-effects-icon
                  type="warn"
                  :content="info.tipData.tag"
                />
              </div>
              <div>{{info.tipData.tip}}</div>
              <div>
                <a
                  href="javascript:;"
                  class="color-brand"
                >去优化&gt;</a>
              </div>
            </li>
          </template>
          <template v-if="opers.length > 0">
            <li class="status-line"></li>
          </template>
        </template>

        <li
          v-for="item of opers"
          :key="item.value"
          :class="`status-oper clearfix ${item.value == cur.value ? 'status-oper-cur' : ''}`"
          @click="select(item)"
        >
          <span
            v-html="item.icon"
            class="status-icon"
            :style="`color: ${item.color}`"
          ></span>
          <span class="status-name">{{item.text}}</span>
          <i class="el-icon-check oper-icon"></i>
        </li>
      </ul>
    </template>
  </div>
</template>

<script type="text/babel">
import HEffectsIcon from "../effects-icon"

export default {
  name: "HStatus",
  components: {
    HEffectsIcon
  },
  props: {
    opers: {
      type: Array,
      default() {
        return []
      }
    },
    selected: {
      type: String,
      default: ''
    },
    info: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      showInfo: false,
      cur: {},
      show: false
    }
  },
  computed: {
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let that = this;
      let { opers, selected, info } = that;

      // 当前项在最前面
      let cur = {};
      if (opers.length > 0) {
        for (var i = 0; i < opers.length; i++) {
          if (opers[i].value === +selected) {
            cur = opers[i];
            opers.splice(i, 1);
            break;
          }
        }
        opers.unshift(cur);
      }
      that.cur = cur

      // 提示信息
      let showInfo = false;
      if (Object.keys(info).length > 0) {
        showInfo = true;
      }
      that.showInfo = showInfo
    },
    out() {
      this.show = false
    },
    over() {
      this.show = true
    },
    select(item) {
      let that = this;
      let cur = that.cur;
      if (cur.value === item.value) {
        return;
      }

      let enterCallback = () => {
        that.out()
        that.cur = item
        that.$emit("change", item)
      }

      if (item.confirmTitle && item.confirmContent) {
        that.$confirm(item.confirmContent, item.confirmTitle, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          enterCallback();
        }).catch(() => {
          console.log("已取消操作")
        });
      } else {
        enterCallback();
      }
    }
  }
};
</script>

<style scoped></style>
