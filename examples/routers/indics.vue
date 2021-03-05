<template>
  <div>
    <p>排序/分组</p>
    <h-indics
      :tip="tmp.tip"
      :parents="tmp.parents"
      :fields="tmp.fields"
      :defaults="tmp.defaults"
      :custom.sync="tmp.custom"
      :customs="tmp.customs"
      :sortable="tmp.sortable"
      @change="changeSelected"
    ></h-indics>

    <p>不限制+不排序</p>
    <el-row :gutter="20">
      <el-col :span="12">
        <p>不限制可选择个数 + 指标不需排序 + 无分组 + 浮层标题旁提示文案</p>
        <h-indics
          :tip="tmp1.tip"
          :fields="tmp1.fields"
          :defaults="tmp1.defaults"
          @change="changeSelected1"
        ></h-indics>
      </el-col>
      <el-col :span="12">
        <p>不限制可选择个数 + 指标不需排序 + 有分组</p>
        <h-indics
          :fields="tmp2.fields"
          :parents="tmp2.parents"
          :defaults="tmp2.defaults"
          @change="changeSelected2"
        ></h-indics>
      </el-col>
    </el-row>

    <p>限制指标选择上限4（max=4） + 选择指标下限2（min=2） + 指标可排序，选择指标超过上限的时候，未选择指标禁止选择，每行展现指标个数（line-number=3）</p>
    <h-indics
      :parents="tmp3.parents"
      :fields="tmp3.fields"
      :defaults="tmp3.defaults"
      :custom="tmp3.custom"
      :customs="tmp3.customs"
      :sortable="true"
      line-number="3"
      max="4"
      min="2"
      @change="changeSelected3"
    ></h-indics>

    <p>只支持自定义数据，未操作过的情况下显示默认数据</p>
    <h-indics
      mode="custom"
      :parents="tmp4.parents"
      :fields="tmp4.fields"
      :defaults="tmp4.defaults"
      :customs="tmp4.customs"
      @change="changeSelected4"
    ></h-indics>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tmp: {
        tip: "标题旁提示文案",
        parents: [{
          value: 1, text: '组1'
        }, {
          value: 2, text: '组2'
        }],
        fields: [{
          value: 1, text: '消耗', pValue: 1, tip: '消耗提示文案'
        }, {
          value: 2, text: '展现量', pValue: 1
        }, {
          value: 3, text: '点击量', pValue: 1
        }, {
          value: 4, text: '点击率', pValue: 1
        }, {
          value: 5, text: '平均点击单价', pValue: 1, tip: '平均点击单价提示文案'
        }, {
          value: 6, text: '点击转化率', pValue: 2
        }, {
          value: 7, text: '成交笔数', pValue: 2
        }, {
          value: 8, text: '千次展现成本', pValue: 2
        }, {
          value: 9, text: '投资回报率', pValue: 2
        }, {
          value: 10, text: '访问页面数', pValue: 2
        }],
        defaults: [2, 3],
        custom: false, // 当前是为默认数据
        customs: [2, 3, 4, 5, 6, 7, 8],
        sortable: true
      },
      tmp1: {
        tip: "标题旁提示文案",
        fields: [{
          value: 1, text: '消耗', tip: '消耗提示文案'
        }, {
          value: 2, text: '展现量'
        }, {
          value: 3, text: '点击量'
        }, {
          value: 4, text: '点击率'
        }, {
          value: 5, text: '平均点击单价', tip: '平均点击单价提示文案'
        }, {
          value: 6, text: '点击转化率'
        }, {
          value: 7, text: '成交笔数'
        }, {
          value: 8, text: '千次展现成本'
        }, {
          value: 9, text: '投资回报率'
        }, {
          value: 10, text: '访问页面数'
        }],
        defaults: [1, 2, 3]
      },
      tmp2: {
        parents: [{
          value: 1, text: '组1'
        }, {
          value: 2, text: '组2'
        }],
        fields: [{
          value: 1, text: '消耗', pValue: 1, tip: '消耗提示文案'
        }, {
          value: 2, text: '展现量', pValue: 1
        }, {
          value: 3, text: '点击量', pValue: 1
        }, {
          value: 4, text: '点击率', pValue: 1
        }, {
          value: 5, text: '平均点击单价', pValue: 1, tip: '平均点击单价提示文案'
        }, {
          value: 6, text: '点击转化率', pValue: 2
        }, {
          value: 7, text: '成交笔数', pValue: 2
        }, {
          value: 8, text: '千次展现成本', pValue: 2
        }, {
          value: 9, text: '投资回报率', pValue: 2
        }, {
          value: 10, text: '访问页面数', pValue: 2
        }],
        defaults: [1, 2, 3]
      },
      tmp3: {
        parents: [{
          value: 1, text: '组1'
        }, {
          value: 2, text: '组2'
        }],
        fields: [{
          value: 1, text: '消耗', pValue: 1, tip: '消耗提示文案'
        }, {
          value: 2, text: '展现量', pValue: 1
        }, {
          value: 3, text: '点击量', pValue: 1
        }, {
          value: 4, text: '点击率', pValue: 1
        }, {
          value: 5, text: '平均点击单价', pValue: 1, tip: '平均点击单价提示文案'
        }, {
          value: 6, text: '点击转化率', pValue: 2
        }, {
          value: 7, text: '成交笔数', pValue: 2
        }, {
          value: 8, text: '千次展现成本', pValue: 2
        }, {
          value: 9, text: '投资回报率', pValue: 2
        }, {
          value: 10, text: '访问页面数', pValue: 2
        }],
        custom: false, // 当前是为默认数据
        customs: [2, 3, 4, 5],
        defaults: [2, 3]
      },
      tmp4: {
        fields: [{
          text: '消耗',
          value: 1,
          pValue: 1,
          tip: '消耗提示文案'
        }, {
          text: '展现量',
          value: 2,
          pValue: 1
        }, {
          text: '点击量',
          value: 3,
          pValue: 1
        }, {
          text: '点击率',
          value: 4,
          pValue: 1
        }, {
          text: '平均点击单价',
          value: 5,
          pValue: 1,
          tip: '平均点击单价提示文案'
        }, {
          text: '点击转化率',
          value: 6,
          pValue: 2
        }, {
          text: '成交笔数',
          value: 7,
          pValue: 2
        }, {
          text: '淘积木平均时长',
          value: 8,
          tip: '淘积木页面平均停留时长提示文案',
          pValue: 2
        }, {
          text: '投资回报率',
          value: 9,
          pValue: 2
        }, {
          text: '访问页面数',
          value: 10,
          pValue: 2
        }],
        parents: [{
          text: '淘积木互动',
          value: 1
        }, {
          text: '粉丝获取',
          value: 2
        }],
        customs: [2, 3, 4, 5],
        defaults: [2, 3]
      }
    };
  },
  methods: {
    changeSelected(val) {
      console.log("=========", val)
    },
    changeSelected1(val) {
      console.log("=========不限制可选择个数 + 指标不需排序 + 无分组 + 浮层标题旁提示文案", val)
    },
    changeSelected2(val) {
      console.log("=========不限制可选择个数 + 指标不需排序 + 有分组", val)
    },
    changeSelected3(val) {
      console.log("=========限制指标选择上限4（max=4） + 选择指标下限2（min=2） + 指标可排序，选择指标超过上限的时候，未选择指标禁止选择，每行展现指标个数（line-number=3）", val)
    },
    changeSelected4(val) {
      console.log("只支持自定义数据，未操作过的情况下显示默认数据", val)
    }

  }
};
</script>

<style>
</style>
