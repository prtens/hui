<template>
  <div>
    <el-table
      highlight-current-row
      stripe
      :data="itemList"
    >
      <el-table-column
        v-for="item in columns"
        :prop="item.prop"
        :label="item.label"
        :key="item.label"
        :align="item.align"
        :formatter="item.formatter"
        :width="item.width"
      >
      </el-table-column>
      <table-tree-column
        prop="label"
        levelKey="level"
      />
    </el-table>
  </div>
</template>

<script>
import { addLevel } from "../../src/utils/util";

export default {
  data() {
    return {
      columns: [
        {
          label: "ID",
          prop: "id"
        },
        {
          label: "展现量",
          prop: "label"
        }
      ],
      itemList: [
        {
          id: 1,
          label: "一级",
          parent_id: 0,
          children: [
            {
              id: 4,
              label: "一级 |_ 二级",
              parent_id: 1,
              children: [
                {
                  id: 9,
                  label: "一级 |_ 二级|_三级 1",
                  parent_id: 4
                },
                {
                  id: 10,
                  label: "一级 |_ 二级|_三级 2",
                  parent_id: 4
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          parent_id: 0,
          children: [
            {
              id: 5,
              parent_id: 2,
              label: "二级 2-1"
            },
            {
              id: 6,
              parent_id: 2,
              label: "二级 2-2"
            }
          ]
        }
      ]
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      addLevel(this.itemList, 0);
    }
  }
};
</script>

<style></style>
