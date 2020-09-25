<template>
  <div>
    <p>all</p>
    <el-select v-model="type" placeholder="请选择" style="margin-bottom: 20px">
      <el-option
        v-for="type in types"
        :key="type"
        :label="type"
        :value="type">
      </el-option>
    </el-select>

    <h-skeleton
      ref="skeleton"
      :boilerplate="boilerplate"
      :type="type"
      :tile="tile"/>

    <el-button @click="handleChange" style="margin-top: 20px">切换</el-button>
    <h-skeleton
      ref="skeleton"
      v-if="loading"
      width="100%"
      :type="type">
    </h-skeleton>
  </div>
</template>

<script>
import Skeleton from '../../src/components/skeleton/skeleton';

export default {
  components: {Skeleton},
  data() {
    return {
      boilerplate: false,
      tile: true,
      type: 'table',
      types: [],
      loading: false
    };
  },
  mounted() {
    this.types = Object.keys(this.$refs.skeleton.rootTypes);
  },
  methods: {
    handleChange() {
      this.loading = !this.loading;
    }
  }
};
</script>

<style lang="scss"></style>
