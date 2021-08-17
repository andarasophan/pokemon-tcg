<template>
  <main>
    <div>
      <p>{{ currentUser }}</p>
      <b-button @click="logout">
        Log out
      </b-button>
    </div>
    <router-view/>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import { LOGOUT } from '../store/auth.module'

export default {
  name: 'Layout',
  methods: {
    logout () {
      this.$store.dispatch(LOGOUT)
        .then(() => this.$router.push({ name: 'Login' }))
    }
  },
  computed: {
    ...mapGetters([
      'currentUser'
    ])
  }
}
</script>
