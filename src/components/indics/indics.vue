<template>
  <div class="hn-indics">
    <span href="javascript:;" class="hn-trigger hn-indics__show" @click="show">
      <i class="el-icon-setting"></i>
    </span>
    <span href="javascript:;" class="hn-trigger hn-indics__switch" @click="toggleDefault">
      {{ text }}
      <i class="el-icon-arrow-down hn-trigger-arrow hn-indics--icon"></i>
    </span>

    <el-drawer
      :visible.sync="visible"
      :with-header="false"
      size="50%">

      <div class="hn-indics__setting" :class="{'hn-indics--sortable': sortable, 'hn-indics--parent': hasParent}">
        <div class="hn-indics__header">
          <span class="hn-indics--text">选择数据字段</span>
          <span class="color-9 font-tahoma bold"
                v-if="max">{{ selectedItems.length }} / {{ max }}</span>
          <span class="color-9" v-if="tip">{{ tip }}</span>
          <span class="hn-indics--operation" v-if="!sortable">
            <span class="hn-indics--span" @click="reset()">
              <i class="el-icon-refresh-left"></i>恢复默认
            </span>
            <span class="hn-indics--span" @click="clear()">
              <i class="el-icon-delete"></i>清空
            </span>
          </span>
        </div>

        <div class="hn-indics__content">
          <div class="hn-indics__lines clearfix" v-for="(group, key) of groups" :key="key">
            <div class="hn-indics__name">{{ group.text }}</div>
            <div class="clearfix">
              <div class="hn-indics__line" :style="`width: ${width}`" v-for="(field, fKey) of group.fields" :key="fKey">
                <el-checkbox
                  v-model="field.checked"
                  :disabled="((max > 0) && (selectedItems.length >= max) && !field.checked)"
                  @change="toggle">
                  {{ field.text }}
                </el-checkbox>
                <el-tooltip :content="field.tip" placement="top" v-if="field.tip">
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
              <span class="color-9">可拖动排序</span>
            </div>
            <div class="hn-indics__drag-operation">
              <span class="hn-indics--span"  @click="reset()">
                <i class="el-icon-refresh-left"></i>恢复默认
              </span>
              <span class="hn-indics--span" @click="clear()">
                <i class="el-icon-delete"></i>清空
              </span>
            </div>
          </div>

          <div class="hn-indics__drag-wrapper">
            <draggable v-model="selectedItems">
              <transition-group>
                <div class="hn-indics__drag"
                     v-for="s of selectedItems"
                     :key="s.value">
                  {{ s.text }}
                </div>
              </transition-group>
            </draggable>
          </div>
        </template>
      </div>

      <div class="el-drawer__footer">
        <el-button type="primary" @click="confirm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script type="text/babel">
import draggable from 'vuedraggable'

export default {
  name: "Indics",
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
      type: Number,
      default: 0
    },
    // 指标选中下限
    min: {
      type: Number,
      default: 1
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
    }
  },
  data() {
    return {
      // 每行展现指标个数
      // 可排序：默认每行4个
      // 不可排序：默认每行5个
      lineNumber: 4,
      type: '',
      map: {},
      text: '',
      visible: false,
      hasParent: false,
      width: '',
      groups: [],
      selectedItems: []
    };
  },
  computed: {},
  watch: {
    custom: {
      immediate: true,
      handler(val) {
        this.watchCustom(val)
      }
    },
    selectedItems: {
      handler(val) {
        this.$emit('changeSelected', val)
      }
    }
  },
  mounted() {
    let that = this
    that.init();
  },
  methods: {
    watchCustom(val) {
      // 1 默认
      // 2 自定义
      let that = this
      that.type = val ? 2 : 1
      that.init()
    },
    getFields() {
      let that = this
      let {textKey, valueKey, parentKey} = this
      let fields = [];
      that.fields.forEach(item => {
        let tmp = {
          text: item[textKey],
          value: item[valueKey],
          pValue: item[parentKey],
          checked: false
        }
        fields.push({...item, ...tmp});
      })
      return fields
    },
    getParents() {
      let that = this
      let {textKey, valueKey} = this
      let parents = [];
      that.parents.forEach(item => {
        let tmp = {
          text: item[textKey],
          value: item[valueKey]
        }
        parents.push({...item, ...tmp})
      })
      return parents
    },
    init() {
      let that = this;
      let {customs, defaults, lineNumber, type} = that

      // 当自定义为空时，默认为defaults
      if (customs.length === 0) {
        customs = defaults;
      }

      lineNumber = that.sortable ? 4 : 5;
      that.width = Math.floor(100 / lineNumber) + '%'

      let map = {
        1: {
          label: '默认数据',
          list: defaults
        },
        2: {
          label: '自定义数据',
          list: customs
        }
      }
      that.map = map
      that.text = map[type].label

      that.getGroupsSelected()
    },

    getGroupsSelected() {
      let that = this
      let {map, type, lineNumber} = that

      let fields = that.getFields()
      let parents = that.getParents()

      let selectedItems = []
      fields.forEach(field => {
        let checked = false;
        if (map[type].list.includes(field.value)) {
          checked = true;
          selectedItems.push({
            value: field.value,
            text: field.text
          })
        }
        field.checked = checked
      })
      that.selectedItems = selectedItems

      let groups = [], hasParent;
      if (parents.length > 0) {
        // 有分组
        groups = parents.map(p => {
          let fs = [];
          fields.forEach(f => {
            if (f.pValue === p.value) {
              fs.push(f);
            }
          })
          return {
            text: p.text,
            fields: fs
          }
        })
        hasParent = true;
      } else {
        let num = Math.ceil(fields.length / lineNumber);
        for (var i = 0; i < num; i++) {
          let group = {
            fields: fields.slice(i * lineNumber, (i + 1) * lineNumber)
          }
          groups.push(group);
        }
        hasParent = false;
      }
      that.groups = groups
      that.hasParent = hasParent
    },

    show() {
      this.visible = true
    },

    toggleDefault() {
      let that = this
      this.$emit("update:custom", !that.custom);
    },

    reset() {
      let that = this
      that.getGroupsSelected()
    },

    clear() {
      let that = this
      that.selectedItems = []

      that.groups.forEach(t => {
        t.fields.forEach(f => {
          f.checked = false
        })
      })
    },

    toggle() {
      let that = this
      let selectedItems = []

      that.groups.forEach(group => {
        group.fields.forEach(field => {
          if (field.checked) {
            selectedItems.push({
              value: field.value,
              text: field.text
            })
          }
        })
      })
      that.selectedItems = selectedItems
    },

    cancel() {
      this.visible = false
    },

    confirm() {
      this.visible = false
    }
  }
};
</script>
