<template>
  <div>
    <h-pagination
      :total="page.totalCount"
      :page.sync="page.pageNum"
      :limit.sync="page.pageSize"
      @change="getList"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemList: [],
      page: {
        pageNum: 1,
        pageSize: 10,
        totalCount: 100
      }
    };
  },
  created() { },
  methods: {
    getList() { }
  }
};
</script>

<style></style>
