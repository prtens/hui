<template>
  <div>
    <h-degree
      :num="40"/>

    <h-degree
      type="danger"
      :num="60.25"/>

    <h-degree
      type="warning"
      :num="80"/>

    <h-degree
      type="success"
      :num="80"
      color="rgb(81, 163, 0)"/>
  </div>
</template>

<script>
import HDegree from "../../src/components/degree/degree";

export default {
  components: {HDegree},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.hn-degree {
  &:not(:last-child) {
    margin-right: 20px;
  }
}
</style>
