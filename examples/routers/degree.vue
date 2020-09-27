<template>
  <div>
    <h-degree
      :num="40" style="margin-bottom: 20px"/>

    <h-degree
      type="danger"
      :num="60.25" style="margin-bottom: 20px"/>

    <h-degree
      type="warning"
      :num="80" style="margin-bottom: 20px"/>

    <h-degree
      type="success"
      :num="80"/>
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
