<template>
<v-container grid-list-lg class="dashboard-wrapper">
  <div class="headline mb-5 font-weight-medium">View Cleared Bills</div>

  <v-sheet class="grey lighten-2 pa-3 text-xs-center font-weight-bold caption mb-4">Narrow down search results by using the options below. You must alter at least one of the fields, then click the search button <br> You can also select multiple bills for printing.</v-sheet>

    <v-sheet class="px-4 pt-4 pb-5 my-shadow-2" style="opacity: 0.9">
      <v-layout row wrap>

        <v-flex xs12 sm6 md4>
          <div class="caption font-weight-bold mb-1">Bill Number</div>
          <v-text-field
            v-model="searchModel.params.bill_number"
            name="bill number"
            v-validate="{ required: false, regex: /^\d{9,13}$/ }"
            outline>
            <div class="" slot="label">Bill Number</div>
          </v-text-field>
          <div class="error-box">{{ errors.first('bill number') }}</div>
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
          <v-select
            v-model="searchModel.params.economic_sector"
            :items="revenueNames"
            item-text="name"
            item-value="code" outline>
            <div slot="label">Choose</div>
          </v-select>
        </v-flex>

        <v-flex xs12 sm6 md4>
          <div class="caption font-weight-bold mb-1">ANSSID</div>
          <v-text-field name="anssid" v-model="searchModel.params.anssid" outline v-validate="{ required: false, regex: /^\d{10}$/ }">
            <div class="" slot="label">ANSSID</div>
          </v-text-field>
          <div class="error-box">{{ errors.first('anssid') }}</div>
        </v-flex>

        <v-flex xs12 sm6 md4>
          <div class="caption font-weight-bold mb-1">Generated Before</div>

          <v-menu ref="dateMenu" v-model="dateMenu" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">

            <template v-slot:activator="{ on }">
              <v-text-field outline v-model="searchModel.params.generated_before" label="Choose Date" append-icon="mdi-calendar-clock" v-on="on"></v-text-field>
            </template>

            <v-date-picker color="secondary" v-model="searchModel.params.generated_before" no-title @input="dateMenu = false"></v-date-picker>
          </v-menu>
        </v-flex>

        <v-flex xs12 sm6 md4>
          <div class="caption font-weight-bold mb-1">Generated After</div>

          <v-menu ref="dateMenu2" v-model="dateMenu2" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">

            <template v-slot:activator="{ on }">
              <v-text-field outline v-model="searchModel.params.generated_after" label="Choose Date" append-icon="mdi-calendar-clock" v-on="on"></v-text-field>
            </template>

            <v-date-picker color="secondary" v-model="searchModel.params.generated_after" no-title @input="dateMenu2 = false"></v-date-picker>
          </v-menu>
        </v-flex>

        <v-flex xs12 sm6 md2 mx-auto>
          <v-btn small flat block round @click="searchBills" :loading="searching" :disabled="searching" class="secondary caption mt-4">Search</v-btn>
        </v-flex>

        <v-flex xs12 sm6 md2 mx-auto>
          <v-btn small flat block round @click="clearSearch" v-if='!searching' :disabled="searching" class="error caption mt-4">Clear</v-btn>
        </v-flex>
      </v-layout>

      <section class="mt-5">
        <v-data-table hide-actions :headers="headers" :items="bills">
          <template v-slot:items="props">
            <td>{{ props.item.BillNumber }}</td>
            <td>{{ props.item.ANSSID }}</td>
            <td>{{ props.item.PayerName }}</td>
            <td>{{ props.item.Amount | formatNumber }}</td>
            <td>{{ props.item.RevenueName }}</td>
            <td>{{ props.item.RevenueSystem }}</td>
            <!-- <td>{{ props.item.ProcessingZone }}</td> -->
            <td>{{ props.item.PaymentDate | moment("YYYY-MM-DD") }}</td>
          </template>
        </v-data-table>

        <v-flex xs12 sm7 md7 mt-5 mx-auto text-xs-center>
          <v-item-group class="v-btn-group" v-show="!loading">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn flat class="secondary " @click="getAllBills(pages.first)" v-on="on"><v-icon right>fast_rewind</v-icon></v-btn>
              </template>
              <span>Firstpage</span>
            </v-tooltip>
            <v-btn flat class="secondary" @click="getAllBills(pages.previousPage)" :disabled="pages.previousPage == null"><v-icon right>mdi-arrow-left-bold</v-icon> Previous Page
            </v-btn>
            <v-btn flat class="secondary" @click="getAllBills(pages.nextPage)" :disabled="pages.nextPage == null">Next Page <v-icon right>mdi-arrow-right-bold</v-icon>
            </v-btn>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn flat class="secondary " @click="getAllBills(pages.last)" v-on="on"><v-icon right>fast_forward</v-icon></v-btn>
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

<style scoped>
  .error-box{
    color: rgb(163, 0, 0);
    margin-top:-12px
  }
</style>

<script>
export default {
  layout: 'user',
  data() {
    return {
      fetching: false,
      searching: false,
      loading: false,
      startDate: '',
      endDate: '',
      dateMenu: false,
      dateMenu2: false,
      offices: ["ANGD", "ATDJ", "APPU"],
      paramsModel: {},
      searchModel: {
        params: {
          bill_number: null,
          economic_sector: null,
          anssid: null,
          generated_before: null,
          generated_after: null
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
          text: 'BillNumber',
          value: 'billNumber',
          sortable: false,
        },
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
          text: 'Amount Paid (₦)',
          value: 'amountPaid',
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
      ],
      bills: [],
      revenueNames: [],
      vselect: {
        revenue_name: '',
      },
    }
  },

  computed: {
    computedstartDate() {
      return this.formatDate(this.date)
    }
  },

  mounted() {
    this.$store.dispatch('auth/checkPermission', ['VIEW_BILL'])
    this.getAllBills();
    this.getRevenues();
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
    clearSearch () {
      this.searchModel.params.bill_number = ''
      this.searchModel.params.economic_sector = undefined
      this.searchModel.params.generated_before = ''
      this.searchModel.params.generated_after = ''
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    searchBills(pageUrl = null) {
        this.searching = true;

        for (const property in this.searchModel.params) {
          if (this.searchModel.params.hasOwnProperty(property)) {
            if (this.searchModel.params[property] != null ) {
              this.paramsModel[property] = this.searchModel.params[property]
            }
          }
        }

        this.paramsModel.revenue_name = this.vselect.revenue_name.code;

        this.$axios.$get('Bills/search', {params: this.paramsModel}).then(res => {
          this.bills = res.data;
          this.pages.previousPage = res.links.prev;
          this.pages.nextPage = res.links.next;
          this.pages.first = res.links.first;
          this.pages.last = res.links.last;
          this.searching = false;
        }, error => {
            this.errors = error.response.data.error;
            this.searching = false;
        });
    },
    getAllBills(pageUrl = null) {
      this.loading = true;
      let url = "Bills";
      if (pageUrl != null) {
        url = pageUrl;
      }
      this.$axios.$get(url, {params: this.paramsModel}).then(res => {
        this.bills = res.data;
        this.pages.previousPage = res.links.prev;
        this.pages.nextPage = res.links.next;
        this.pages.first = res.links.first;
        this.pages.last = res.links.last;
        this.loading = false;
      }, error => {
          this.errors = error.response.data.error;
          this.loading = false;
      });
    },
    getRevenues() {
      this.fetching = true;
      this.$axios.$get("revenue-systems").then(
        res => {
          this.revenueNames = res.data;
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
