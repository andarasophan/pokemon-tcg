<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-3">

        <div :class="[$style.filterCardWrapper, { [$style.showFilterMobile]: showFilterMobile } ]">
          <div class="py-4">
            <filter-card
              inputType="checkbox"
              title="Types"
              filterKey="types"
              :options="types"
              :loading="gettingTypes"
            />
            <filter-card
              inputType="radio"
              title="Rarities"
              filterKey="rarity"
              :options="rarities"
              :loading="gettingRarities"
            />
            <filter-card
              inputType="radio"
              title="Sets"
              filterKey="set"
              :options="sets"
              :loading="gettingSets"
            />
          </div>
          <div :class="$style.bottomMenuMobile">
            <button @click="showFilterMobile = false" class="btn btn-primary">Close</button>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-9">
        <div class="py-4">
          <search-bar
            class="mb-3"
            v-model="search"
            @onSubmit="submitSearch"
          />

          <div class="mb-3">
            <filter-tag
              v-if="filters.set !== 'ALL'"
              :text="filters.set"
              @onClose="setCardFilter('set', 'ALL')"
            />
            <filter-tag
              v-if="filters.rarity !== 'ALL'"
              :text="filters.rarity"
              @onClose="setCardFilter('rarity', 'ALL')"
              variant="primary"
            />
            <filter-tag
              v-for="(type, i) in filters.types"
              :key="`filterTag-${i}-${type}`"
              :text="type"
              variant="warning"
              @onClose="setCardFilter('types', filters.types.filter(el => el !== type))"
            />
          </div>

          <div class="d-flex align-items-center mb-3 justify-content-between">
            <p class="mb-0 mr-3">
              Showing {{ listCardConfig.totalData }} card(s)
              <span v-if="Boolean(listCardConfig.search)">
                for
                <span class="font-weight-bold"> "{{ listCardConfig.search }}"</span>
              </span>
              (
              <span class="font-weight-bold"> {{ currentPage }} </span>
              to
              <span class="font-weight-bold"> {{ Math.ceil(listCardConfig.totalData / 20) ? Math.ceil(listCardConfig.totalData / 20) : 1 }}</span>
              )
            </p>
            <button :class="$style.filterBtnMobile" class="btn btn-outline-primary rounded-pill" @click="showFilterMobile = true">
              filter
            </button>
          </div>

          <b-pagination
            align="center"
            v-model="currentPage"
            :total-rows="listCardConfig.totalData"
            :per-page="20"
            pills
          />

          <pokemon-card-wrapper
            :pokemons="cards"
            :loading="listCardConfig.isLoading"
          />

          <b-pagination
            class="mb-0 mt-3"
            align="center"
            v-model="currentPage"
            :total-rows="listCardConfig.totalData"
            :per-page="20"
            pills
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { CARDS_LOAD_REQUESTED, SET_LIST_CARDS_CONFIG, SET_LIST_CARDS_FILTER, SET_PAGE } from '../store/card.module'
import { TYPES_LOAD_REQUESTED } from '../store/type.module'
import { RARITIES_LOAD_REQUESTED } from '../store/rarity.module'
import { SETS_LOAD_REQUESTED } from '../store/set.module'
import FilterCard from '../components/FilterCard.vue'
import SearchBar from '../components/SearchBar.vue'
import FilterTag from '../components/FilterTag.vue'
import PokemonCardWrapper from '../components/PokemonCardWrapper.vue'

export default {
  components: { SearchBar, FilterCard, FilterTag, PokemonCardWrapper },
  name: 'home',
  data () {
    return {
      search: '',
      showFilterMobile: false
    }
  },
  watch: {
    // watch value showFilterMobile, scroll outside filterCardWrapper will be hidden
    showFilterMobile (val) {
      if (val) document.body.classList.add('overflow-hidden')
      else document.body.classList.remove('overflow-hidden')
    }
  },
  computed: {
    ...mapGetters([
      'filters',
      'listCardConfig',
      'cards',
      'typeOptions',
      'gettingTypes',
      'rarityOptions',
      'gettingRarities',
      'setOptions',
      'gettingSets'
    ]),
    types () {
      return this.typeOptions.map(el => ({ text: el, value: el }))
    },
    rarities () {
      return this.rarityOptions.map(el => ({ text: el, value: el }))
    },
    sets () {
      return this.setOptions.map(el => ({ text: el.name, value: el.id }))
    },
    currentPage: {
      set (value) {
        this.$store.commit(SET_PAGE, value)
      },
      get () {
        return this.listCardConfig.page
      }
    }
  },
  methods: {
    submitSearch (e) {
      // if search empty, cancel submit
      if (!this.search) return

      const newSearch = this.search

      this.$store.dispatch(CARDS_LOAD_REQUESTED, {
        search: newSearch,
        types: this.filters.types,
        rarity: this.filters.rarity,
        set: this.filters.set,
        page: 1
      })
        // if success, reset page to firstpage and save search to store
        .then(() => {
          this.$store.commit(SET_LIST_CARDS_CONFIG, { key: 'page', value: 1 })
          this.$store.commit(SET_LIST_CARDS_CONFIG, { key: 'search', value: newSearch })
        })
        .catch(() => {})
    },
    setCardFilter (key, value) {
      this.$store.commit(SET_LIST_CARDS_FILTER, { key, value })
    }
  },
  mounted () {
    // initial fetch cards
    this.$store.dispatch(CARDS_LOAD_REQUESTED, {
      search: this.listCardConfig.search,
      types: this.filters.types,
      rarity: this.filters.rarity,
      set: this.filters.set,
      page: this.listCardConfig.page
    })
      .catch(() => {})

    // initial fetch get types
    this.$store.dispatch(TYPES_LOAD_REQUESTED).catch(() => {})

    // initial fetch get sets
    this.$store.dispatch(SETS_LOAD_REQUESTED).catch(() => {})

    // initial fetch get rarities
    this.$store.dispatch(RARITIES_LOAD_REQUESTED).catch(() => {})
  },
  created () {
    // watch mutation type SET_LIST_CARDS_FILTER -> every change in filters will trigger fetching api
    // watch mutation type SET_PAGE -> trigger fetching api
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === SET_LIST_CARDS_FILTER || mutation.type === SET_PAGE) {
        const { search, page, filters: { types, rarity, set } } = state.card.listCardConfig
        this.$store.dispatch(CARDS_LOAD_REQUESTED, {
          search,
          types,
          rarity,
          set,
          page
        })
          .catch(() => {})
      }
    })
  },
  beforeDestroy () {
    this.unsubscribe()
  }
}
</script>

<style module lang="scss">
.filterCardWrapper {
  height: calc(100vh - #{$header-height});
  overflow: auto;
  position: sticky;
  top: $header-height;
  background-color: white;

  .bottomMenuMobile {
    position: sticky;
    bottom: 0;
    background-color: $white;
    z-index: 1;
    padding: 1rem 0;
    display: none;
    justify-content: center;
    margin: 0 -3rem;
  }

  @include media-breakpoint-down(sm) {
    display: none;
    border: none;
    position: fixed !important;
    top: 0;
    min-height: 100vh;
    height: 100%;
    overflow-y: auto;
    left: 0;
    right: 0;
    z-index: 4;
    padding: 0 3rem;

    .bottomMenuMobile {
      display: flex;
    }

    &.showFilterMobile {
      display: block;
    }
  }
}
.filterBtnMobile {
  display: none;

  @include media-breakpoint-down(sm) {
    display: block;
  }
}
</style>
