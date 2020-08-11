<template>
  <div style="width: 60%">
    <time-step-selection :tmp.sync="tmp" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tmp:
        '[{"dayOfWeek":"0111110","timeSpans":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,22,23]},{"dayOfWeek":"1000001","timeSpans":[0,1,2,3,4,5,14,15,16,17,18,19,20,21,22,23]}]'
    };
  }
};
</script>

<style>
</style>
