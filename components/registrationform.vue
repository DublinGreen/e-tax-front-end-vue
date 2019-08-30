<template>
<v-container fluid fill-height class="d-block">
  <v-layout align-center justify-center>
    <v-flex xs12 md7 lg6 offset-md3 offset-sm3>
      <!-- <nuxt-link to="/">
        <v-img src="/anscims-logo.svg" class="mx-auto mb-2" width="300"></v-img>
      </nuxt-link> -->
      <v-img src="/anscims-logo.svg" class="mx-auto mb-2" width="300"></v-img>
      <v-sheet class="my-shadow curved-edges pa-4">
        <h5 class="headline mb-2 text-cente text-md-center text-primary" align-center>
          <span v-if="type == 'mda'">MDA User Registration</span>
          <span v-if="type == 'taxauthority'">TAX Authority User Registration</span>
        </h5>
        <div class="secondary--text mb-4 text-xs-center">All fields are required to register</div>

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

        <v-form v-model="valid" @submit.prevent="register" >

          <v-layout row wrap>
            <!-- <v-flex xs12 sm12 :pl-2="this.$vuetify.breakpoint.smAndUp">
              <v-progress-circular
                v-show="fetching"
                :width="1"
                :size="11"
                color="#757575"
                indeterminate
                style="position: absolute; top: left: 30px; margin:10px 0 0 100px;"
              ></v-progress-circular>
              <v-select
                outline
                :items="offices"
                item-text="Name"
                item-value="MDAID"
                label="Select MDA *"
                persistent-hint
                return-object
                single-line
                v-model="vselect.mdaid"
                :rules="mdaidRules"
                required
              ></v-select>
            </v-flex> -->
            <v-flex xs12 sm6 :pl-2="this.$vuetify.breakpoint.smAndUp">
              <v-text-field v-model="formModel.first_name" placeholder="Enter your Firstname *" :rules="firstnameRules" required outline></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 :pl-2="this.$vuetify.breakpoint.smAndUp">
              <v-text-field v-model="formModel.last_name" placeholder="Enter your Lastname *" :rules="lastnameRules" required outline></v-text-field>
            </v-flex>

          </v-layout>

          <v-layout row wrap>

            <v-flex xs12 sm6 :pl-2="this.$vuetify.breakpoint.smAndUp">
              <v-text-field v-model="formModel.email" placeholder="Email Address *" type="email" :rules="emailRules" required outline></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 :pl-2="this.$vuetify.breakpoint.smAndUp">
              <v-text-field placeholder="Phone Number *" type="tel"  v-model="formModel.phone" :rules="phoneRules" required outline></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap>

            <!-- <v-flex xs12 sm6 :pl-2="this.$vuetify.breakpoint.smAndUp">
              <v-text-field placeholder="Email Address" type="email"  required  outline></v-text-field>
            </v-flex> -->
            <v-flex xs12 sm12 :pl-2="this.$vuetify.breakpoint.smAndUp">
              <!-- <v-textarea label="Enter Office Address" name="tedstddt" required outline></v-textarea> -->
              <v-text-field placeholder="Office Address *" type="text" v-model="formModel.address" :rules="officeaddressRules" required  outline></v-text-field>
            </v-flex>
            <!-- <v-flex xs12 sm4 :pl-2="this.$vuetify.breakpoint.smAndUp">
              <v-progress-circular
                v-show="fetching"
                :width="1"
                :size="11"
                color="#757575"
                indeterminate
                style="position: absolute; top: left: 30px; margin:10px 0 0 100px;"
              ></v-progress-circular>
              <v-select
                outline
                :items="zipcodes"
                item-text="Name"
                item-value="ZipCode"
                label="Select ZIP Code *"
                persistent-hint
                return-object
                single-line
                v-model="vselect.zipcode"
                :rules="zipcodeRules"
                required
              ></v-select>
            </v-flex> -->
          </v-layout>

          <v-layout row wrap>
            <!-- <v-flex xs12 sm2></v-flex> -->
            <v-flex :pl-2="this.$vuetify.breakpoint.smAndUp" mx-auto xs12 sm6>
              <v-btn :loading="loading" :disabled="loading || !valid"  type="submit" dark class="secondary caption" flat small round block>SIGN UP</v-btn>
            </v-flex>
            <!-- <v-flex sm1></v-flex>
            <v-flex xs12 sm5>
              <nuxt-link to="/">
              <v-btn outline round small block flat>Cancel</v-btn>
              </nuxt-link>
            </v-flex> -->
          </v-layout>
          <v-layout row wrap>

          </v-layout>
        </v-form>
      </v-sheet>
    </v-flex>
  </v-layout>



  <v-dialog
      v-model="dialog"
      width="500"
    >

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Registration Successful
        </v-card-title>

        <v-card-text>
          {{ registrationMessage }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="redirectToLogin"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


</v-container>


</template>

<script>

export default {
  name: 'RegistrationForm',
  props: ['type'],
  data() {
    return {
      dialog: false,
      valid: false,
      fetching: false,
      offices: [],
      zipcodes: [],
      errors: null,
      vselect: {
        mdaid: '',
        zipcode: ''
      },
      formModel: {
        // zip_code: '',
        // mda_id: '',
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        phone: ''
      },
      registrationMessage: '',
      loading: false,
      authValid: false,
      e3: true,
      e1: true,
      // zipcodeRules: [
      //   v => !!v || 'Zip Code is required',
      // ],
      // mdaidRules: [
      //   v => !!v || 'MDA is required',
      // ],
      firstnameRules: [
        v => !!v || 'Firstname is required',
      ],
      lastnameRules: [
        v => !!v || 'Lastname is required',
      ],
      phoneRules: [
        v => !!v || 'Phone number is required',
        v => (v.length > 10) || 'Phone number cannot be less than 10'
      ],
      officeaddressRules: [
        v => !!v || 'Office address is required',
      ],
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
  mounted: function() {
    // this.getMDAID();
    // this.getZipCodes();
  },
  methods: {
    getMDAID() {
      this.fetching = true;
      this.$axios.$get("Common/mdas").then(
        res => {
          this.offices = res.data;
          this.fetching = false;
        },
        error => {
          this.fetching = false;
        }
      );
    },
    getZipCodes() {
      this.fetching = true;
      this.$axios.$get("Common/ZipCodes").then(
        res => {
          this.zipcodes = res.data;
          this.fetching = false;
        },
        error => {
          this.fetching = false;
        }
      );
    },
    redirectToLogin: function() {
      this.dialog = false;
      // this.$router.push({
      //     path: '/'
      // })
    },
    register() {
        let url;
        this.loading = true;
        if(this.type == 'mda') {
          url = 'Common/mda/registration'
        } else if (this.type == 'taxauthority') {
          url = 'Common/tax-authority/registration'
        }
        this.formModel.mda_id = this.vselect.mdaid.MDAID;
        this.formModel.zip_code = this.vselect.zipcode.ZipCode;
        this.$axios.$post(url, this.formModel).then(res => {
          this.loading = false;
          this.registrationMessage = res.message;
          this.errors = null;
          this.dialog = true;
        }, error => {
          this.loading = false;
          this.errors = error.response.data.error;
        });
    }
  }
}
</script>
