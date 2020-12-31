<style>
.aaaa {
  width: 36px;
  height: 26px;
  min-height: 26px;
  min-width: 0;
}
</style>
<template>
  <div>
    <p>纯操作项，hover显示操作项当前选中项排在第一个</p>
    <div class="aaaa">
      <h-status
        :opers="opers"
        :selected.sync="selected"
        @change="change"
      />
    </div>

    <p>额外的提示信息 + 可操作项当有额外提示信息是，优先显示额外提示信息</p>
    <div class="aaaa">
      <h-status
        :opers="opers1"
        :selected.sync="selected1"
        :info="info"
        @change="change1"
      />
    </div>

    <p>confirm 提示</p>
    <div class="aaaa">
      <h-status
        :opers="opers2"
        :selected.sync="selected2"
        @change="change2"
      />
    </div>

    <p>纯提示信息，无操作项</p>
    <div class="aaaa">
      <h-status :info="tipInfo" />
    </div>
    <p>纯提示信息，无操作项 -- 自定义提示view</p>
    <div class="aaaa">
      <h-status :info="viewInfo" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: "9",
      selected1: "9",
      selected2: "9",
      opers: [
        {
          value: 0,
          text: '暂停投放',
          icon: '<i class="el-icon-platform-eleme"></i>',
          color: '#a40100'
        },
        {
          value: 1,
          text: '正在投放',
          icon: '<i class="el-icon-eleme"></i>',
          color: '#51a300'
        },
        {
          value: 9,
          text: '结束投放',
          icon: '<i class="el-icon-s-tools"></i>',
          color: '#999999'
        }
      ],
      opers1: [
        {
          value: 1,
          text: '正在投放',
          icon: '<i class="el-icon-eleme"></i>',
          color: '#51a300'
        },
        {
          value: 9,
          text: '结束投放',
          icon: '<i class="el-icon-s-tools"></i>',
          color: '#999999'
        }
      ],
      opers2: [
        {
          value: 0,
          text: '暂停投放',
          icon: '<i class="el-icon-platform-eleme"></i>',
          color: '#a40100'
        },
        {
          value: 9,
          text: '结束投放',
          confirmTitle: '系统提示',
          confirmContent: '确认结束投放吗？',
          icon: '<i class="el-icon-s-tools"></i>',
          color: '#999999'
        }
      ],
      info: {
        value: -99,
        text: '故障',
        icon: '<i class="el-icon-video-pause"></i>',
        color: '#a40100'
      },
      tipInfo: {
        value: 1,
        text: '正在投放',
        icon: '<i class="el-icon-eleme"></i>',
        tip: '当前正在投放中<br/>换一行',
        color: '#51a300'
      },
      viewInfo: {
        value: 1,
        text: '正在投放',
        icon: '<i class="el-icon-eleme"></i>',
        tipView: '@./tip',
        tipData: {
          tag: '预算过低',
          tip: '建议修改预算至10000（+15%），相比当前展现量+35%，点击量+20%'
        },
        color: '#51a300'
      }
    };
  },
  methods: {
    change(item) {
      this.selected = `${item.value}`
      console.log("======selected", this.selected)
    },
    change1(item) {
      this.selected1 = `${item.value}`
      console.log("======selected1", this.selected)
    },
    change2(item) {
      this.selected2 = `${item.value}`
      console.log("======selected2", this.selected)
    }
  }
};
</script>
