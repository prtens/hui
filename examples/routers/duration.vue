<template>
  <div>
    <el-row style="margin-bottom: 20px">
      <h-duration
        viewId="test"
        :selected.sync="selected"
      />
    </el-row>

    <el-row style="margin-bottom: 20px">
      <h-duration
        :selected.sync="selected1"
        :boxWidth="18"
        :half="true"
      />
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "00:00-12:00:60,12:00-24:00:250;00:00-24:00:240;00:00-24:00:100;00:00-24:00:220;00:00-24:00:100;00:00-24:00:100;00:00-24:00:100",
      selected1: "00:00-12:00:60,12:00-24:00:250;00:00-24:00:240;00:00-24:00:100;00:00-24:00:220;00:00-24:00:100;00:00-24:00:100;00:00-24:00:100"
    };
  },
  watch: {
    selected: {
      handler(val) {
        console.log(val)
      }
    }
  }
};
</script>

<style>
</style>
