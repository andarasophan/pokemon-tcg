<template>
  <div :class="$style.filterCard">
    <button @click="showDropdown = !showDropdown" :class="$style.header">
      <p>{{ title }}</p>
      <b-icon-chevron-compact-down variant="primary"/>
    </button>
    <b-collapse :visible="showDropdown">

    <div class="py-3 px-2">
      <template v-if="loading">
        <b-skeleton animation="wave" width="100%"/>
        <b-skeleton animation="wave" width="100%"/>
        <b-skeleton animation="wave" width="100%"/>
      </template>
      <template v-else>
        <b-form-checkbox-group
          v-if="inputType === 'checkbox'"
          v-model="filterModel"
        >
          <b-form-checkbox
            v-for="(item, i) in options"
            :key="`${item.value}-index-${i}`"
            :value="item.value"
          >
            {{ item.text }}
          </b-form-checkbox>
        </b-form-checkbox-group>

        <b-form-radio-group
          v-else-if="inputType === 'radio'"
          v-model="filterModel"
          :options="optionsForRadio"
        />
      </template>
    </div>

    </b-collapse>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { SET_LIST_CARDS_FILTER } from '../store/card.module'

export default {
  name: 'FilterCard',
  data () {
    return {
      showDropdown: true
    }
  },
  props: {
    title: String,
    filterKey: String,
    loading: Boolean,
    inputType: {
      type: String,
      default: () => 'checkbox'
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters([
      'filters'
    ]),
    // for radio, provide option all
    optionsForRadio () {
      return [{ text: 'All', value: 'ALL' }, ...this.options]
    },
    filterModel: {
      set (value) {
        this.$store.commit(SET_LIST_CARDS_FILTER, {
          key: this.filterKey,
          value
        })
      },
      get () {
        return this.filters[this.filterKey]
      }
    }
  }
}
</script>

<style module lang="scss">
.filterCard {
  border-top: 1px solid $gray-200;

  &:last-child {
    border-bottom: 1px solid $gray-200;
  }

  .header {
    padding: .5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: 0;
    color: $primary;

    position: sticky;
    top: 0;
    background: $white;
    z-index: 2;

    &:focus {
      outline: none;
    }

    p {
      margin-bottom: 0;
      font-weight: 700;
    }
  }
}
</style>
