<template>
  <v-container grid-list-lg class="dashboard-wrapper">
    <div class="headline mb-5 font-weight-medium">
      Users
      <v-btn class="secondary pull-right" to="users/create"><i class="fa fa-plus"></i>&nbsp;Add A New User</v-btn>
    </div>

    <v-sheet class="px-4 py-5 my-shadow-2" style="opacity: 0.9">
    <v-layout row wrap>

      <v-flex xs12 sm12 md12>
        <v-sheet class="grey lighten-2 pa-3 text-xs-center font-weight-bold caption mb-4">Narrow down search results by using the options below. You must alter at least one of the fields, then click the search button</v-sheet>
      </v-flex>


      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">Name</div>
        <v-text-field v-model="searchModel.params.name" outline>
          <div class="" slot="label">Name</div>
        </v-text-field>
      </v-flex>

      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">Email</div>
        <v-text-field v-model="searchModel.params.email" type="email" outline>
          <div class="" slot="label">Email</div>
        </v-text-field>
      </v-flex>


      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">Phone Number</div>
        <v-text-field v-model="searchModel.params.phone_number" type="tel" outline>
          <div class="" slot="label">Phone Number</div>
        </v-text-field>
      </v-flex>

      <!-- <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">User Type</div>
        <v-progress-circular
            v-show="fetching"
            :width="1"
            :size="11"
            color="#757575"
            indeterminate
            style="position: absolute; top: left: 30px; margin:10px 0 0 100px;"
          ></v-progress-circular>
        <v-select v-model="searchModel.params.user_type"
            item-text="name"
            item-value="id"
            :items="userTypes" outline>
          <div slot="label">Choose</div>
        </v-select>
      </v-flex> -->

      <v-flex xs12 sm6 md4 mx-auto>
        <v-btn small flat block round @click="searchUsers" :loading="searching" :disabled="searching" class="secondary caption mt-4">Search</v-btn>
      </v-flex>
    </v-layout>

    <section class="mt-5">
      <v-data-table hide-actions :headers="headers" :items="users">
        <template v-slot:items="props">
          <td>{{ props.item.first_name }}</td>
          <td>{{ props.item.last_name }}</td>
          <td>{{ props.item.phone }}</td>
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.address }}</td>
          <td>{{ props.item.user_role }}</td>
          <td class="text-xs-center">
            <v-btn :to="'/users/' + props.item.user_id" flat small class="info action-btn">View</v-btn>
          </td>
        </template>
      </v-data-table>

      <v-flex xs12 sm7 md7 mt-5 mx-auto text-xs-center>
        <v-item-group class="v-btn-group" v-show="!loading">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn flat class="secondary " @click="getAllUsers(pages.first)" v-on="on"><v-icon right>fast_rewind</v-icon></v-btn>
            </template>
            <span>Firstpage</span>
          </v-tooltip>
          <v-btn flat class="secondary" @click="getAllUsers(pages.previousPage)" :disabled="pages.previousPage == null"><v-icon right>mdi-arrow-left-bold</v-icon> Previous Page
          </v-btn>
          <v-btn flat class="secondary" @click="getAllUsers(pages.nextPage)" :disabled="pages.nextPage == null">Next Page <v-icon right>mdi-arrow-right-bold</v-icon>
          </v-btn>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn flat class="secondary " @click="getAllUsers(pages.last)" v-on="on"><v-icon right>fast_forward</v-icon></v-btn>
            </template>
            <span>Lastpage</span>
          </v-tooltip>
        </v-item-group>
          <v-progress-circular
          indeterminate
          color="blue"
          v-show="loading"
          ></v-progress-circular>
      </v-flex>

    </section>
  </v-sheet>

    <!-- <v-tabs show-arrows fixed-tabs active-class="tab-background" color="grey lighten-2" slider-color="primary">
      <v-tab href="#superadmin">SUPER ADMIN</v-tab>
      <v-tab href="#admin">ADMIN</v-tab>
      <v-tab href="#mda">MDA</v-tab>
      <v-tab href="#revenuebody">REVENUE BOARD</v-tab>
      <v-tab href="#stategovoff">STATE GOV. OFFICIAL</v-tab>

      <v-tab-item value="superadmin">
        <SuperAdminUsers :offices="offices" />
      </v-tab-item>

      <v-tab-item value="admin">
        <AdminUsers :offices="offices" />
      </v-tab-item>

      <v-tab-item value="mda">
        <MDAUsers :offices="offices" />
      </v-tab-item>

      <v-tab-item value="revenuebody">
        <RevenueBodyUsers :offices="offices" />
      </v-tab-item>


      <v-tab-item value="stategovoff">
        <StateGovOffUsers :offices="offices" />
      </v-tab-item>

    </v-tabs> -->


  </v-container>
</template>

<script>
// import SuperAdminUsers from '~/components/tabs/superadminusers'
// import AdminUsers from '~/components/tabs/corporate'
// import MDAUsers from '~/components/tabs/corporate'
// import RevenueBodyUsers from '~/components/tabs/corporate'
// import StateGovOffUsers from '~/components/tabs/corporate'

export default {
  layout: 'user',
  components: {
    // SuperAdminUsers,
    // AdminUsers,
    // MDAUsers,
    // RevenueBodyUsers,
    // StateGovOffUsers,
  },
  data() {
    return {
      fetching: false,
      searching: false,
      loading: false,
      users: [],
      userTypes:[
        {
          id: 'ADMIN',
          name: 'ADMIN'
        },
        {
          id: 'MDA',
          name: 'MDA'
        },
        {
          id: 'STATE_GOVERNMENT_OFFICIAL',
          name: 'STATE GOVERNMENT OFFICIAL'
        },
        {
          id: 'REVENUE_BOARD_USER',
          name: 'REVENUE BOARD USER'
        }
      ],
      headers: [
        {
          text: 'Firstname',
          value: 'name',
          sortable: false,
        },
        {
          text: 'Lastname',
          value: 'lastname',
          sortable: false,
        },
        {
          text: 'Phone',
          value: 'phone',
          sortable: false,
        },
        {
          text: 'Email',
          value: 'email',
          sortable: false,
        },
        {
          text: 'Address',
          value: 'address',
          sortable: false,
        },
        {
          text: 'User Type',
          value: 'userType',
          sortable: false,
        },
        {
          text: "Actions",
          sortable: false,
          align: 'center',
        }
      ],
      paramsModel: {},
      searchModel: {
        params: {
          name: null,
          email: null,
          phone_number: null,
          user_type: null,
        }
      },
      pages: {
        first: '',
        last: '',
        previousPage: '',
        nextPage: ''
      },
      vselect: {
        usertype: '',
      },
    }
  },
  mounted() {
    this.getAllUsers();
  },
  methods: {
    searchUsers(pageUrl = null) {
        this.searching = true;

        for (const property in this.searchModel.params) {
          if (this.searchModel.params.hasOwnProperty(property)) {
            if (this.searchModel.params[property] != null ) {
              this.paramsModel[property] = this.searchModel.params[property]
            }
          }
        }

        this.paramsModel.user_type = this.searchModel.params.user_type;

        this.$axios.$get('users/search', {params: this.paramsModel}).then(res => {
          this.users = res.data;
          this.searching = false;
          this.pages.previousPage = res.links.prev;
          this.pages.nextPage = res.links.next;
          this.pages.first = res.links.first;
          this.pages.last = res.links.last;
        }, error => {
            this.errors = error.response.data.error;
            this.searching = false;
        });
    },
    getAllUsers(pageUrl = null) {
      this.loading = true;
      let url = "users";
      if (pageUrl != null) {
        url = pageUrl;
      }
      this.$axios.$get(url, {params: this.paramsModel}).then(res => {
        this.users = res.data;
        this.loading = false;
        this.pages.previousPage = res.links.prev;
        this.pages.nextPage = res.links.next;
        this.pages.first = res.links.first;
        this.pages.last = res.links.last;
      }, error => {
          this.errors = error.response.data.error;
          this.loading = false;
      });
    }
  }
}
</script>
