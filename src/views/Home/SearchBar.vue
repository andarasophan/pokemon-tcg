<template>
  <b-form @submit.prevent="$emit('onSubmit', $event)">
    <b-input-group>
      <b-form-input
        v-model="model"
      />
      <b-input-group-append>
        <b-button type="submit" variant="primary">Search</b-button>
      </b-input-group-append>
    </b-input-group>
  </b-form>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    value: String
  },
  computed: {
    model: {
      // parent will pass v-model which will translate to this :value= & @input=
      // thats why this component accept prop 'value' & can emit 'input'
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
