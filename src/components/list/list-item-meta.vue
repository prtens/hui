<template>
  <div class="hn-list-item-meta">
    <div
      class="hn-list-item-meta-avatar"
      v-if="avatar || $slots.avatar"
    >
      <slot name="avatar">
        <img :src="avatar" />
      </slot>
    </div>
    <div class="hn-list-item-meta-content">
      <div
        v-if="title || $slots.title"
        class="hn-list-item-meta-title"
      >
        <slot name="title">{{ title }}</slot>
      </div>
      <div
        v-if="description || $slots.description"
        class="hn-list-item-meta-description"
      >
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
export default {
  name: 'ListItemMeta',
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
