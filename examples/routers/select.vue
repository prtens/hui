<template>
  <div>
    <h-select
      :options="options"
      :selects="selects"
      :props="{
        key: 'id',
        value: 'id',
        label: 'label'
      }"
      @on-change="handleChange"
    />
  </div>
</template>

<script>
import HSelect from '../../src/components/select/select';

export default {
  components: {HSelect},
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
    },
    handleChange(val) {
      console.log(val)
    }
  }
};
</script>

<style></style>
