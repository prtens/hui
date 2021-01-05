<template>
  <div class="hn-indics">
    <span
      class="hn-trigger hn-indics__show"
      @click="show"
    >
      <i class="el-icon-setting"></i>
    </span>
    <template v-if="mode === 'all'">
      <span
        v-if="map[type]"
        class="hn-trigger hn-indics__switch"
        @click="toggleDefault"
      >
        {{ map[type]['label'] }}
        <i class="el-icon-arrow-down hn-trigger-arrow hn-indics--icon"></i>
      </span>
    </template>
    <el-drawer
      :visible.sync="visible"
      :with-header="false"
      :close-on-press-escape="false"
      class="hn-indics__drawer"
      size="50%"
    >
      <div
        class="hn-indics__setting"
        :class="{'hn-indics--sortable': sortable, 'hn-indics--parent': hasParent}"
      >
        <div class="hn-indics__header">
          <span class="hn-indics--text">选择数据字段</span>
          <span
            class="hn-indics--max"
            v-if="max"
          >{{ selectedItems.length }} / {{ max }}</span>
          <span
            class="hn-indics--tip"
            v-if="tip"
          >{{ tip }}</span>
          <span
            class="hn-indics--operation"
            v-if="!sortable"
          >
            <span
              class="hn-indics--span"
              @click="reset()"
            >
              <i class="el-icon-refresh-left"></i>恢复默认
            </span>
            <span
              class="hn-indics--span"
              @click="clear()"
            >
              <i class="el-icon-delete"></i>清空
            </span>
          </span>
        </div>

        <div class="hn-indics__content">
          <div
            class="hn-indics__lines clearfix"
            v-for="(group, key) of groups"
            :key="key"
          >
            <div
              class="hn-indics__name"
              v-if="group.text"
            >
              <el-checkbox
                :key="key"
                :indeterminate="group.indeterminate"
                v-model="group.checked"
                @change="toggleParent(key)"
              >{{ group.text }}</el-checkbox>
            </div>
            <div class="clearfix">
              <div
                class="hn-indics__line"
                :style="`width: ${width}`"
                v-for="(field, fKey) of group.fields"
                :key="fKey"
              >
                <el-checkbox
                  :key="field.value"
                  v-model="field.checked"
                  :disabled="((max > 0) && (selectedItems.length >= max) && !field.checked)"
                  @change="toggle(field)"
                >
                  {{ field.text }}
                </el-checkbox>
                <el-tooltip
                  :content="field.tip"
                  placement="top"
                  v-if="field.tip"
                >
                  <i class="el-icon-question"></i>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>

        <template v-if="sortable">
          <div class="hn-indics__drag-header">
            <div class="hn-indics__drag-title">
              <span class="hn-indics--text">自定义字段</span>
              <span class="hn-indics--sort">可拖动排序</span>
            </div>
            <div class="hn-indics__drag-operation">
              <span
                class="hn-indics--span"
                @click="reset()"
              >
                <i class="el-icon-refresh-left"></i>恢复默认
              </span>
              <span
                class="hn-indics--span"
                @click="clear()"
              >
                <i class="el-icon-delete"></i>清空
              </span>
            </div>
          </div>

          <div class="hn-indics__drag-wrapper">
            <draggable v-model="selectedItems">
              <transition-group>
                <div
                  class="hn-indics__drag"
                  v-for="s of selectedItems"
                  :key="s.value"
                >
                  {{ s.text }}
                </div>
              </transition-group>
            </draggable>
          </div>
        </template>
      </div>

      <div class="el-drawer__footer">
        <el-button
          type="primary"
          @click="confirm"
        >确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script type="text/babel">
import draggable from 'vuedraggable'

export default {
  name: "HIndics",
  components: {
    draggable
  },
  props: {
    // 指标数组
    fields: {
      type: Array,
      default() {
        return []
      }
    },
    // 分组数组
    parents: {
      type: Array,
      default() {
        return []
      }
    },
    // 渲染text时读取的key
    textKey: {
      type: String,
      default: 'text'
    },
    // 渲染value时读取的key
    valueKey: {
      type: String,
      default: 'value'
    },
    // 表示父节点value的字段
    parentKey: {
      type: String,
      default: 'pValue'
    },
    // 当前是否为自定义指标，false（默认指标），true（自定义指标）
    // 可能存在customs=defaults的情况，因此需要明确指定当前是自定义还是默认
    custom: {
      type: Boolean,
      default: false
    },
    // 自定义指标value值的数组，例如["cost"]
    // 为[]的时候，默认=defaults，确保每次切换都有选中的指标
    customs: {
      type: Array,
      default() {
        return []
      }
    },
    // 默认指标value值的数组，必填
    defaults: {
      type: Array,
      default() {
        return []
      }
    },
    // 指标选中上限，不传不限制选择个数
    max: {
      type: Number | String,
      default: 0
    },
    // 指标选中下限
    min: {
      type: Number | String,
      default: 1
    },
    // 每行展现指标个数
    // 可排序：默认每行4个
    // 不可排序：默认每行5个
    lineNumber: {
      type: Number | String,
      default: 4
    },
    // 是否需要排序
    sortable: {
      type: Boolean,
      default: false
    },
    // 浮层内标题旁提示文案
    tip: {
      type: String,
      default: ''
    },
    // 组件使用模式
    // 1. mode=all：支持自定义和默认值切换
    // 2. mode=custom：只支持自定义
    mode: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      visible: false,
      type: 1,
      map: {},
      tfields: [],
      tparents: [],
      tdefaults: [],
      tcustom: false,
      tcustoms: [],
      groups: [],
      selectedItems: [],
      width: '',
      hasParent: false
    };
  },
  computed: {
    getLineNumber: function () {
      // lineNumber：每行个数，默认情况下
      // 可排序：一行四个
      // 不可排序：一行五个
      return this.lineNumber || (this.sortable ? 4 : 5);
    }
  },
  watch: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let that = this;
      let { fields, parents, textKey, valueKey, parentKey, defaults, tdefaults, custom, customs, tcustoms, mode } = that;
      let tfields = [];
      (fields || []).forEach(item => {
        tfields.push({
          text: item[textKey],
          value: item[valueKey],
          pValue: item[parentKey]
        });
      })
      that.tfields = tfields;

      let tparents = [];
      (parents || []).forEach(item => {
        tparents.push({
          text: item[textKey],
          value: item[valueKey]
        })
      });
      that.tparents = tparents;

      tdefaults = defaults;
      tcustoms = customs;
      // 当自定义为空时，默认为defaults
      if (tcustoms.length === 0) {
        tcustoms = tdefaults;
      }

      // 1 默认
      // 2 自定义
      let map = {
        1: {
          label: '默认数据',
          list: tdefaults
        },
        2: {
          label: '自定义数据',
          list: tcustoms
        }
      }
      that.map = map;

      let type;
      switch (mode) {
        case 'all':
          type = (custom + '' === 'true') ? 2 : 1;
          break;

        case 'custom':
          type = 2;
          break;
      }
      that.type = type;
      that.getGroupsSelected();
    },
    getGroupsSelected() {
      let that = this;
      let { tfields, tparents, map, type } = that;
      let selectedItems = []
      let lineNumber = that.lineNumber
      tfields.forEach(field => {
        let checked = false;
        if (map[type].list.includes(field.value)) {
          checked = true;
          selectedItems.push({
            value: field.value,
            text: field.text
          })
        }
        this.$set(field, 'checked', checked);
      })
      that.selectedItems = selectedItems;

      let groups = [];
      if (tparents.length > 0) {
        // 有分组
        tparents.forEach(p => {
          let fs = [];
          tfields.forEach(f => {
            if (f.pValue === p.value) {
              fs.push(f);
            }
          })
          groups.push({
            text: p.text,
            fields: fs
          })
        })
      } else {
        let num = Math.ceil(tfields.length / lineNumber);
        for (let i = 0; i < num; i++) {
          groups.push({
            fields: tfields.slice(i * lineNumber, (i + 1) * lineNumber)
          });
        }
      }

      that.width = Math.floor(100 / lineNumber) + '%';
      that.hasParent = (tparents.length > 0);
      that.groups = groups;
      that.syncParents();
    },
    toggleParent(groupIndex) {
      let that = this;
      let { groups, selectedItems, max } = that;
      let checked = groups[groupIndex].checked;

      if (checked) {
        // 选中
        groups[groupIndex].fields.forEach(field => {
          if (!field.checked && (max === 0 || (max > 0 && selectedItems.length < max))) {
            field.checked = true;
            selectedItems.push(field);
          }
        })
      } else {
        // 删除
        groups[groupIndex].fields.forEach(field => {
          field.checked = false;
          for (let i = 0; i < selectedItems.length; i++) {
            if (selectedItems[i].value === field.value) {
              selectedItems.splice(i, 1);
              break;
            }
          }
        })
      }

      that.$set(that, 'selectedItems', selectedItems)
      that.$set(that, 'groups', groups)
      that.syncParents();
    },
    toggle(row) {
      let that = this;
      let { checked, value, text } = row;
      let { tfields, selectedItems, sortable } = that;

      if (checked) {
        // 选择
        if (sortable) {
          // 可排序的时候在最后添加
          selectedItems.push({
            value: value,
            text: text
          })
        } else {
          // 不可选择时按照列表顺序
          selectedItems = tfields.filter(item => {
            return item.checked;
          })
        }
      } else {
        // 移除
        for (let i = 0; i < selectedItems.length; i++) {
          if (selectedItems[i].value === value) {
            selectedItems.splice(i, 1);
            break;
          }
        }
      }

      that.$set(that, 'selectedItems', selectedItems)
      that.syncParents();
    },
    syncParents() {
      let that = this;
      let { groups } = that;
      groups.forEach(g => {
        let len = g.fields.length,
          count = 0;
        g.fields.forEach(f => {
          if (f.checked) {
            count++;
          }
        })
        if (count > 0) {
          if (count === len) {
            // 全选
            g.indeterminate = false;
            g.checked = true;
          } else {
            // 部分选中
            g.indeterminate = true;
            g.checked = false;
          }
        } else {
          // 全不选
          g.indeterminate = false;
          g.checked = false;
        }
      })

      that.$set(that, 'groups', groups)
    },
    show() {
      let that = this;
      let { type, map, tdefaults, tcustom, tcustoms } = that;
      type = 2;
      tdefaults = map[1].list;
      tcustom = (type === 2); // 是否为自定义指标
      tcustoms = map[2].list;
      that.visible = true;
    },
    toggleDefault() {
      let that = this;
      let { type } = that;

      if (type === 1) {
        type = 2;
      } else {
        type = 1;
      }
      that.$set(that, 'type', type)
      that.getGroupsSelected();
    },
    reset() {
      let that = this;
      that.getGroupsSelected();
    },
    clear() {
      let that = this;
      let { tfields } = that;
      tfields.forEach(field => {
        this.$set(field, 'checked', false);
      })

      that.selectedItems = [];
      that.syncParents();
    },
    confirm() {
      let that = this;
      let { selectedItems, min, max } = that;
      let selected = selectedItems.map(item => {
        return item.value;
      });

      let len = selected.length;
      if (!((len >= min) && (max === 0 || (max > 0 && len <= max)))) {
        that.$message({
          message: `请至少选择 ${min} 个指标 ${(max > 0) ? ('，至多选择 ' + max + ' 个指标') : ''}`,
          type: 'error',
          duration: 1500
        })
      } else {
        that.type = 2;
        that.tdefaults = that.map[1].list;
        that.tcustom = (that.type === 2); // 是否为自定义指标
        that.tcustoms = that.map[2].list = selected;
        that.$emit('change', selectedItems);
        that.visible = false;
      }
    },
    cancel() {
      let that = this;
      that.reset();
      that.visible = false;
    }
  }
};
</script>
