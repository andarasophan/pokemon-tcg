<template>
  <div class="container">
    <search-bar
      v-model="search"
      @onSubmit="submitSearch"
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

export default {
  components: { SearchBar },
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
      'cards'
    ]),
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
    this.axios('/cards')
      .then(({ data: { data, totalCount, count } }) => console.log(data, totalCount, count))
      .catch(() => {})
  }
}
</script>

<style module lang="scss">
.testModuleScss {
  color: $blue;
}
</style>
