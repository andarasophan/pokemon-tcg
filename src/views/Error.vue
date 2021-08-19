<template>
  <div :class="$style.errorPage" class="container-fluid">
    <error-view
      class="p-0"
      title="404 Not Found"
      subtitle="Oops something when wrong"
      bootstrapIcon="exclamation-square-fill"
    />
    <b-button class="mt-3" variant="primary" to="/">Back to home</b-button>
  </div>
</template>

<script>
import ErrorView from '../components/ErrorView.vue'

export default {
  name: 'ErrorPage',
  components: { ErrorView }
}
</script>

<style module lang="scss">
.errorPage {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
