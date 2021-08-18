<template>
  <main>
    <div :class="$style.header">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center">
          <img alt="" src="../assets/pokemon-logo.png">
            <b-dropdown
              right
              variant="link"
              no-caret
              toggle-class="text-decoration-none d-flex align-items-center"
            >
              <template #button-content>
                <span>{{ currentUser }}</span>
                <b-avatar variant="light" class="ml-2" :text="currentUser[0]" size="2rem"></b-avatar>
              </template>
              <b-dropdown-item @click="logout">Log out</b-dropdown-item>
            </b-dropdown>
        </div>
      </div>
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

<style module lang="scss">
  .header {
    position: sticky;
    top: 0;
    height: $header-height;
    background: white;
    box-shadow: 0 1px .6rem 0 rgba($gray-200, .5);
    z-index: 4;
    display: flex;
    align-items: center;

    img {
      height: 36px;
    }
  }
</style>
