<template>
  <div class="container">
    <h1>Login</h1>
    <b-form @submit="onSubmit">
      <b-form-group
        label="Username"
        label-for="username"
        :invalid-feedback="usernameError"
        :state="usernameState"
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
        class="d-flex align-items-center justify-content-center w-100"
        type="submit"
        variant="primary"
      >
        <b-spinner v-if="isLoading" class="mr-1" small/>
        Submit
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { LOGIN } from '../store/auth.module'

export default {
  name: 'Login',
  data () {
    return {
      username: {
        value: '',
        dirty: false
      },
      password: {
        value: '',
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
