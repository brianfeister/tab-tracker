<template>
  <div id="login">
    <form novalidate class="md-layout md-alignment-top-center" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-30 md-small-size-100">
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>

        <md-card-content>
          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
          </md-field>
          <md-field :class="getValidationClass('password')">
            <label for="password">Password</label>
            <md-input type="password" name="password" id="password" autocomplete="off" v-model="form.password" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
            <span class="md-error" v-else-if="!$v.form.password.password">Invalid password</span>
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Log In</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar
        :md-active.sync="userLoginFailed"
        :md-duration="Infinity"
        md-position="center"
        md-persistent
      >
        {{ userLoginFailedMsg }}
      </md-snackbar>
    </form>
  </div>
</template>

<script>
import Auth from '@/services/Auth'
import { validationMixin } from 'vuelidate'
import {
  required,
  email,
  minLength,
} from 'vuelidate/lib/validators'

export default {
  name: 'FormValidation',
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: null,
      password: null,
    },
    userLoginFailed: false,
    userLoggedIn: false,
    sending: false,
    userLoginFailedMsg: '',
    lastUser: null,
  }),
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8)
      }
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      this.$v.$reset()
      this.form.email = null
      this.form.password = null
    },
    timeout (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    async login () {
      try {
        this.sending = true
        this.userLoginFailed = false

        const res = await Auth.login({
          email: this.form.email,
          password: this.form.password,
        })

        this.$store.dispatch('setToken', res.data.token)
        this.$store.dispatch('setUser', res.data.user)

        this.lastUser = `${this.form.email}`
        this.userLoggedIn = true
        this.sending = false
        this.clearForm()
        this.$router.push('posts')
      } catch (e) {
        await this.timeout(1000)
        this.userLoginFailed = true
        this.userLoginFailedMsg = e
        this.sending = false
      }
    },
    async validateUser () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        await this.login()
        this.$v.$touch()
      }
    }
  }
}
</script>

<style>
#login {
  margin-top: 40px;
}
</style>
