<template>
  <div>
    <hamburger
      :is-active="opened"
      @toggleClick="toggleSideBar"
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
    toggleSideBar() {
      this.opened = !this.opened;
      console.log(this.opened);
    }
  }
};
</script>
