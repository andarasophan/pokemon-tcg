<template>
  <div :class="$style.pokemonDetail">
    <div class="container">
      <div class="row">

        <div class="col-md-4 py-3">
          <pokemon-image :class="$style.pokemonImage" :image="pokemon.images.large"/>
        </div>

        <div class="col-md-8">
          <!-- section header -->
          <section-header
            :name="pokemon.name"
            :supertype="pokemon.supertype"
            :subtypes="pokemon.subtypes"
            :hp="pokemon.hp"
            :types="pokemon.types"
          />

          <hr/>

          <!-- section content 1 -->
          <section-content-1
            :tcgplayer="pokemon.tcgplayer"
            :cardmarket="pokemon.cardmarket"
          />

          <hr/>

          <!-- section content 2 -->
          <section-content-2
            :attacks="pokemon.attacks"
            :weaknesses="pokemon.weaknesses"
            :resistances="pokemon.resistances"
            :retreatCost="pokemon.retreatCost"
            :artist="pokemon.artist"
            :rarity="pokemon.rarity"
            :set="pokemon.set"
          />

          <!-- section footer -->
          <div class="mt-5">
            <button @click="$emit('onClose')" class="btn btn-primary w-100">Close</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonImage from '../PokemonImage.vue'
import SectionContent1 from './SectionContent1.vue'
import SectionContent2 from './SectionContent2.vue'
import SectionHeader from './SectionHeader.vue'

export default {
  components: { PokemonImage, SectionHeader, SectionContent1, SectionContent2 },
  name: 'PokemonDetail',
  props: {
    pokemon: Object
  }
}
</script>

<style module lang="scss">
.pokemonDetail {
  padding: 2rem 1rem;
  height: calc(100vh - 4rem);
  width: calc(100vw - 2rem);
  overflow: auto;

  .pokemonImage {
    border-radius: 1rem;
  }
}
</style>
