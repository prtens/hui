<template>
  <div>
    <h-area
      :selected.sync="selected"
      @on-change="change"
    />

    <h-area
      :selected.sync="selected"
      :city="false"
      @on-change="change"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: [1]
    };
  },
  methods: {
    change(selected, values) {
      console.log(selected)
      console.log(values)
    }
  }
};
</script>

<style>
</style>
