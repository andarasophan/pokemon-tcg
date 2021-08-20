<template>
  <div>
    <h3 class="mb-3">Prices</h3>
    <div class="mb-2" v-if="tcgplayer">
      <div>
        <h5 class="text-primary font-weight-bold mb-0">From TCGplayer</h5>
        <p class="mb-0 text-muted">Last Updated {{ tcgplayer.updatedAt }}</p>
      </div>
      <template v-if="Object.keys(tcgplayer.prices).length">
        <div
          class="row"
          v-for="price in Object.keys(tcgplayer.prices)"
          :key="price"
        >
          <div
            class="col py-2"
            v-for="el in ['market', 'low', 'mid', 'high']"
            :key="el"
          >
            <small class="text-uppercase">{{splitCamelCase(price)}} {{el}}</small>
            <h5 class="mb-0">${{ tcgplayer.prices[price][el] }}</h5>
          </div>
        </div>
      </template>
      <p class="mt-2 font-weight-bold" v-else>N/A</p>
    </div>

    <div class="mb-2" v-if="cardmarket">
      <div>
        <h5 class="text-primary font-weight-bold mb-0">From Cardmarket</h5>
        <p class="mb-0 text-muted">Last Updated {{ cardmarket.updatedAt }}</p>
      </div>
      <div class="row">
        <div class="col py-2">
          <small>PRICE TREND</small>
          <h5 class="mb-0">{{ cardmarket.prices.trendPrice }}€</h5>
        </div>
        <div class="col py-2">
          <small>1 DAY AVERAGE</small>
          <h5 class="mb-0">{{ cardmarket.prices.avg1 }}€</h5>
        </div>
        <div class="col py-2">
          <small>7 DAY AVERAGE</small>
          <h5 class="mb-0">{{ cardmarket.prices.avg7 }}€</h5>
        </div>
        <div class="col py-2">
          <small>30 DAY AVERAGE</small>
          <h5 class="mb-0">{{ cardmarket.prices.avg30 }}€</h5>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import { splitCamelCase } from '@/utils/helpers'

export default {
  name: 'SectionContent1',
  props: {
    tcgplayer: Object,
    cardmarket: Object
  },
  methods: {
    splitCamelCase (str) {
      return splitCamelCase(str)
    }
  }
}
</script>
