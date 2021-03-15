<template>
  <div>
    <p>刻度型展示值取整</p>
    <h-degree
      :num="80"
      color="rgb(81, 163, 0)"
    />

    <h-degree
      type="danger"
      :num="60.25"
    />
    <h-degree
      type="warning"
      :num="60.25"
    />
    <h-degree
      type="success"
      :num="60.25"
    />

    <p>自定义颜色</p>
    <h-degree
      num="60"
      color="#fb8c0a"
    />

    <h-degree
      num="80"
      color="rgb(81, 163, 0)"
    />

    <p>默认的基础透明度：</p>
    <h-degree num="80" />

    <p>自定义基础透明度：</p>
    <h-degree
      opacity="0.4"
      num="80"
    />
  </div>
</template>

<script>
import HDegree from "../../src/components/degree/degree";

export default {
  components: { HDegree },
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
