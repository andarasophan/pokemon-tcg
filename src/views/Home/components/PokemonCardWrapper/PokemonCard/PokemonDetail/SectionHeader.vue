<template>
  <div class="d-flex justify-content-between align-items-center">
    <div class="mr-2">
      <h2 class="font-weight-bold mb-0">{{ name }}</h2>
      <!-- some cards dont have subtypes -->
      <h5>{{ `${supertype}${Array.isArray(subtypes) ? ' - ' + subtypes.join(' ') : ''}` }}</h5>
    </div>
    <div class="d-flex align-items-center">
      <h5 v-if="hp" class="mb-0 mr-2">HP {{ hp }}</h5>
      <img
        v-for="type in types"
        :key="type"
        width="25"
        :src="getTypePhoto(type)"
      />
    </div>
  </div>
</template>

<script>
import { TypesImage } from '@/utils/enums'

export default {
  name: 'SectionHeader',
  props: {
    name: String,
    supertype: String,
    subtypes: Array,
    hp: String,
    types: Array
  },
  methods: {
    getTypePhoto (type) {
      return TypesImage.getPhotoUrl(type)
    }
  }
}
</script>
