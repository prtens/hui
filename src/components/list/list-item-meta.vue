<template>
  <div class="hn-list__meta">
    <div
      class="hn-list__meta-avatar"
      v-if="avatar || $slots.avatar"
    >
      <slot name="avatar">
        <el-avatar :src="avatar"></el-avatar>
      </slot>
    </div>
    <div class="hn-list__meta-content">
      <div
        v-if="title || $slots.title"
        class="hn-list__meta-title"
      >
        <slot name="title">{{ title }}</slot>
      </div>
      <div
        v-if="description || $slots.description"
        class="hn-list__meta-description"
      >
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'HListItemMeta',
  components: {},
  props: {
    avatar: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  }
};
</script>
