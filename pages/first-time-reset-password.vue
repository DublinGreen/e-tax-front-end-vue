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
                <div class="caption font-weight-bold mb-1">Password <span class="text-danger">*</span></div>
                <v-text-field type="password" :rules="password_rules" v-model="reset_password.password" outline>
                  <div class="" slot="label">Password</div>
                </v-text-field>
                <div class="caption font-weight-bold mb-1">Confirm Password <span class="text-danger">*</span></div>

                <v-text-field type="password" :rules="confirm_password_rules" v-model="reset_password.password_confirmation" outline>
                  <div class="" slot="label">Confirm password</div>
                </v-text-field>
              </v-flex>

              <v-flex xs12 sm12 md12 mx-auto>
                <v-btn mt-1 small flat block round :loading="loading" :disabled="loading || !valid" @click="resetPassword" class="secondary caption">Submit</v-btn>
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
      reset_password:{
        password:'',
        password_confirmation:'',
        current_password:null,
        email:null,
      },
      valid: false,
      loading: false,
      resendingtoken: false,
      openModal: true,
      errors: null,
      message: '',
      password_rules:[
       v => !!v || 'Password is required',
        v => v.length > 1 || 'Must be at least 4 characters'
      ],
      confirm_password_rules:[
        v => !!v || 'Confirm Password is required',
        v => v.length > 1 || 'Must be at least 4 characters'
      ]
    }
  },

  created: function() {
      if (localStorage.getItem('reset_password_details')) {
        let reset_password_details = JSON.parse(localStorage.getItem('reset_password_details'));
        this.reset_password.email = reset_password_details.email;
        this.reset_password.current_password = reset_password_details.current_password;
        this.message = reset_password_details.message;
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
    // resendToken() {
    //   this.resendingtoken = true;
    //   this.$axios.$post('Common/resend-soft-token', this.resendTokenModel).then(res => {
    //     this.resendingtoken = false;
    //     this.$toast.success("A soft token has been sent to your email");
    //   }, error => {
    //     this.resendingtoken = false;
    //     this.$toast.error("Could not send token at this time.");
    //   });
    // },
    async resetPassword() {
        const { dispatch } = this.$store
        this.loading = true
        this.$axios.$post('Common/first-time-reset-password', this.reset_password).then(res => {
          const { Token: token } = res.data;
          this.$axios.setHeader('Authorization',`Bearer ${token}`)
          
          this.$store.dispatch('auth/keepuser', res.data)
          this.$router.push('/dashboard');
        }, error => {
          this.$toast.error(e.response.data.message);
        });
      this.loading = false;
    }
  }
}
</script>
