<template>
<v-container grid-list-lg class="dashboard-wrapper">
  <div class="headline mb-5 font-weight-medium">View Pending Bills</div>

  <v-sheet class="grey lighten-2 pa-3 text-xs-center font-weight-bold caption mb-4">Narrow down search results by using the options below. You must alter at least one of the fields, then click the search button <br> You can also select multiple bills for printing.</v-sheet>

    <v-sheet class="px-4 pt-4 pb-5 my-shadow-2" style="opacity: 0.9">
      <alert :data="alert_data"></alert>
      <v-layout row wrap>

        <v-flex xs12 sm6 md4>
          <div class="caption font-weight-bold mb-1">Reference Code</div>
          <v-text-field
            v-model="searchModel.params.reference_code"
            outline
            name="reference code"
            v-validate="{ required: false, regex: /^\d{13,18}$/ }">
            <div class="" slot="label">Reference Number</div>
          </v-text-field>
          <div class="error-box">{{ errors.first('reference code') }}</div>
        </v-flex>

        <v-flex xs12 sm6 md4>
          <div class="caption font-weight-bold mb-1">MDA</div>
          <v-progress-circular
            v-show="fetching"
            :width="1"
            :size="11"
            color="#757575"
            indeterminate
            style="position: absolute; top: left: 30px; margin:10px 0 0 100px;"
          ></v-progress-circular>
          <v-select
            v-model="searchModel.params.mda"
            :items="mdas"
            item-text="name"
            item-value="code" 
            d
            outline>
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
          <div class="caption font-weight-bold mb-1">Generated From</div>

          <v-menu ref="dateMenu2" v-model="dateMenu2" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">

            <template v-slot:activator="{ on }">
              <v-text-field outline v-model="searchModel.params.generated_after" label="Choose Date" append-icon="mdi-calendar-clock" v-on="on"></v-text-field>
            </template>

            <v-date-picker color="secondary" v-model="searchModel.params.generated_after" no-title @input="dateMenu2 = false"></v-date-picker>
          </v-menu>
        </v-flex>


        <v-flex xs12 sm6 md4>
          <div class="caption font-weight-bold mb-1">Generated To</div>

          <v-menu ref="dateMenu" v-model="dateMenu" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">

            <template v-slot:activator="{ on }">
              <v-text-field outline v-model="searchModel.params.generated_before" label="Choose Date" append-icon="mdi-calendar-clock" v-on="on"></v-text-field>
            </template>

            <v-date-picker color="secondary" v-model="searchModel.params.generated_before" no-title @input="dateMenu = false"></v-date-picker>
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
            <td>{{ props.item.reference_code }}</td>
            <td>{{ props.item.anssid }}</td>
            <td>{{ props.item.anssid_name }}</td>
            <td>{{ props.item.total_amount_payable | formatNumber }}</td>
            <td>{{ props.item.total_amount_paid | formatNumber }}</td>
            <td>
              <span :class="`${props.item.payment_status_label}`">{{ props.item.payment_status }}</span>
            </td>
            <td>{{ props.item.revenue_name }}</td>
            <!-- <td>{{ props.item.agency_name }}</td> -->
            <td class="text-xs-center">
              <v-layout>
                <v-btn flat small class="primary action-btn" @click="setUpBillForPrint(props.item)">View</v-btn>
              </v-layout>
            </td>
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
        <v-dialog
      width="800"
      v-model="openModal"
    >
      <v-card>
        <v-layout justify-center mb-1>
          <v-btn v-if="contentFetched"
            flat
            round
            class="secondary caption"
            @click="printBill('bill_area')"
          >
          <v-icon>print</v-icon> Print</v-btn>
        </v-layout>

        <v-card-text class="text-md-center" v-show="!contentFetched">
          <v-progress-circular
            indeterminate
            color="blue"
          ></v-progress-circular>
        </v-card-text>
        <v-card-text v-if="contentFetched">
          <bill id="bill_area" :result="bill"></bill>
        </v-card-text>

      </v-card>
    </v-dialog>
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
import alert from '@/components/alert'
import Bill from "~/components/bill";
var PHE = require('print-html-element')
export default {
  layout: 'user',
  components: {
    bill:Bill,
    alert
  },
  data() {
    return {
      alert_data:{
        errors:null,
        success:null
      },
      openModal: false,
      contentFetched: false,
      fetching: false,
      searching: false,
      loading: false,
      startDate: '',
      endDate: '',
      dateMenu: false,
      dateMenu2: false,
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
          text: 'Reference Code',
          value: 'ref_code',
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
          text: 'Amount Payable (₦)',
          value: 'amount_payable',
          sortable: false,
        },
        {
          text: 'Amount Paid (₦)',
          value: 'amount_paid',
          sortable: false,
        },
        {
          text: 'Payment Status',
          value: 'ref_code',
          sortable: false,
        },
        {
          text: 'Revenue Name',
          value: 'revenueName',
          sortable: false,
        },
        // {
        //   text: 'MDA',
        //   value: 'mda',
        //   sortable: false,
        // },
        {
          text: '',
          value: '',
          sortable: false,
        },
      ],
      bills: [],
      bill:{},
      mdas: [],
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
    this.getMdas()
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
    resetAlert(){
      this.alert_data = {errors:null,success:null};
    },
    clearSearch () {
      this.searchModel.params.reference_code = ''
      this.searchModel.params.mda = undefined;
      this.searchModel.params.anssid = ''
      this.searchModel.params.generated_after = ''
      this.searchModel.params.generated_before = ''
    },
    setUpBillForPrint(bill){
      this.contentFetched = false;
      this.openModal = true;
      this.contentFetched = true;
      this.bill = bill;
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    printBill(id) {
      PHE.printElement(document.getElementById(id));
    },
    searchBills(pageUrl = null) {
      this.resetAlert();
        this.searching = true;

        for (const property in this.searchModel.params) {
          if (this.searchModel.params.hasOwnProperty(property)) {
            if (this.searchModel.params[property] != null ) {
              this.paramsModel[property] = this.searchModel.params[property]
            }
          }
        }

        this.paramsModel.revenue_name = this.vselect.revenue_name.code;

        this.$axios.$get('bills/search', {params: this.paramsModel}).then(res => {
          this.bills = res.data;
          this.pages.previousPage = res.links.prev;
          this.pages.nextPage = res.links.next;
          this.pages.first = res.links.first;
          this.pages.last = res.links.last;
          this.searching = false;
        }, error => {
            this.alert_data.errors = error.response.data.error;
            this.searching = false;
        });
    },
    getAllBills(pageUrl = null) {
      this.loading = true;
      let url = "bills";
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
    getMdas() {
      this.fetching = true;
      this.$axios.get("MDAs/get-mdas").then(
        res => {
          let data = res.data.data;
          data.unshift({name:'Select MDA',code:null});
          this.mdas =data;
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
