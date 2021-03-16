<template>
  <div style="width: 60%">
    <h-hour
      :selected.sync="selected"
      :groups="[1234567]"
      @change="change"
    />

    <h-hour
      :selected.sync="selected"
      @change="change"
    />

    <h-hour
      :selected.sync="selected"
      :groups="[1,2,3,4,5,6,7]"
      @change="change"
    />
  </div>
</template>

<script>
import { converse, reverse } from '../../src/utils/hour'
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
    change(selectedValue) {
      console.log(selectedValue)
    }
  }
};
</script>

<style>
</style>
