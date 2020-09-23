<template>
  <div>
    <h-affix>
      <div class="demo-affix">固定在最顶部</div>
    </h-affix>
    <div
      v-for="(item, index) in arr"
      :key="index"
    >{{ item }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: []
    };
  },
  created() {
    for (let i = 0; i < 100; i++) {
      this.arr.push(i);
    }
  }
};
</script>

<style>
.demo-affix {
  width: 100px;
  height: 30px;
  background: #f60;
  color: #fff;
}
</style>
