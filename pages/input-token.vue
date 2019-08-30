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
          icon="lock"
        >
          {{ message }}
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
                <div class="caption font-weight-bold mb-1">Token <span class="text-danger">*</span></div>
                <v-text-field :rules="tokenRules" v-model="tokenModel.token" outline>
                  <div class="" slot="label">Enter your token here</div>
                </v-text-field>
              </v-flex>

              <v-flex xs12 sm12 md12 mx-auto>
                <v-btn mt-1 small flat block round :loading="loading" :disabled="loading || !valid" @click="validatetoken" class="secondary caption">Submit</v-btn>
                <v-btn mt-1 small flat block round :loading="resendingtoken" :disabled="resendingtoken" class="normal caption" @click="resendToken"><v-icon>refresh</v-icon> Resend Token</v-btn>
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
      resendingtoken: false,
      openModal: true,
      errors: null,
      message: '',
      tokenModel: {
        token: '',
        email: ''
      },
      resendTokenModel: {
        email: ''
      },
      tokenRules: [
        v => !!v || 'Token is required',
      ],
    }
  },

  created: function() {
      if (localStorage.getItem('loginDetails')) {
        let loginDetails = JSON.parse(localStorage.getItem('loginDetails'));
        this.tokenModel.email = this.resendTokenModel.email = loginDetails.email;
        this.message = loginDetails.message;
      } else {
        this.$router.push('/');
      }
  },

  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    resendToken() {
      this.resendingtoken = true;
      this.$axios.$post('Common/resend-soft-token', this.resendTokenModel).then(res => {
        this.resendingtoken = false;
        this.$toast.success("A soft token has been sent to your email");
      }, error => {
        this.resendingtoken = false;
        this.$toast.error("Could not send token at this time.");
      });
    },
    async validatetoken() {
        const { dispatch } = this.$store
        this.loading = true
        try {
          await dispatch('auth/authenticate', this.tokenModel)
          this.$router.push(`/dashboard`)
        } catch (e) {
          this.$toast.error(e.response.data.message)
        }
      this.loading = false;
    }
  }
}
</script>
