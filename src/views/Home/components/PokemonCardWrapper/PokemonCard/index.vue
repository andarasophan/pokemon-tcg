<template>
  <button :class="$style.pokemonCard" @click="openModal = true">
    <pokemon-image :image="pokemon.images.small"/>
    <pop-up-modal
      :open="openModal"
      @onClose="openModal = false"
    >
      <pokemon-detail
        :pokemon="pokemon"
        @onClose="openModal = false"
      />
      <button @click="openModal = false" :class="$style.closeBtn">
        <b-icon-x font-size="2rem"/>
      </button>
    </pop-up-modal>
  </button>
</template>

<script>
import PopUpModal from '@/components/PopUpModal.vue'
import PokemonImage from './PokemonImage.vue'
import PokemonDetail from './PokemonDetail'

export default {
  components: {
    PopUpModal,
    PokemonImage,
    PokemonDetail
  },
  name: 'PokemonCard',
  data () {
    return {
      openModal: false
    }
  },
  props: {
    pokemon: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    // watch value openModal, scroll outside popUpModal will be hidden
    openModal (val) {
      if (val) document.body.classList.add('overflow-hidden')
      else document.body.classList.remove('overflow-hidden')
    }
  }
}
</script>

<style module lang="scss">
.pokemonCard {
  padding: 0;
  transition: transform 200ms ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
}

.closeBtn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: $white;

  display: flex;
  align-items: center;
  padding: 0;

  border-radius: 100%;
  box-shadow: 3px 3px 6px 2px rgba($dark, 0.45);
}
</style>
