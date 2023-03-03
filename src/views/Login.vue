<template>
  <div class="container-fluid">
    <div :class="$style.loginContainer" class="row">
      <div :class="$style.background" class="col-md-7"/>
      <div class="col-md-5">
        <b-form :class="$style.formWrapper" @submit="onSubmit">

          <div class="d-flex align-items-center mb-3 justify-content-between">
            <img class="mr-3" height="50px" alt="" src="../assets/pokemon-logo.png">
            <h4 class="font-weight-bold text-black-50 mb-0">Login</h4>
          </div>

          <b-form-group
            label="Username"
            label-for="username"
            :invalid-feedback="usernameError"
            :state="usernameState"
            label-size="sm"
            label-class="mb-0 font-weight-bold"
          >
            <b-form-input
              id="username"
              v-model="username.value"
              :state="usernameState"
              @blur="setDirty('username')"
            />
          </b-form-group>

          <b-form-group
            label="Password"
            label-for="password"
            :invalid-feedback="passwordError"
            :state="passwordState"
            label-size="sm"
            label-class="mb-0 font-weight-bold"
          >
            <b-form-input
              id="password"
              v-model="password.value"
              :state="passwordState"
              @blur="setDirty('password')"
              type="password"
            />
          </b-form-group>

          <b-button
            class="d-flex align-items-center justify-content-center w-100 mt-4"
            type="submit"
            variant="outline-primary"
            pill
          >
            <b-spinner v-if="isLoading" class="mr-1" small/>
            Submit
          </b-button>

        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { LOGIN } from '../store/auth.module'

export default {
  name: 'Login',
  data () {
    return {
      username: {
        value: 'Demo',
        dirty: false
      },
      password: {
        value: 'demo',
        dirty: false
      },
      isLoading: false
    }
  },

  methods: {
    setDirty (key) {
      this[key].dirty = true
    },
    onSubmit (e) {
      e.preventDefault()

      // set all field to be dirty
      this.setDirty('username')
      this.setDirty('password')

      // if error exists, cancel submit
      if (this.usernameError || this.passwordError) return

      this.isLoading = true
      this.$store.dispatch(LOGIN, { username: this.username.value, password: this.password.value })
        .then(() => this.$router.push({ name: 'Home' }))
        .catch(() => { this.isLoading = false })
    }
  },

  computed: {
    usernameError () {
      if (this.username.value.length >= 4) return ''
      return 'Enter at least 4 characters.'
    },
    passwordError () {
      if (this.password.value.length >= 4) return ''
      return 'Enter at least 4 characters.'
    },

    // if input field not dirty return state null
    // else check is error

    // null displays no validation state (neither valid nor invalid)
    // true display valid
    // false displays invalid
    usernameState () {
      return !this.username.dirty ? null : !this.usernameError
    },
    passwordState () {
      return !this.password.dirty ? null : !this.passwordError
    }
  }
}
</script>

<style module lang="scss">
.loginContainer {
  min-height: 100vh;
  .background {
    background: url('../assets/pokemon-bg.jpg');
    background-size: cover;
    background-position: right;
    clip-path: polygon(0 0,90% 0,100% 100%,0 100%);
  }

  .formWrapper {
    padding: 3rem;
  }

  @include media-breakpoint-down(sm) {
    .background {
      display: none;
    }

    .formWrapper {
      padding: 4rem 2rem;
    }
  }
}
</style>
