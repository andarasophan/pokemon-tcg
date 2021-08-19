<template>
  <div :class="$style.errorView">
    <div :class="$style.icon">
      <component :is="`b-icon-${bootstrapIcon}`"/>
    </div>
    <h5>{{ title }}</h5>
    <p>{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  name: 'ErrorView',
  props: {
    title: String,
    subtitle: String,
    bootstrapIcon: {
      type: String,
      default: () => 'chat-right-fill'
    }
  }
}
</script>

<style module lang="scss">
.errorView {
  text-align: center;
  padding: 6rem 0;

  .icon {
    color: $primary;
    font-size: 1.5rem;
    display: inline-flex;
    padding: 1rem;
    background-color: $gray-100;
    border-radius: 100%;
    margin-bottom: 1.5rem;
  }

  h5 {
    font-weight: 700;
  }

  p {
    margin-bottom: 0;
    color: $gray-600;
    max-width: 300px;
    margin: auto;
  }
}
</style>
