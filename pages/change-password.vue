<template>
  <v-container grid-list-lg class="dashboard-wrapper">
    <div class="headline mb-5 font-weight-medium">CHANGE PASSWORD</div>

        <v-card xs6 flat>
          <v-card-text>
            <v-alert
              :value="true"
              type="error"
              style="margin-bottom:40px;"
              v-if="errors != null"
            >
              Please fix the following errors<br>
              <ul v-if="typeof errors != 'string'">
                <li v-for="(error, i) in errors" :key="i" >{{ error[0] }}</li>
              </ul>
              <span v-else>{{ errors }}</span>
            </v-alert>

            <v-form v-model="valid">
              <v-flex xs6 sm6 md6>
                <div class="caption font-weight-bold mb-1">
                  Old Password
                  <span class="text-danger">*</span>
                </div>
                <v-text-field
                  type="password"
                  :rules="oldpasswordRules"
                  v-model="resetModel.current_password"
                  outline
                >
                  <div class slot="label">Enter your old password here</div>
                </v-text-field>
              </v-flex>
              <v-flex xs6 sm6 md6>
                <div class="caption font-weight-bold mb-1">
                  New Password
                  <span class="text-danger">*</span>
                </div>
                <v-text-field
                  type="password"
                  :rules="oldpasswordRules"
                  v-model="resetModel.password"
                  outline
                >
                  <div class slot="label">Enter your new password here</div>
                </v-text-field>
              </v-flex>
              <v-flex xs6 sm6 md6>
                <div class="caption font-weight-bold mb-1">
                  Confirm New Password
                  <span class="text-danger">*</span>
                </div>
                <v-text-field
                  type="password"
                  :rules="confirmpasswordRules"
                  v-model="resetModel.password_confirmation"
                  outline
                >
                  <div class slot="label">Confirm your new password</div>
                </v-text-field>
              </v-flex>

              <v-flex xs6 sm6 md6>
                <v-btn
                  mt-1
                  small
                  flat
                  block
                  round
                  :loading="loading"
                  :disabled="loading || !valid"
                  @click="changePassword"
                  class="secondary caption"
                >Submit</v-btn>
              </v-flex>
            </v-form>
          </v-card-text>
        </v-card>

  </v-container>
</template>

<style lang="scss" scoped>
.user-item {
  font-size: 1em;
  padding: 6px 0 6px 27px;
  border-bottom: #dcdcdc solid 1px;
}
.user-item-text {
  font-size: 1em;
  padding: 6px 0 6px 27px;
  border-bottom: #eeeeee solid 1px;
}
</style>

<script>
export default {
  layout: 'user',
  data() {
    return {
      valid: false,
      loading: false,
      errors: null,
      resetModel: {
        current_password: '',
        password: '',
        password_confirmation: ''
      },
      oldpasswordRules: [v => !!v || 'Old password is required'],
      newpasswordRules: [v => !!v || 'New password is required'],
      confirmpasswordRules: [v => !!v || 'Confirm password is required']
    }
  },

  computed: {
  },

  watch: {},

  created() {
  },

  mounted() {
    //this.getUserProfile();
  },

  methods: {
    changePassword() {
      if (navigator.onLine) {
        this.loading = true;
        this.$axios.$post('/settings/change-password', this.resetModel).then(
          res => {
            this.loading = false;
            this.errors = null;
            this.$toast.success("Your password has been successfully changed!")
          },
          error => {
            this.loading = false;
            this.errors = error.response.data.error
          }
        )
      } else {
        this.$toast.error(
          'Please Check your Internet Connection and Try Again!'
        )
      }
    }
  }
}
</script>
