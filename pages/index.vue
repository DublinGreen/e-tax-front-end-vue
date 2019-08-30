<template>
  <v-container fluid fill-height class="d-block">
    <v-layout align-center justify-center>
      <v-flex xs12 md7 lg6 offset-md3 offset-sm3>
        <nuxt-link to="/">
          <v-img src="/anscims-logo.svg" class="mx-auto mb-2" width="300"></v-img>
        </nuxt-link>
        <v-sheet class="my-shadow curved-edges pa-5">
          <div
            class="secondary--text mb-4 text-xs-center"
          >Enter email address or Username to sign in</div>

          <v-form ref="authForm" v-model="authValid" v-on:submit.prevent="authenticate">
            <v-layout row wrap>
              <v-flex xs12 sm3 mt-1 :text-xs-right="this.$vuetify.breakpoint.smAndUp">
                <div class="caption mb-1 secondary--text">Email:</div>
              </v-flex>
              <v-flex xs12 sm9 :pl-2="this.$vuetify.breakpoint.smAndUp">
                <v-text-field
                  placeholder="Enter your email"
                  :rules="emailRules"
                  v-model="credentiails.email"
                  required
                  autofocus
                  outline
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex xs12 sm3 mt-1 :text-xs-right="this.$vuetify.breakpoint.smAndUp">
                <div class="caption mb-1 secondary--text">Password:</div>
              </v-flex>
              <v-flex xs12 sm9 :pl-2="this.$vuetify.breakpoint.smAndUp">
                <v-text-field
                  placeholder="Enter your password"
                  type="password"
                  :rules="passwordRules"
                  v-model="credentiails.password"
                  required
                  autocomplete="new-password"
                  outline
                ></v-text-field>
              </v-flex>
            </v-layout>

            <v-layout row wrap class="remember-me" :mb-4="this.$vuetify.breakpoint.xsOnly">
              <v-flex sm3 xs12></v-flex>
              <v-flex :pl-2="this.$vuetify.breakpoint.smAndUp" xs12 sm9>
                <v-layout>
                  <!-- <v-checkbox class="hidden-xs-only" color="secondary">
                    <div slot="label" class="caption secondary--text">Remember me</div>
                  </v-checkbox> -->

                  <!-- <span class="secondary--text caption">
                    <nuxt-link class="secondary--text" to="/register">Register here</nuxt-link>
                  </span> -->
                </v-layout>
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex xs12 sm3></v-flex>
              
              <v-flex :pl-2="this.$vuetify.breakpoint.smAndUp" xs12 sm9 text-xs-center>
                <span class="text--secondary caption" style="text-align:center">
                  <nuxt-link
                    to="/forgot-password"
                    class="secondary--text"
                  >Forgot password?</nuxt-link>
                </span>
                <v-btn
                  :loading="loading"
                  :disabled="loading || !authValid"
                  type="submit"
                  dark
                  class="secondary caption"
                  flat
                  small
                  round
                  block
                >SIGN IN</v-btn>
                <span class="text--secondary caption" style="text-align:center">
                  <nuxt-link
                    to="/validate-receipt"
                    class="secondary--text"
                  >Click here to validate a receipt</nuxt-link>
                </span>
              </v-flex>
            </v-layout>
          </v-form>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      credentiails: {
        email: '',
        password: ''
      },
      loading: false,
      authValid: false,
      e3: true,
      e1: true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/.test(v) ||
          'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length > 1 || 'Must be at least 4 characters'
      ]
    }
  },
  methods: {
    async authenticate() {
      if (navigator.onLine) {
        this.loading = true
        this.$axios.$post('Common/auth', this.credentiails).then(
        // this.$axios.$post('Common/authenticate', this.credentiails).then(
          res => {
           
            // return
            console.log(res)
            if (res.status == true) {
              if(res.code === 1010) {
                // user needs to reset password
                localStorage.setItem('reset_password_details', JSON.stringify({
                  email: this.credentiails.email,
                  current_password: this.credentiails.password,
                  message: res.message
                })
              )
                this.$router.push(`/first-time-reset-password`)
              }
              else if(res.code === 1000){ // user already reset password
                console.log(res.data)
                  const { Token: token } = res.data;
                  this.$axios.setHeader('Authorization',`Bearer ${token}`)
                  
                  this.$store.dispatch('auth/keepuser', res.data)
                  // if it's a ministry then we need to save the ministr name for use in other sectors
                  res.data.user_role === 'MDA' ? (localStorage.setItem('_dk2ldd23kj2', res.data.user_role)) : '';
                  this.$router.push('/dashboard')
              
              }else{
                // return error message
              }

              // localStorage.setItem(
              //   'loginDetails',
              //   JSON.stringify({
              //     email: this.credentiails.email,
              //     message: res.message
              //   })
              // )
              // this.$router.push(`/input-token`)
            } else {
              this.$toast.error(res.message)
            }
          },
          error => {
            console.log(error)
            this.loading = false
            this.$toast.error(error.response.data.error)
          }
        )
      } else {
        this.$toast.error(
          'Please Check your Internet Connection and Try Again!'
        )
      }

      // if (this.$refs.authForm.validate()) {
      //   const { dispatch } = this.$store
      //   this.loading = true
      //   try {
      //     await dispatch('auth/authenticate', this.credentiails)
      //     this.$router.push(`/input-token`)
      //   } catch (e) {
      //     this.$toast.error(e.response)
      //   }
      // }
      // this.loading = false;
    }
  }
}
</script>
