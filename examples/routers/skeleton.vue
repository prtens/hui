<template>
  <div>
    <p>all</p>
    <el-select v-model="type" placeholder="请选择">
      <el-option
        v-for="type in types"
        :key="type"
        :label="type"
        :value="type">
      </el-option>
    </el-select>

    <skeleton
      ref="skeleton"
      :boilerplate="boilerplate"
      :type="type"
      :tile="tile"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boilerplate: false,
      tile: false,
      type: 'table',
      types: []
    };
  },
  mounted() {
    this.types = Object.keys(this.$refs.skeleton.rootTypes);
    console.log(this.types);
  }
};
</script>

<style lang="scss"></style>
