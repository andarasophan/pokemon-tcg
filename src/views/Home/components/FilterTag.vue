<template>
  <div :class="[$style.tag, {[$style[variant]]: Boolean(variant)}]">
    <p>{{ text }}</p>
    <button @click="$emit('onClose', value)">
      <b-icon-x font-size="1.25rem"/>
    </button>
  </div>
</template>

<script>
export default {
  name: 'FilterTag',
  props: {
    text: String,
    value: String,
    variant: String
  }
}
</script>

<style module lang="scss">
.tag {
  display: inline-flex;
  align-items: center;
  margin: 2px;
  background-color: rgba($dark, .1);
  color: $dark;

  &.primary {
    background-color: rgba($primary, .1);
    color: $primary;
  }
  &.warning {
    background-color: rgba($warning, .1);
    color: $warning;
  }
  &.success {
    background-color: rgba($success, .1);
    color: $success;
  }

  p {
    margin-bottom: 0;
    padding: 6px 8px;
  }

  button {
    display: flex;
    align-items: center;
    color: inherit;
    padding: 0;
    margin-right: 4px;
  }
}
</style>
