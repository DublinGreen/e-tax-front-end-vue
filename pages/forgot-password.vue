
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
          Forgot Password?
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
                <div class="caption font-weight-bold mb-1">Enter your email address <span class="text-danger">*</span></div>
                <v-text-field :rules="emailRules" v-model="formModel.email" outline>
                  <div class="" slot="label">Enter your email here</div>
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
      resendingtoken: false,
      openModal: true,
      errors: null,
      message: '',
      formModel: {
        email: ''
      },
      emailRules: [
        v => !!v || 'Email is required',
      ],
    }
  },

  created: function() {
  },

  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    sendEmail() {
      this.loading = true;
      this.$axios.$post('Common/request-reset-password', this.formModel).then(res => {
        this.loading = false;
        this.$toast.success("An email has been sent to your mail.");
        this.$router.push('/');
      }, error => {
        this.loading = false;
        this.$toast.error("Could not send email at this time.");
      });
    }
  }
}
</script>
