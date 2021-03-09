<template>
  <div>
    <h-area
      :selected.sync="selected"
      @change="change"
    />

    <h-area
      :selected.sync="selected"
      :city="false"
      @change="change"
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
    change(areas) {
      console.log(areas)
    }
  }
};
</script>

<style>
</style>
