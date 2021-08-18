<template>
  <button :class="$style.pokemonCard">
    <div :class="$style.imageWrapper">
      <img :src="pokemon.images.small" alt="" />
    </div>
  </button>
</template>

<script>
export default {
  name: 'PokemonCard',
  props: {
    pokemon: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style module lang="scss">
.pokemonCard {
  padding: 0;
  display: block;
  width: 100%;
  text-align: left;
  position: relative;
  border-radius: 8px;
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

  &:hover {
    transform: scale(1.05);
  }
}
</style>
