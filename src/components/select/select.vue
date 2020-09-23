<template>
  <div class="hn-multiple-selection">
    <el-select
      multiple
      collapse-tags
      clearable
      :filterable="filterable"
      v-model='tmpSelects'
      @change='changeSelect'
      :placeholder='t("h.select.placeholder")'
    >
      <slot name="prefix">
        <el-checkbox
          class="check-all"
          v-model="checked"
          @change='selectAll'
        >{{ t('h.select.selectAll') }}</el-checkbox>
      </slot>
      <el-option
        v-for='item in options'
        :key="item[keyProp]"
        :label="item[labelProp]"
        :value="item[valueProp]"
        :disabled="item[disabledProp]"
      ></el-option>
    </el-select>
  </div>
</template>

<script type="text/babel">
import Locale from '../../mixins/locale';

export default {
  name: "HSelect",
  mixins: [Locale],
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    },
    selects: {
      type: Array,
      default() {
        return [];
      }
    },
    filterable: {
      type: Boolean,
      default: true
    },
    props: {
      type: Object,
      default() {
        return {
          key: "key",
          label: "label",
          value: "value",
          disabled: "disabled"
        };
      }
    }
  },
  data() {
    return {
      checked: false,
      tmpSelects: []
    }
  },
  computed: {
    keyProp() {
      return this.props.key || "key";
    },
    labelProp() {
      return this.props.label || "label";
    },
    valueProp() {
      return this.props.value || "value";
    },
    disabledProp() {
      return this.props.disabled || "disabled";
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.tmpSelects = this.selects
    },
    selectAll() {
      let tmpSelects = []
      if (this.checked) {
        this.options.map((item) => {
          tmpSelects.push(item[this.valueProp])
        })
      }
      this.tmpSelects = tmpSelects

      this.$emit('on-change', tmpSelects)
    },
    changeSelect(val) {
      let checked = false
      if (val.length === this.options.length) {
        checked = true
      }
      this.checked = checked

      this.$emit('on-change', this.tmpSelects)
    }
  }
};
</script>

<style scoped></style>
