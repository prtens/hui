<template>
  <div>
    <time-step-discount :item.sync="launchPeriod.item" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      launchPeriod: {
        radioChecked: 2,
        optionsShow: true,
        optionValue: "",
        options: [],
        definedShow: false,
        itemListStr: "",
        templateId: 0,
        item: {
          createdBy: "",
          declareFlag: 0,
          id: 0,
          model: "",
          name: "",
          tbUserId: 0,
          tbUserNick: "",
          type: 0
        }
      }
    };
  }

};
</script>

<style>
</style>
