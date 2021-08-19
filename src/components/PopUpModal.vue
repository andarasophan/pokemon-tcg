<template>
  <MountingPortal
    mountTo="body"
    append
    v-if="condition && condition !== 'EXITED'"
  >
    <div :class="$style.popUpModalRoot" v-if="condition && condition !== 'EXITED'">
      <div :class="$style.popUpModalContainer">
        <div
          :class="$style.popUpModalCard"
          :style="{
            transform: condition === 'ENTERED' ? 'scale(1)' : 'scale(0)',
            transition: `transform ${animationDuration}ms ease-in-out`
          }"
        >
          <slot/>
        </div>
      </div>
      <div
        :style="{
          opacity: condition === 'ENTERED' ? 0.5 : 0,
          transition: `opacity ${animationDuration}ms ease-in-out`
        }"
        :class="$style.backdrop"
        @click="$emit('onClose')"
      />
    </div>
  </MountingPortal>
</template>

<script>
export default {
  name: 'PopUpModal',
  props: {
    animationDuration: {
      type: Number,
      default: () => 200
    },
    open: Boolean
  },
  data () {
    return {
      condition: null,
      animationExiting: null,
      animationEntering: null
    }
  },
  watch: {
    open (val) {
      if (val) {
        clearTimeout(this.animationExiting)
        this.condition = 'ENTER'
        this.animationEntering = setTimeout(() => {
          this.condition = 'ENTERED'
        }, this.animationDuration)
      } else {
        clearTimeout(this.animationEntering)
        this.condition = 'EXIT'
        this.animationExiting = setTimeout(() => {
          this.condition = 'EXITED'
        }, this.animationDuration)
      }
    }
  },
  beforeDestroy () {
    clearTimeout(this.animationEntering)
    clearTimeout(this.animationExiting)
  }
}
</script>

<style module lang="scss">
.popUpModalRoot {
  position: fixed;
  z-index: 4;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .popUpModalContainer {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;

    .popUpModalCard {
      overflow: hidden;
      background-color: $white;
    }
  }

  .backdrop {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: $dark;
    opacity: 0.4;
    top: 0;
    left: 0;
  }
}
</style>
