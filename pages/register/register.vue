<template>
<v-container fluid fill-height class="d-block">
  <v-layout align-center justify-center>
    <v-flex xs12 md6 offset-md3 offset-sm3>
      <nuxt-link to="/">
        <v-img src="/anscims-logo.svg" class="mx-auto mb-2" width="300"></v-img>
      </nuxt-link>

      <v-layout justify-space-between align-center>
        <nuxt-link to='/register/mdas'>
          <v-flex md5 align-center align-content-center>
              <v-card class="curved-cards pa-5">
                <v-icon size="64">account_box</v-icon>
                <div class='display-1'>MDAs</div>
              </v-card>
          </v-flex>
        </nuxt-link>
      <v-flex md5>
        <nuxt-link to="/register/tax-authority">
          <v-card class="curved-cards p-5 align-center">
            <v-icon size="64">account_circle</v-icon>
            Tax Authority
          </v-card>
        </nuxt-link>
      </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import { registration } from '@/utils/route'

export default {
  data() {
    return {
      credentials: {
        'ZipCode': '',
        'FirstName': '',
        'LastName': '',
        'Email': '',
        'Address': '',
        'MobilePhone': ''
      },
      loading: false,
      authValid: false,
      e3: true,
      e1: true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v.length > 1) || 'Must be at least 4 characters'
      ]
    }
  },
  methods: {
    async register() {
      // if (this.$refs.regForm.validate()) {
        try {
          const response = await this.$axios.$post(registration, this.credentials)
          const { Email, GeneratedPwd } = response
          const data = {
            email: Email,
            password: GeneratedPwd
          }
          const { dispatch } = this.$store
          await dispatch('auth/authenticate', data)
          this.$router.push(`/dashboard`)
        } catch (e) {
          this.$toast.error(e.response)
        }
      // }
    }
  }
}
</script>
