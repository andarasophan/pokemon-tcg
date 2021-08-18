<template>
  <div :class="$style.pokemonCardWrapper">
    <pokemon-card
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      :pokemon="pokemon"
    />
  </div>
</template>

<script>
import PokemonCard from './PokemonCard.vue'

export default {
  name: 'PokemonCardWrapper',
  components: { PokemonCard },
  props: {
    pokemons: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style module lang="scss">
.pokemonCardWrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @include media-breakpoint-up(md) {
    grid-template-columns: repeat(3, 1fr);
  }

  @include media-breakpoint-up(lg) {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
