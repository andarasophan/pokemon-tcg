<template>
  <div :class="$style.pokemonImage">
    <div :class="$style.imageWrapper">
      <img :src="image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokemonImage',
  props: {
    image: String
  }
}
</script>

<style module lang="scss">
.pokemonImage {
  border-radius: .5rem;
  box-shadow: 5px 5px 6px rgba($dark, 0.45);
  overflow: hidden;
  transition: transform 200ms ease-in-out;

  .imageWrapper {
    padding-top: 140%;
    position: relative;
    overflow: hidden;
    border-radius: inherit;
    background-color: $gray-200;

    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      object-position: center;
    }
  }
}
</style>
