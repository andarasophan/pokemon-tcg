<template>
  <div class="container">
    <h1 :class="$style.testModuleScss">home</h1>
    <b-form-input placeholder="Testing Bootstrap" />
    <hello-world/>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'

export default {
  name: 'home',
  components: { HelloWorld },
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
