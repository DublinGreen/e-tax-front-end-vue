<template>
<v-container fluid fill-height class="d-block">
  <v-layout align-center justify-center>
    <v-flex xs12 md6 offset-md3 offset-sm3>
      <nuxt-link to="/">
        <v-img src="/anscims-logo.svg" class="mx-auto mb-2" width="300"></v-img>
      </nuxt-link>
      <v-sheet height="" class="my-shadow curved-edges pa-5">
        <div class="secondary--text mb-4 text-xs-center">UPDATE PASSWORD</div>

        <v-form v-model="authValid" v-on:submit.prevent="">
          <v-layout row wrap>
            <v-flex xs12 sm3 mt-1 :text-xs-right="this.$vuetify.breakpoint.smAndUp">
              <div class="caption mb-1 secondary--text">Email:</div>
            </v-flex>
            <v-flex xs12 sm9 :pl-2="this.$vuetify.breakpoint.smAndUp">
              <v-text-field :rules="emailRules" v-model="email" name="email" required autofocus outline></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 sm3 mt-1 :text-xs-right="this.$vuetify.breakpoint.smAndUp">
              <div class="caption mb-1 secondary--text">Current password:</div>
            </v-flex>
            <v-flex xs12 sm9 :pl-2="this.$vuetify.breakpoint.smAndUp">
              <v-text-field type="password" :rules="passwordRules" v-model="currentPassword" name="password" required autocomplete="new-password" outline></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 sm3 mt-1 :text-xs-right="this.$vuetify.breakpoint.smAndUp">
              <div class="caption mb-1 secondary--text">New password:</div>
            </v-flex>
            <v-flex xs12 sm9 :pl-2="this.$vuetify.breakpoint.smAndUp">
              <v-text-field type="password" :rules="passwordRules" v-model="newPassword" name="password" required autocomplete="new-password" outline></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 sm3 mt-1 :text-xs-right="this.$vuetify.breakpoint.smAndUp">
              <div class="caption mb-1 secondary--text">Confirm password:</div>
            </v-flex>
            <v-flex xs12 sm9 :pl-2="this.$vuetify.breakpoint.smAndUp">
              <v-text-field type="password" :rules="passwordRules" v-model="confirmPassword" name="password" required autocomplete="new-password" outline></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 sm3></v-flex>
            <v-flex xs12 sm9>
              <v-btn dark class="secondary caption" type="submit" flat small round block>CONTINUE</v-btn>
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
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      loading: false,
      authValid: false,
      e3: true,
      e1: true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v.length > 1) || 'Must be at least 4 characters'
      ]
    }
  },
}
</script>
