<template>
  <div style="width: 60%">
    <time-step-selection
      :selected.sync="selected"
      @on-change="change"
    />
  </div>
</template>

<script>
import { converse, reverse } from '../../src/utils/timeStep'
export default {
  data() {
    return {
      tmp:
        '[{"dayOfWeek":"0111110","timeSpans":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,22,23]},{"dayOfWeek":"1000001","timeSpans":[0,1,2,3,4,5,14,15,16,17,18,19,20,21,22,23]}]',
      selected: []
    };
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.selected = converse(this.tmp)
    },
    change(selected, values) {
      console.log(selected)
      console.log(reverse(selected))
    }
  }
};
</script>

<style>
</style>
