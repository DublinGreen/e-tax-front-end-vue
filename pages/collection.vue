<template>
<v-container grid-list-lg class="dashboard-wrapper">
  <div class="headline mb-5 font-weight-medium">TOTAL COLLECTIONS</div>

  <v-sheet class="grey lighten-2 pa-3 text-xs-center font-weight-bold caption mb-4">Narrow down search results by using the options below. You must alter at least one of the fields, then click the search button</v-sheet>

  <v-sheet class="px-4 pt-4 pb-5 my-shadow-2" style="opacity: 0.9">
    <v-layout row wrap>
      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">Start Date</div>

        <v-menu
          v-model="dateMenu"
          :close-on-content-click="false"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="searchModel.params.start_date"
              label="Choose Date"
              append-icon="event"
              readonly
              v-on="on"
              outline
            ></v-text-field>
          </template>
          <v-date-picker v-model="searchModel.params.start_date" no-title @input="dateMenu = false"></v-date-picker>
        </v-menu>

      </v-flex>

      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">End Date</div>

        <v-menu ref="dateMenu2" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">

          <template v-slot:activator="{ on }">
            <v-text-field outline v-model="searchModel.params.end_date" label="Choose Date" append-icon="event" @blur="date = parseDate(searchModel.params.end_date)" v-on="on"></v-text-field>
          </template>

          <v-date-picker color="secondary" v-model="searchModel.params.end_date" no-title @input="dateMenu2 = false"></v-date-picker>
        </v-menu>
      </v-flex>

      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">ANSSID</div>
        <v-text-field v-model="searchModel.params.anssid" outline>
          <div class="" slot="label">Search by ANSSID</div>
        </v-text-field>
      </v-flex>

      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">Revenue Name</div>
        <v-progress-circular
            v-show="fetching"
            :width="1"
            :size="11"
            color="#757575"
            indeterminate
            style="position: absolute; top: left: 30px; margin:10px 0 0 100px;"
          ></v-progress-circular>
        <v-select v-model="searchModel.params.revenue_name"
            item-text="name"
            item-value="code"
            :items="revenueNames" outline>
          <div slot="label">Choose</div>
        </v-select>
      </v-flex>

      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">Revenue Sector</div>
        <v-progress-circular
            v-show="fetching"
            :width="1"
            :size="11"
            color="#757575"
            indeterminate
            style="position: absolute; top: left: 30px; margin:10px 0 0 100px;"
          ></v-progress-circular>
        <v-select v-model="searchModel.params.revenue_system"
          item-text="name"
          item-value="code"
         :items="revenueSystems" outline>
          <div slot="label">Choose</div>
        </v-select>
      </v-flex>

      <v-flex xs12 sm6 md4>
        <v-btn small flat block round @click="searchCollections" :loading="searching" :disabled="searching" class="secondary caption mt-4">Search</v-btn>
      </v-flex>
    </v-layout>
    
    <section class="mt-5">
      <h4 style="margin-bottom:5px;">Total Collection : &#8358; {{collections_total}}</h4>
      <v-data-table hide-actions :headers="headers" :items="collections">
        <template v-slot:items="props">
          <td>{{ props.item.ANSSID }}</td>
          <td>{{ props.item.PayerName }}</td>
          <td>{{ props.item.Amount | formatNumber }}</td>
          <td>{{ props.item.RevenueName }}</td>
          <td>{{ props.item.RevenueSystem }}</td>
          <td>{{ props.item.PaymentDate }}</td>
        </template>
      </v-data-table>

      <v-flex xs12 sm7 md7 mt-5 mx-auto text-xs-center>
        <v-item-group class="v-btn-group" v-show="!loading">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn flat class="secondary " @click="getCollections(pages.first)" v-on="on"><v-icon right>fast_rewind</v-icon></v-btn>
            </template>
            <span>Firstpage</span>
          </v-tooltip>
          <v-btn flat class="secondary" @click="getCollections(pages.previousPage)" :disabled="pages.previousPage == null"><v-icon right>mdi-arrow-left-bold</v-icon> Previous Page
          </v-btn>
          <v-btn flat class="secondary" @click="getCollections(pages.nextPage)" :disabled="pages.nextPage == null">Next Page <v-icon right>mdi-arrow-right-bold</v-icon>
          </v-btn>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn flat class="secondary " @click="getCollections(pages.last)" v-on="on"><v-icon right>fast_forward</v-icon></v-btn>
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

</v-container>
</template>

<style lang="scss" scoped>
</style>

<script>
import Pagination from "~/components/pagination";

export default {
  layout: 'user',
  components: {
    Pagination
  },
  data() {
  
    return {
      fetching:false,
      searching: false,
      loading: false,
      date: new Date().toISOString().substr(0, 10),
      date2: new Date().toISOString().substr(0, 10),
      startDate: '',
      endDate: '',
      dateMenu: false,
      dateMenu2: false,
      paramsModel: {},
      searchModel: {
        params: {
          anssid: null,
          start_date: null,
          end_date: null,
          revenue_name: null,
          revenue_system: null
        }
      },
      pages: {
        first: '',
        last: '',
        previousPage: '',
        nextPage: ''
      },
      headers: [
        {
          text: 'ANSSID',
          value: 'anssid',
          sortable: false,
        },
        {
          text: 'Payer Name',
          value: 'name',
          sortable: false,
        },
        {
          text: 'Amount (₦)',
          value: 'amount',
          sortable: false,
        },
        {
          text: 'Revenue Name',
          value: 'revenueName',
          sortable: false,
        },
        {
          text: 'Revenue Sector',
          value: 'revenueSector',
          sortable: false,
        },
        {
          text: 'Payment Date',
          value: 'paymentDate',
          sortable: false,
        },
        // {
        //   text: "Actions",
        //   sortable: false,
        //   align: 'center'
        // }
      ],
      collections: [],
      collections_total: 0,
      revenueNames: [],
      revenueSystems: [],
      vselect: {
        revenue_name: '',
        revenue_system: ''
      },
    }
  },

  computed: {
    computedstartDate() {
      return this.formatDate(this.date)
    }
  },

  created() {
    this.getCollections();
  },

  mounted() {
    this.$store.dispatch('auth/checkPermission', ['VIEW_COLLECTION'])
    this.getRevenues();
    this.getSystems();
  },

  watch: {
    date(val) {
      this.startDate = this.formatDate(this.date)
    },
    date2(val) {
      this.endDate = this.formatDate(this.date2)
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    searchCollections(pageUrl = null) {
        this.searching = true;

        for (const property in this.searchModel.params) {
          if (this.searchModel.params.hasOwnProperty(property)) {
            if (this.searchModel.params[property] != null ) {
              this.paramsModel[property] = this.searchModel.params[property]
            }
          }
        }

        this.paramsModel.revenue_name = this.searchModel.params.revenue_name;
        this.paramsModel.revenue_system = this.searchModel.params.revenue_system;

        this.$axios.$get('Collections/search', {params: this.paramsModel}).then(res => {
          this.collections = res.data;
          this.searching = false;
          this.pages.previousPage = res.links.prev;
          this.pages.nextPage = res.links.next;
          this.pages.first = res.links.first;
          this.pages.last = res.links.last;
        }, error => {
            this.errors = error.response.data.error;
            this.searching = false;
        });
        this.$axios.$get('Collections/search/total', {params: this.paramsModel}).then(res => {
          this.collections_total = res.total_formatted;
        }, error => {
            
        });
    },
    getCollections(pageUrl = null) {
      this.loading = true;
      let url = "Collections";
      let url_total = 'Collections/total';
      if (pageUrl != null) {
        url = pageUrl;
        url_total = 'Collections/search/total'
      }
      this.$axios.$get(url, {params: this.paramsModel}).then(res => {
        this.collections = res.data;
        this.loading = false;
        this.pages.previousPage = res.links.prev;
        this.pages.nextPage = res.links.next;
        this.pages.first = res.links.first;
        this.pages.last = res.links.last;
      }, error => {
          this.errors = error.response.data.error;
          this.loading = false;
      });
      this.$axios.$get(url_total, {params: this.paramsModel}).then(res => {
        this.collections_total = res.total_formatted;
        this.loading = false;
      }, error => {
      });

    },
    getRevenues() {
      this.fetching = true;
      this.$axios.$get("revenue-types").then(
        res => {
          this.revenueNames = res.data;
          this.fetching = false;
        },
        error => {
          this.fetching = false;
        }
      );
    },
    getSystems() {
      this.fetching = true;
      this.$axios.$get("revenue-systems").then(
        res => {
          this.revenueSystems = res.data;
          this.fetching = false;
        },
        error => {
          this.fetching = false;
        }
      );
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>
