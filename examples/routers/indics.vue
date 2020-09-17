<template>
  <div>
    <indics
      :parents="parents"
      :fields="fields"
      :defaults="defaults"
      :custom.sync="custom"
      :customs="customs"
      :tip="tip"
      :max="max"
      :sortable="sortable"
      @changeSelected="changeSelected"></indics>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      max: 4,
      customs: [2, 3, 4],
      tip: '浮层内标题旁提示文案',
      sortable: true
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
