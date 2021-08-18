<template>
  <div class="container">
    <search-bar
      v-model="search"
      @onSubmit="submitSearch"
    />
    <b-form-checkbox-group
      v-model="filterType"
    >
      <b-form-checkbox
        v-for="item in dummyData"
        :key="item"
        :value="item"
      >
        {{ item }}
      </b-form-checkbox>
    </b-form-checkbox-group>

    <b-pagination
      v-model="currentPage"
      :total-rows="listCardConfig.totalData"
      :per-page="20"
    />

    <ul v-if="!listCardConfig.isLoading">
      <li v-for="card in cards" :key="card.id">{{ card.name }}</li>
    </ul>
    <p v-else>loading..</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { CARDS_LOAD_REQUESTED, SET_LIST_CARDS_CONFIG, SET_LIST_CARDS_FILTER, SET_PAGE } from '../store/card.module'
import SearchBar from './SearchBar.vue'

const dummyOptions = [
  'Colorless',
  'Darkness',
  'Dragon',
  'Fairy',
  'Fighting',
  'Fire',
  'Grass',
  'Lightning',
  'Metal',
  'Psychic',
  'Water'
]

export default {
  components: { SearchBar },
  name: 'home',
  data () {
    return {
      dummyData: dummyOptions,
      search: ''
    }
  },
  computed: {
    ...mapGetters([
      'filters',
      'listCardConfig',
      'cards'
    ]),
    filterType: {
      set (value) {
        this.$store.commit(SET_LIST_CARDS_FILTER, {
          key: 'types',
          value
        })
      },
      get () {
        return this.filters.types
      }
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
        rarities: this.filters.rarities,
        sets: this.filters.sets,
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
      rarities: this.filters.rarities,
      sets: this.filters.sets,
      page: this.listCardConfig.page
    })
      .catch(() => {})
  },
  created () {
    // watch mutation type SET_LIST_CARDS_FILTER -> every change in filters will trigger fetching api
    // watch mutation type SET_PAGE -> trigger fetching api
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === SET_LIST_CARDS_FILTER || mutation.type === SET_PAGE) {
        const { search, page, filters: { types, rarities, sets } } = state.card.listCardConfig
        this.$store.dispatch(CARDS_LOAD_REQUESTED, {
          search,
          types,
          rarities,
          sets,
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
.testModuleScss {
  color: $blue;
}
</style>
