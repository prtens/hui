<template>
  <el-select
    v-model="values"
    multiple
    :filterable="filterable"
    clearable
    collapse-tags
    placeholder="请输入关键词"
    @change="handleChange"
  >
    <el-option
      v-for="item in options"
      :key="item[keyProp]"
      :label="item[labelProp]"
      :value="item[keyProp]"
      :disabled="item[disabledProp]"
    >
    </el-option>
  </el-select>
</template>

<script type="text/babel">
export default {
  name: "MultipleSelection",
  props: {
    options: {
      required: true,
      type: Array
    },
    selects: {
      type: Array,
      default() {
        return [];
      }
    },
    filterable: {
      type: Boolean,
      default() {
        return true;
      }
    },
    props: {
      type: Object,
      default() {
        return {
          key: "key",
          label: "label",
          disabled: "disabled"
        };
      }
    }
  },
  data() {
    return {
      values: [],
      oldOptions: []
    };
  },
  created() {
    this._initValues();
  },
  watch: {
    selects: {
      handler() {
        this._initValues();
      },
      deep: true
    }
  },
  computed: {
    labelProp() {
      return this.props.label || "label";
    },
    keyProp() {
      return this.props.key || "key";
    },
    disabledProp() {
      return this.props.disabled || "disabled";
    }
  },
  methods: {
    _initValues() {
      this.values = this.selects;
    },

    handleChange(val) {
      let allValues = [];
      // 保留所有值
      for (let item of this.options) {
        allValues.push(item[this.keyProp]);
      }

      // 用来储存上一次的值，可以进行对比
      const oldVal = this.oldOptions.length === 1 ? this.oldOptions[0] : [];

      // 若是全部选择
      if (val.includes("ALL_SELECT")) this.values = allValues;

      // 取消全部选中 上次有 当前没有 表示取消全选
      if (oldVal.includes("ALL_SELECT") && !val.includes("ALL_SELECT")) {
        this.values = [];
      }

      // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes("ALL_SELECT") && val.includes("ALL_SELECT")) {
        const index = val.indexOf("ALL_SELECT");
        val.splice(index, 1); // 排除全选选项
        this.values = val;
      }

      // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes("ALL_SELECT") && !val.includes("ALL_SELECT")) {
        if (val.length === allValues.length - 1) {
          this.values = ["ALL_SELECT"].concat(val);
        }
      }

      // 储存当前最后的结果 作为下次的老数据
      this.oldOptions[0] = this.values;

      this.$emit("method", this.values);
    }
  }
};
</script>

<style scoped></style>
