<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-3">

        <div :class="$style.filterCardWrapper">
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
        </div>
      </div>

      <div class="col-12 col-md-9">
        <div class="py-4">
          <search-bar
            class="mb-3"
            v-model="search"
            @onSubmit="submitSearch"
          />

          <div v-if="!listCardConfig.isLoading">
            <p>
              Showing {{ listCardConfig.totalData }} card(s)
              <span v-if="Boolean(listCardConfig.search)">
                for
                <span class="font-weight-bold"> "{{ listCardConfig.search }}"</span>
              </span>
              (
              <span class="font-weight-bold"> {{ currentPage }} </span>
              to
              <span class="font-weight-bold"> {{ Math.ceil(listCardConfig.totalData / 20) }}</span>
              )
            </p>
            <b-pagination
              align="center"
              v-model="currentPage"
              :total-rows="listCardConfig.totalData"
              :per-page="20"
            />
          </div>

          <ul v-if="!listCardConfig.isLoading">
            <li v-for="card in cards" :key="card.id">{{ card.name }}</li>
          </ul>
          <p v-else>loading..</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { CARDS_LOAD_REQUESTED, SET_LIST_CARDS_CONFIG, SET_LIST_CARDS_FILTER, SET_PAGE } from '../../store/card.module'
import { TYPES_LOAD_REQUESTED } from '../../store/type.module'
import { RARITIES_LOAD_REQUESTED } from '../../store/rarity.module'
import { SETS_LOAD_REQUESTED } from '../../store/set.module'
import FilterCard from './FilterCard.vue'
import SearchBar from './SearchBar.vue'

export default {
  components: { SearchBar, FilterCard },
  name: 'home',
  data () {
    return {
      search: ''
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

      this.$store.dispatch(CARDS_LOAD_REQUESTED, {
        search: this.search,
        types: this.filters.types,
        rarity: this.filters.rarity,
        set: this.filters.set,
        page: 1
      })
        // if success, reset page to firstpage and save search to store
        .then(() => {
          this.$store.commit(SET_LIST_CARDS_CONFIG, { key: 'page', value: 1 })
          this.$store.commit(SET_LIST_CARDS_CONFIG, { key: 'search', value: this.search })
        })
        .catch(() => {})
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
}
</style>