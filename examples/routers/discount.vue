<template>
  <div>
    <discount :selected.sync="selected" />
    <discount
      :selected.sync="selected"
      :boxWidth="18"
      :half="true"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "00:00-12:00:60,12:00-24:00:250;00:00-24:00:240;00:00-24:00:100;00:00-24:00:220;00:00-24:00:100;00:00-24:00:100;00:00-24:00:100"
    };
  }

};
</script>

<style>
</style>
