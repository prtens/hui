<template>
  <div>
    <h2>small size</h2>
    <List
      header="Header"
      footer="Footer"
      size="small"
      :split="false"
    >
      <ListItem
        v-for="item in data1"
        :key="item"
      >
        {{ item }}
      </ListItem>
    </List>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data1: [
        "Racing car sprays burning fuel into crowd.",
        "Japanese princess to wed commoner.",
        "Australian walks 100km after outback crash.",
        "Man charged over missing wedding girl.",
        "Los Angeles battles huge wildfires."
      ]

    };
  }
};
</script>
