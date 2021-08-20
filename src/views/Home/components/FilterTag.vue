<template>
  <div :class="$style.tagRoot">
    <img
      v-if="image"
      width="35"
      height="35"
      :src="image"
    />
    <div :class="[$style.tag, {[$style[variant]]: Boolean(variant)}]">
      <small v-if="label" :class="$style.label">{{label}}</small>
      <p :class="textClass">{{ text }}</p>
      <button @click="$emit('onClose', value)">
        <b-icon-x font-size="1.25rem"/>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FilterTag',
  props: {
    text: String,
    value: String,
    variant: String,
    image: String,
    textClass: String,
    label: String
  }
}
</script>

<style module lang="scss">
.tagRoot {
  &:not(:last-child) {
    margin-right: .825rem;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    margin: 2px;
    background-color: rgba($dark, .1);
    color: $dark;
    position: relative;

    .label {
      position: absolute;
      background: $primary;
      padding: 0 4px;
      bottom: 75%;
      color: $white;
      border-radius: .5rem;
    }

    &.primary {
      background-color: rgba($primary, .1);
      color: $primary;
    }
    &.secondary {
      background-color: rgba($secondary, .1);
      color: $secondary;
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
}

</style>
