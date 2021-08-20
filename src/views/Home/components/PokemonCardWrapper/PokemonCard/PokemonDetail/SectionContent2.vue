<template>
  <div>
    <!-- attacks -->
    <div v-if="attacks" class="mb-3">
      <small>ATTACKS</small>
      <div
        class="mt-2"
        v-for="(attack, i) in attacks"
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
        <template v-if="weaknesses">
          <div
            class="d-flex align-items-center py-1"
            v-for="(weakness, i) in weaknesses"
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
        <template v-if="resistances">
          <div
            class="d-flex align-items-center py-1"
            v-for="(resistance, i) in resistances"
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
        <div class="py-1" v-if="retreatCost">
          <img
            v-for="(retreatCost, i) in retreatCost"
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
        <h5 class="mb-0" v-if="artist">{{artist}}</h5>
        <p v-else class="mb-0 font-weight-bold">N/A</p>
      </div>

      <div class="col py-2">
        <small>RARITY</small>
        <h5 class="mb-0" v-if="rarity">{{rarity}}</h5>
        <p v-else class="mb-0 font-weight-bold">N/A</p>
      </div>

      <div class="col py-2">
        <small>SET</small>
          <div v-if="set">
            <div class="d-flex align-items-center">
              <h5 class="mb-0 mr-1 text-primary">{{set.name}}</h5>
              <img
                :src="set.images.symbol"
                width="18"
              />
            </div>
          </div>
          <p v-else class="mb-0 font-weight-bold">N/A</p>
      </div>
    </div>
  </div>
</template>

<script>
import { TypesImage } from '@/utils/enums'

export default {
  name: 'SectionContent2',
  props: {
    attacks: Array,
    weaknesses: Array,
    resistances: Array,
    retreatCost: Array,
    artist: String,
    rarity: String,
    set: Object
  },
  methods: {
    getTypePhoto (type) {
      return TypesImage.getPhotoUrl(type)
    }
  }
}
</script>
