<template>
  <div>
    <p>排序/分组</p>
    <h-indics
      :parents="tmp.parents"
      :fields="tmp.fields"
      :defaults="tmp.defaults"
      :custom.sync="tmp.custom"
      :customs="tmp.customs"
      :sortable="tmp.sortable"
      @changeSelected="changeSelected"
    ></h-indics>

    <p>不限制/不排序</p>
    <h-indics
      :fields="tmp1.fields"
      :defaults="tmp1.defaults"
      :custom.sync="tmp1.custom"
      :tip="tmp1.tip"
      @changeSelected="changeSelected"
    ></h-indics>

    <p>不限制/排序</p>
    <h-indics
      :parents="tmp2.parents"
      :fields="tmp2.fields"
      :defaults="tmp2.defaults"
      :custom.sync="tmp2.custom"
      :customs="tmp2.customs"
      :sortable="tmp2.sortable"
      @changeSelected="changeSelected"
    ></h-indics>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tmp: {
        parents: [
          {
            value: 1, text: '组1'
          },
          {
            value: 2, text: '组2'
          }
        ],
        fields: [
          {
            value: 1, text: '消耗', pValue: 1, tip: '消耗提示文案'
          },
          {
            value: 2, text: '展现量', pValue: 1
          },
          {
            value: 3, text: '点击量', pValue: 1
          },
          {
            value: 4, text: '点击率', pValue: 1
          },
          {
            value: 5, text: '平均点击单价', pValue: 1, tip: '平均点击单价提示文案'
          },
          {
            value: 6, text: '点击转化率', pValue: 2
          },
          {
            value: 7, text: '成交笔数', pValue: 2
          },
          {
            value: 8, text: '千次展现成本', pValue: 2
          },
          {
            value: 9, text: '投资回报率', pValue: 2
          },
          {
            value: 10, text: '访问页面数', pValue: 2
          }
        ],
        defaults: [2, 3],
        custom: false,
        customs: [2, 3, 4],
        sortable: true
      },
      tmp1: {
        fields: [
          {
            value: 1, text: '消耗', pValue: 1, tip: '消耗提示文案'
          },
          {
            value: 2, text: '展现量', pValue: 1
          },
          {
            value: 3, text: '点击量', pValue: 1
          },
          {
            value: 4, text: '点击率', pValue: 1
          },
          {
            value: 5, text: '平均点击单价', pValue: 1, tip: '平均点击单价提示文案'
          },
          {
            value: 6, text: '点击转化率', pValue: 2
          },
          {
            value: 7, text: '成交笔数', pValue: 2
          },
          {
            value: 8, text: '千次展现成本', pValue: 2
          },
          {
            value: 9, text: '投资回报率', pValue: 2
          },
          {
            value: 10, text: '访问页面数', pValue: 2
          }
        ],
        defaults: [2, 3],
        custom: false,
        tip: '标题旁提示文案'
      },
      tmp2: {
        fields: [
          {
            value: 1, text: '消耗', pValue: 1, tip: '消耗提示文案'
          },
          {
            value: 2, text: '展现量', pValue: 1
          },
          {
            value: 3, text: '点击量', pValue: 1
          },
          {
            value: 4, text: '点击率', pValue: 1
          },
          {
            value: 5, text: '平均点击单价', pValue: 1, tip: '平均点击单价提示文案'
          },
          {
            value: 6, text: '点击转化率', pValue: 2
          },
          {
            value: 7, text: '成交笔数', pValue: 2
          },
          {
            value: 8, text: '千次展现成本', pValue: 2
          },
          {
            value: 9, text: '投资回报率', pValue: 2
          },
          {
            value: 10, text: '访问页面数', pValue: 2
          }
        ],
        defaults: [2, 3],
        custom: false,
        customs: [2, 3, 4],
        sortable: true
      }
    };
  },
  methods: {
    changeSelected(val) {
      console.log(val)
    }
  }
};
</script>

<style>
</style>
