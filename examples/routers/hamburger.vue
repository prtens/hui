<template>
  <div>
    <h-hamburger
      :is-active="opened"
      @change="toggleSideBar"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      opened: false
    };
  },
  methods: {
    toggleSideBar(value) {
      this.opened = value;
      console.log(value);
    }
  }
};
</script>
