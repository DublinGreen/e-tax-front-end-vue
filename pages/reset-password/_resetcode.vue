
<template>
<v-container grid-list-xs class="dashboard-wrapper">

  <v-dialog
      width="350"
      v-model="openModal"
      persistent
      text-xs-center
    >
      <v-card text-xs-center style="padding-top:20px;">
        <v-img src="/anscims-logo.svg" width="160" class="mx-auto mb-4 mt-3"></v-img>
        <v-alert
          :value="true"
          color="blue"
          icon="lock_open"
        >
          Reset your password
          <!-- Please Enter Your Login Token -->
        </v-alert>

        <v-card-text >

          <v-alert
            :value="true"
            type="error"
            style="margin-bottom:40px;"
            v-if="errors != null"
          >
            Please fix the following errors
            <ul>
              <li v-for="(error, i) in errors" :key="i" >{{ error[0] }}</li>
            </ul>
          </v-alert>

          <v-form v-model="valid">
            <v-layout row wrap>
              <v-flex xs12 sm12 md12>
                <div class="caption font-weight-bold mb-1">Enter your new password <span class="text-danger">*</span></div>
                <v-text-field type="password" :rules="passwordRules" v-model="formModel.password" outline>
                  <div class="" slot="label">Enter your new password here</div>
                </v-text-field>
              </v-flex>

              <v-flex xs12 sm12 md12>
                <div class="caption font-weight-bold mb-1">Confirm your new password <span class="text-danger">*</span></div>
                <v-text-field type="password" :rules="passwordConfirmationRules" v-model="formModel.password_confirmation" outline>
                  <div class="" slot="label">Confirm your new password here</div>
                </v-text-field>
              </v-flex>

              <v-flex xs12 sm12 md12 mx-auto>
                <v-btn mt-1 small flat block round :loading="loading" :disabled="loading || !valid" @click="sendEmail" class="secondary caption">Submit</v-btn>
                <v-btn mt-1 small flat block round to="/" class="default caption">Cancel</v-btn>
              </v-flex>
            </v-layout>
          </v-form>

        </v-card-text>

      </v-card>
    </v-dialog>

</v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      loading: false,
      openModal: true,
      errors: null,
      message: '',
      formModel: {
        email: this.$router.currentRoute.query.uid,
        token: this.$router.currentRoute.params.resetcode,
        password: '',
        password_confirmation: ''
      },
      passwordRules: [
        v => !!v || 'Password is required',
      ],
    }
  },

  created: function() {
  },

  computed: {
    passwordConfirmationRules() {
      return [
        () => (this.formModel.password === this.formModel.password_confirmation) || 'Password must match',
        v => !!v || 'Password confirmation is required'
      ];
    },
  },

  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    
    sendEmail() {
      this.loading = true;
      this.$axios.$post('Common/reset-password', this.formModel).then(res => {
        this.loading = false;
        this.$toast.success("Your password has been successfully changed!");
        this.$router.push('/');
      }, error => {
        this.resendingtoken = false;
        this.$toast.error("Could not reset your password.");
      });
    }
  }
}
</script>
