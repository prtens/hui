<template>
  <div>
    <div v-for="(item, index) in arr" :key="index">{{ item }}</div>
    <back-top
      :visibility-height="300"
      :back-position="0"
      transition-name="fade"
    />
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

<style></style>
