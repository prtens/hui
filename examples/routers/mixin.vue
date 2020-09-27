<template>
  <div>
    <el-row>
      <p>水波纹 waves v-directive</p>
      <el-button v-waves type="primary">
        水波纹效果
      </el-button>
      <el-button v-waves size="mini" type="primary">
        水波纹效果
      </el-button>
    </el-row>

    <el-row>
      <p>Buttons</p>
      <span class="btn">水波纹</span>
      <span class="btn is-plainly" v-waves>水波纹</span>
      <span class="btn btn--danger is-plainly">水波纹</span>
    </el-row>
  </div>
</template>

<script>
import waves from '../../src/directives/waves/index.js' // 水波纹指令

export default {
  directives: {
    waves
  },
  data() {
    return {
      arr: []
    };
  }
};
</script>

<style lang="scss">

</style>
