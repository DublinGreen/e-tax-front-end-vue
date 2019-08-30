<template>
  <v-container grid-list-lg class="dashboard-wrapper">
    <div class="headline mb-5 font-weight-medium">
      Create A New User
      <v-btn class="secondary pull-right" to="/users"><i class="fa fa-users"></i>&nbsp;List Users</v-btn>
    </div>

    <v-layout row wrap>
      <v-flex md12>
        <v-card>
          <v-card-text>
            <div class="secondary--text mb-4">All fields are required to register</div>

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

        <v-form v-model="valid" @submit.prevent="createUser" >

          <v-layout>
            <v-flex xs12 sm6 >
              <label class="caption">User Type</label>
              <v-select
                outline
                v-model="formModel.userType"
                :items="userTypes"
                label="User Type *"
                persistent-hint
                return-object
                single-line
                :rules="userTypeRules"
                required
              ></v-select>
            </v-flex>
            <v-flex v-if="formModel.userType == 'MDA'" xs12 sm6 :pl-2="this.$vuetify.breakpoint.smAndUp">
              <label class="caption">MDA</label>
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
            </v-flex>
            <v-flex xs12 sm6 :pl-2="this.$vuetify.breakpoint.smAndUp">
              <label class="caption">Firstname</label>
              <v-text-field v-model="formModel.first_name" placeholder="Enter your Firstname *" :rules="firstnameRules" required outline></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 :pl-2="this.$vuetify.breakpoint.smAndUp">
              <label class="caption">Lastname</label>
              <v-text-field v-model="formModel.last_name" placeholder="Enter your Lastname *" :rules="lastnameRules" required outline></v-text-field>
            </v-flex>

          </v-layout>

          <v-layout row wrap v-if="['MDA','SUPER_ADMIN','ADMIN','TAX OFFICER'].includes(formModel.userType)">


            <v-flex xs12 sm6 :pl-2="this.$vuetify.breakpoint.smAndUp">
              <label class="caption">Processing Zone</label>
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
                :items="processingzones"
                item-text="name"
                item-value="id"
                label="Select Processing Zone *"
                persistent-hint
                return-object
                single-line
                v-model="vselect.processingzoneid"
                :rules="ProcessingZoneRules"
                v-on:change="getTaxOffices"
                required
              ></v-select>
            </v-flex>

            <v-flex xs12 sm6 :pl-2="this.$vuetify.breakpoint.smAndUp">
              <label class="caption">Tax Office</label>
              <v-progress-circular
                v-show="fetchingTaxoffices"
                :width="1"
                :size="11"
                color="#757575"
                indeterminate
                style="position: absolute; top: left: 30px; margin:10px 0 0 100px;"
              ></v-progress-circular>
              <v-select
                outline
                :items="taxoffices"
                item-text="name"
                item-value="id"
                label="Select Tax Office *"
                persistent-hint
                return-object
                single-line
                v-model="vselect.taxofficeid"
                :rules="TaxOfficeRules"
                required
              ></v-select>
            </v-flex>

          </v-layout>

          <v-layout row wrap>

            <v-flex xs12 sm6 :pl-2="this.$vuetify.breakpoint.smAndUp">
              <label class="caption">Email Address</label>
              <v-text-field v-model="formModel.email" placeholder="Email Address *" type="email" :rules="emailRules" required outline></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 :pl-2="this.$vuetify.breakpoint.smAndUp">
              <label class="caption">Phone Number</label>
              <v-text-field placeholder="Phone Number *" type="tel"  v-model="formModel.phone" :rules="phoneRules" required outline></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 sm12 :pl-2="this.$vuetify.breakpoint.smAndUp">
              <label class="caption">Address</label>
              <v-text-field placeholder="Address *" type="text" v-model="formModel.address" :rules="officeaddressRules" required  outline></v-text-field>
            </v-flex>
          </v-layout>

          <!-- <v-layout row wrap>
            <v-flex xs12 sm12 :pl-2="this.$vuetify.breakpoint.smAndUp">
              SET USER PERMISSIONS
            </v-flex>
            <v-flex xs12 sm12 style="background: #F9F9F9; border-radius: 30px; padding: 20px;">

              <v-layout row wrap>
                <v-flex v-for="(permission, index) in permissions" :key="index" md3>
                  <v-checkbox
                    v-model="formModel.permissions"
                    :label="permission.name"
                    :value="permission.key"
                    required
                  ></v-checkbox>
                </v-flex>
              </v-layout>

            </v-flex>
          </v-layout> -->

          <v-layout row wrap>
            <v-flex :pl-2="this.$vuetify.breakpoint.smAndUp" mx-auto xs12 sm6>
              <v-btn :loading="submitting" :disabled="submitting || !valid"  type="submit" dark class="secondary caption" flat small round block>SUBMIT</v-btn>
            </v-flex>
          </v-layout>
          </v-form>
          </v-card-text>
        </v-card>
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
          {{ successMessage.message }}
        </v-card-title>

        <v-card-text>
          <table class="table">
            <tr>
              <th>Login Email:</th>
              <td>{{ successMessage.data.email }}</td>
            </tr>
            <tr>
              <th>Password: </th>
              <td>{{ successMessage.data.pwd }}</td>
            </tr>
          </table>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="resetForm"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-container>
</template>

<style scoped>
  table.table {
    width: 100%;
  }
  table th {
    text-align: left;
  }
</style>
<script>
export default {
  layout: 'user',
  data() {
    return {
      loading: false,
      submitting: false,
      dialog: false,
      valid: false,
      fetching: false,
      fetchingTaxoffices: false,
      offices: [],
      taxoffices: [],
      processingzones: [],
      userTypes: [],
      errors: null,
      vselect: {
        mdaid: '',
        zipcode: '',
        taxofficeid: '',
        processingzoneid: ''
      },
      permissions: [],
      formModel: {
        mda_id: '',
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        userType: '',
        phone: '',
        permissions: []
      },
      successMessage: {
        message: '',
        data: {}
      },
      mdaidRules: [
        v => !!v || 'MDA is required',
      ],
      TaxOfficeRules: [
        v => !!v || 'Tax Office is required',
      ],
      ProcessingZoneRules: [
        v => !!v || 'Processing Zone is required',
      ],
      firstnameRules: [
        v => !!v || 'Firstname is required',
        v => /^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/.test(v) || 'First name must be valid'
      ],
      lastnameRules: [
        v => !!v || 'Lastname is required',
        v => /^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/.test(v) || 'Last name must be valid'
      ],
      phoneRules: [
        v => !!v || 'Phone number is required',
        v => (v.length > 10) || 'Phone number cannot be less than 10',
        v => /^([0-9]{9,11})$/.test(v) || 'Phone number must be valid'
      ],
      officeaddressRules: [
        v => !!v || 'Office address is required',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/.test(v) || 'E-mail must be valid'
      ],
      userTypeRules: [
        v => !!v || 'User Type is required',
      ],
    }
  },
  mounted: function() {
    // this.getPermissions();
    this.getMDAID();
    this.getProcessingZones();
    this.pushUserTypes();
    this.$store.dispatch('auth/checkPermission',
    [
      'CREATE_MDA_USER',
      'CREATE_ADMIN_USER',
      'CREATE_TMS_USER',
      'CREATE_STATE_GOVERNMENT_USER',
      'CREATE_REVENUE_BOARD_USER',
      'CREATE_TAX_OFFICER',
    ]);
  },
  methods: {
    pushUserTypes() {
      setTimeout(() => {
        if (this.$store.dispatch('auth/canPerform',['CREATE_ADMIN_USER'])) {
          this.userTypes.push("ADMIN")
        }
        if (this.$store.dispatch('auth/canPerform',['CREATE_TAX_OFFICER'])) {
          this.userTypes.push("TAX OFFICER")
        }
        if (this.$store.dispatch('auth/canPerform',['CREATE_MDA_USER'])) {
          this.userTypes.push("MDA")
        }
        if (this.$store.dispatch('auth/canPerform',['CREATE_STATE_GOVERNMENT_USER'])) {
          this.userTypes.push("STATE GOVERNMENT OFFICIAL")
        }
        if (this.$store.dispatch('auth/canPerform',['CREATE_REVENUE_BOARD_USER'])) {
          this.userTypes.push("REVENUE BOARD USER")
        }
        
      }, 2000);
    },
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
    getTaxOffices(a) {
      this.fetchingTaxoffices = true;
      let processingZoneId = this.vselect.processingzoneid.id;
      this.$axios.$get("/tax-offices/processing-zone/" + processingZoneId).then(
        res => {
          this.taxoffices = res.data;
          this.fetchingTaxoffices = false;
        },
        error => {
          this.fetchingTaxoffices = false;
        }
      );
    },
    getProcessingZones() {
      this.fetching = true;
      this.$axios.$get("/processing-zones").then(
        res => {
          this.processingzones = res.data;
          this.fetching = false;
        },
        error => {
          this.fetching = false;
        }
      );
    },
    getPermissions() {
      this.permissions
      this.$axios.$get('/permissions').then(res => {
        this.permissions = res.data;
      });
    },
    createUser() {
          let url;
          let type = this.formModel.userType;
          this.submitting = true;
          if (type == 'TAX OFFICER') {
            url = 'auth/user/create'
          }
          else if(type == 'MDA') {
            url = 'auth/create-mda'
          } else if (type == 'ADMIN') {
            url = 'auth/create-admin'
          } else if (type == 'STATE GOVERNMENT OFFICIAL') {
            url = 'auth/create-state-govt-official'
          } else if (type == 'REVENUE BOARD USER') {
            url = 'auth/create-revenue-board'
          }
          this.formModel.mda_id = this.vselect.mdaid.MDAID;
          this.formModel.processing_zone = this.vselect.processingzoneid.id;
          this.formModel.tax_office = this.vselect.taxofficeid.id;
          this.formModel.user_role = this.formModel.userType;
          this.$axios.$post(url, this.formModel).then(res => {
            this.submitting = false;
            this.successMessage = res;
            this.errors = null;
            this.dialog = true;
          }, error => {
            this.submitting = false;
            this.errors = error.response.data.error;
          });
    },
    resetForm() {
      // this.dialog = false;
      this.$router.push({
          path: '/users'
      })
    }
  }
}
</script>
