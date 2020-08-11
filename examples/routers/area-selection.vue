<template>
  <div>
    <area-selection :item.sync="launchArea.item" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      launchArea: {
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
