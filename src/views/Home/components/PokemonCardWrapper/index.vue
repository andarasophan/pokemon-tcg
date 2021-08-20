<template>
  <div>
    <!-- data empty -->
    <error-view
      v-if="!Boolean(pokemons.length) && !loading"
      title="Nothing found..."
      subtitle="Hmm sorry, we were not able to find a match. Try another search."
    />

    <div v-else :class="$style.pokemonCardWrapper">
      <!-- loading -->
      <template v-if="loading">
        <b-skeleton-img v-for="n in 8" :key="n" aspect="5:7"/>
      </template>
      <!-- data exists -->
      <template v-else-if="Boolean(pokemons.length)">
        <pokemon-card
          v-for="pokemon in pokemons"
          :key="pokemon.id"
          :pokemon="pokemon"
        />
      </template>
    </div>
  </div>
</template>

<script>
import ErrorView from '@/components/ErrorView.vue'
import PokemonCard from './PokemonCard'

export default {
  name: 'PokemonCardWrapper',
  components: { PokemonCard, ErrorView },
  props: {
    pokemons: {
      type: Array,
      default: () => []
    },
    loading: Boolean
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
