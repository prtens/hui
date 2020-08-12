<template>
  <div>
    <multiple-selection
      :options="options"
      :selects="selects"
      :props="{
        key: 'id',
        label: 'label'
      }"
      @on-change="handleChange"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [],
      selects: []
    };
  },
  created() {
    this.getOptions();
  },
  methods: {
    getOptions() {
      let options = [];
      for (let index = 0; index < 10; index++) {
        options.push({
          id: index,
          label: `测试${index}`
        });
      }
      this.options = options;
      console.log(this.options);
    },
    handleChange() {}
  }
};
</script>

<style></style>
