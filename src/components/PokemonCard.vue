<template>
  <button :class="$style.pokemonCard" @click="openModal = true">
    <div :class="$style.imageWrapper">
      <img :src="pokemon.images.small" alt="" />
    </div>
    <pop-up-modal
      :open="openModal"
      @onClose="openModal = false"
    >
      <div :class="$style.detail">
        <div class="container">
          <div class="row">
            <div class="col-md-4 py-3">
              <div :class="$style.pokemonCard">
                <div :class="$style.imageWrapper">
                  <img :src="pokemon.images.large" alt="" />
                </div>
              </div>
            </div>
            <div class="col-md-8">

              <!-- section header -->
              <div class="d-flex justify-content-between align-items-center">
                <div class="mr-2">
                  <h2 class="font-weight-bold mb-0">{{ pokemon.name }}</h2>
                  <!-- some cards dont have subtypes -->
                  <h5>{{ `${pokemon.supertype}${Array.isArray(pokemon.subtypes) ? ' - ' + pokemon.subtypes.join(' ') : ''}` }}</h5>
                </div>
                <div class="d-flex align-items-center">
                  <h5 v-if="pokemon.hp" class="mb-0 mr-2">HP {{ pokemon.hp }}</h5>
                  <img
                    v-for="type in pokemon.types"
                    :key="type"
                    width="25"
                    :src="getTypePhoto(type)"
                  />
                </div>
              </div>

              <hr/>

              <!-- section content 1 -->
              <div>
                  <h3 class="mb-3">Prices</h3>
                  <div class="mb-2" v-if="pokemon.tcgplayer">
                    <div>
                      <h5 class="text-primary font-weight-bold mb-0">From TCGplayer</h5>
                      <p class="mb-0 text-muted">Last Updated {{ pokemon.tcgplayer.updatedAt }}</p>
                    </div>
                    <template v-if="Object.keys(pokemon.tcgplayer.prices).length">
                      <div
                        class="row"
                        v-for="price in Object.keys(pokemon.tcgplayer.prices)"
                        :key="price"
                      >
                        <div
                          class="col py-2"
                          v-for="el in ['market', 'low', 'mid', 'high']"
                          :key="el"
                        >
                          <small class="text-uppercase">{{splitCamelCase(price)}} {{el}}</small>
                          <h5 class="mb-0">${{ pokemon.tcgplayer.prices[price][el] }}</h5>
                        </div>
                      </div>
                    </template>
                    <p class="mt-2 font-weight-bold" v-else>N/A</p>
                  </div>

                  <div class="mb-2" v-if="pokemon.cardmarket">
                    <div>
                      <h5 class="text-primary font-weight-bold mb-0">From Cardmarket</h5>
                      <p class="mb-0 text-muted">Last Updated {{ pokemon.cardmarket.updatedAt }}</p>
                    </div>
                    <div class="row">
                      <div class="col py-2">
                        <small>PRICE TREND</small>
                        <h5 class="mb-0">{{ pokemon.cardmarket.prices.trendPrice }}€</h5>
                      </div>
                      <div class="col py-2">
                        <small>1 DAY AVERAGE</small>
                        <h5 class="mb-0">{{ pokemon.cardmarket.prices.avg1 }}€</h5>
                      </div>
                      <div class="col py-2">
                        <small>7 DAY AVERAGE</small>
                        <h5 class="mb-0">{{ pokemon.cardmarket.prices.avg7 }}€</h5>
                      </div>
                      <div class="col py-2">
                        <small>30 DAY AVERAGE</small>
                        <h5 class="mb-0">{{ pokemon.cardmarket.prices.avg30 }}€</h5>
                      </div>
                    </div>
                  </div>
              </div>

              <hr/>

              <!-- section content 2 -->
              <div>
                <!-- attacks -->
                <div v-if="pokemon.attacks" class="mb-3">
                  <small>ATTACKS</small>
                  <div
                    class="mt-2"
                    v-for="(attack, i) in pokemon.attacks"
                    :key="`${attack}-${i}`"
                  >
                    <img
                      v-for="(cost, j) in attack.cost"
                      :key="`${cost}-${i}-${j}`"
                      :src="getTypePhoto(cost)"
                      width="25"
                    />
                    <div class="d-flex justify-content-between align-items-center my-2">
                      <h4 class="mb-0">{{attack.name}}</h4>
                      <h4 class="mb-0">{{attack.damage}}</h4>
                    </div>
                    <p class="text-muted mb-0">{{attack.text}}</p>
                  </div>
                </div>

                <!-- info 1 -->
                <div class="row mb-3">
                  <div class="col py-2">
                    <small>WEAKNESS</small>
                    <template v-if="pokemon.weaknesses">
                      <div
                        class="d-flex align-items-center py-1"
                        v-for="(weakness, i) in pokemon.weaknesses"
                        :key="`${weakness}-${i}`"
                      >
                        <img
                          :src="getTypePhoto(weakness.type)"
                          width="25"
                        />
                        <p v-if="weakness.value" class="mb-0 ml-1">{{weakness.value}}</p>
                      </div>
                    </template>
                    <p v-else class="mb-0 font-weight-bold">N/A</p>
                  </div>

                  <div class="col py-2">
                    <small>RESISTANCE</small>
                    <template v-if="pokemon.resistances">
                      <div
                        class="d-flex align-items-center py-1"
                        v-for="(resistance, i) in pokemon.resistances"
                        :key="`${resistance}-${i}`"
                      >
                        <img
                          :src="getTypePhoto(resistance.type)"
                          width="25"
                        />
                        <p v-if="resistance.value" class="mb-0 ml-1">{{resistance.value}}</p>
                      </div>
                    </template>
                    <p v-else class="mb-0 font-weight-bold">N/A</p>
                  </div>

                  <div class="col py-2">
                    <small>RETREAT COST</small>
                    <div class="py-1" v-if="pokemon.retreatCost">
                      <img
                        v-for="(retreatCost, i) in pokemon.retreatCost"
                        :key="`${retreatCost}-${i}`"
                        :src="getTypePhoto(retreatCost)"
                        width="25"
                      />
                    </div>
                    <p v-else class="mb-0 font-weight-bold">N/A</p>
                  </div>
                </div>

                <!-- info 2 -->
                <div class="row">
                  <div class="col py-2">
                    <small>ARTIST</small>
                    <h5 class="mb-0" v-if="pokemon.artist">{{pokemon.artist}}</h5>
                    <p v-else class="mb-0 font-weight-bold">N/A</p>
                  </div>

                  <div class="col py-2">
                    <small>RARITY</small>
                    <h5 class="mb-0" v-if="pokemon.rarity">{{pokemon.rarity}}</h5>
                    <p v-else class="mb-0 font-weight-bold">N/A</p>
                  </div>

                  <div class="col py-2">
                    <small>SET</small>
                      <div v-if="pokemon.set">
                        <div class="d-flex align-items-center">
                          <h5 class="mb-0 mr-1 text-primary">{{pokemon.set.name}}</h5>
                          <img
                            :src="pokemon.set.images.symbol"
                            width="18"
                          />
                        </div>
                      </div>
                      <p v-else class="mb-0 font-weight-bold">N/A</p>
                  </div>
                </div>
              </div>

              <!-- section footer -->
              <div class="mt-5">
                <button @click="openModal = false" class="btn btn-primary w-100">Close</button>
              </div>

            </div>
          </div>
        </div>
      </div>
      <button @click="openModal = false" :class="$style.closeBtn">
        <b-icon-x font-size="2rem"/>
      </button>
    </pop-up-modal>
  </button>
</template>

<script>
import PopUpModal from './PopUpModal.vue'
import { TypesImage } from '../utils/enums'
import { splitCamelCase } from '../utils/helpers'

export default {
  components: { PopUpModal },
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
  methods: {
    getTypePhoto (type) {
      return TypesImage.getPhotoUrl(type)
    },
    splitCamelCase (str) {
      return splitCamelCase(str)
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
  display: block;
  width: 100%;
  position: relative;
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

  &:hover {
    transform: scale(1.1);
  }
}

.detail {
  padding: 2rem 1rem;
  height: calc(100vh - 4rem);
  width: calc(100vw - 2rem);
  overflow: auto;

  .pokemonCard {
    border-radius: 1rem;
    &:hover {
      transform: none;
    }
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
