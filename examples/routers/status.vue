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
        :selected.sync="selected"
        :info="info"
        @change="change"
      />
    </div>

    <p>confirm 提示</p>
    <div class="aaaa">
      <h-status
        :opers="opers2"
        :selected.sync="selected"
        @change="change"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selected: "9",
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
      }
    };
  },
  methods: {
    change(item) {
      this.selected = `${item.value}`
      console.log(this.selected)
    }
  }
};
</script>
