<template>
  <div>
    <!-- data empty -->
    <div :class="$style.notFound" v-if="!Boolean(pokemons.length) && !loading">
      <div :class="$style.icon">
        <b-icon-chat-right-fill/>
      </div>
      <h5>Nothing found...</h5>
      <p>Hmm sorry, we were not able to find a match. Try another search.</p>
    </div>
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
import PokemonCard from './PokemonCard.vue'

export default {
  name: 'PokemonCardWrapper',
  components: { PokemonCard },
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

.notFound {
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
