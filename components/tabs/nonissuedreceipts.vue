<template>
<section>
  <v-layout row wrap>
    <v-flex v-if="runSearch" md12 sm12 mt-4>
      <v-sheet class="grey lighten-2 pa-3 text-xs-center font-weight-bold caption mb-4">Narrow down search results by using the options below. You must alter at least one of the fields, then click the search button</v-sheet>
    </v-flex>

      <v-flex xs12 sm6 md4 :pr-2="this.$vuetify.breakpoint.smAndUp">
        <div class="caption font-weight-bold mb-1">Payment Reference</div>
        <v-text-field v-model="searchModel.params.payment_reference" outline>
          <div class="" slot="label">Search by payment reference</div>
        </v-text-field>
      </v-flex>

      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">ANSSID</div>
        <v-text-field v-model="searchModel.params.anssid" outline>
          <div class="" slot="label">Search by ANSSID</div>
        </v-text-field>
      </v-flex>

      <v-flex xs12 sm6 md4 :pl-2="this.$vuetify.breakpoint.smAndUp">
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

      <!-- <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">Revenue Name</div>
        <v-text-field v-model="searchModel.params.revenue_name" outline>
          <div class="" slot="label">Search by revenue name</div>
        </v-text-field>
      </v-flex> -->

      <v-flex xs12 sm6 md4 mx-auto>
        <v-btn small flat block round @click="searchReceipts" :loading="searching" :disabled="searching" class="secondary caption mt-4">Search</v-btn>
        <!-- <v-btn small flat block round @click="resetSearch" class="secondary caption mt-4">Reset</v-btn> -->
      </v-flex>
    </v-layout>

      <v-data-table v-if="runSearch || showTable" hide-actions :headers="headers" :items="receipts">
        <template v-slot:items="props">
          <td>{{ props.item.PaymentReference }}</td>
          <td>{{ props.item.PayerName }}</td>
          <td>{{ props.item.ANSSID }}</td>
          <td>{{ props.item.RevenueName }}</td>
          <td>{{ props.item.Amount | formatNumber }}</td>
          <td class="text-xs-center">
            <v-layout>
              <v-btn flat small class="primary action-btn" @click="issueReceipt(props.item.PaymentReference)">ISSUE</v-btn>
            </v-layout>
          </td>
        </template>
      </v-data-table>

      <v-flex v-if="runSearch || showTable" xs12 sm6 md4 mt-5 mx-auto text-xs-center>
        <v-item-group class="v-btn-group" v-show="!loading">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn flat class="secondary " @click="getNonIssuedReceipts(pages.first)" v-on="on"><v-icon right>fast_rewind</v-icon></v-btn>
            </template>
            <span>Firstpage</span>
          </v-tooltip>
          <v-btn flat class="secondary" @click="getNonIssuedReceipts(pages.previousPage)" :disabled="pages.previousPage == null"><v-icon right>mdi-arrow-left-bold</v-icon> Previous Page
          </v-btn>
          <v-btn flat class="secondary" @click="getNonIssuedReceipts(pages.nextPage)" :disabled="pages.nextPage == null">Next Page <v-icon right>mdi-arrow-right-bold</v-icon>
          </v-btn>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn flat class="secondary " @click="getNonIssuedReceipts(pages.last)" v-on="on"><v-icon right>fast_forward</v-icon></v-btn>
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
          @click="printReceipt('receiptArea')">
          <v-icon>print</v-icon> Print</v-btn>
        </v-layout>

        <v-card-text class="text-md-center" v-show="!contentFetched">
          <v-progress-circular
          indeterminate
          color="blue"
          ></v-progress-circular>
        </v-card-text>
        <v-card-text v-if="contentFetched">
          <Receipt id="receiptArea" :result="receipt" />
        </v-card-text>

      </v-card>
    </v-dialog>

    </section>
</template>

<script>
import Receipt from "~/components/receipt";

var PHE = require("print-html-element");
export default {
  components: {
    Receipt,
  },
  props: {
    runSearch: {
      default: false,
      type: Boolean,
    }
  },
  data() {
    return {
      dateMenu: false,
      dateMenu2: false,
      showTable: false,
      openModal: false,
      contentFetched: false,
      searching: false,
      date: new Date().toISOString().substr(0, 10),
      startDate: '',
      errors: null,
      dateMenu: false,
      offices: [],
      searchModel: {
        params: {
          payment_reference: null,
          anssid: null,
          generated_before: '',
          generated_after: ''
        }
      },
      paramsModel: {},
      issueReceiptModel: {
        payment_reference: ''
      },
      headers: [{
          text: 'Payment Reference',
          value: 'paymentReference',
          sortable: false,
        },
        {
          text: 'Name',
          value: 'name',
          sortable: false,
        },
        {
          text: 'ANSSID',
          value: 'anssid',
          sortable: false,
        },
        {
          text: 'Revenue Name',
          value: 'revenueName',
          sortable: false,
        },
        {
          text: 'Amount (₦)',
          value: 'amount',
          sortable: false,
        },
        {
          text: "Actions",
          sortable: false,
          align: 'center'
        }
      ],
      receipt: {},
      receipts: [],
      loading: false,
      pages: {
        first: '',
        last: '',
        previousPage: '',
        nextPage: ''
      }
    }
  },


  mounted() {
    if (this.runSearch) {
      this.getNonIssuedReceipts();
    }
    
  },


  methods: {
    searchReceipts(pageUrl) {
        this.searching = true;

        for (const property in this.searchModel.params) {
          if (this.searchModel.params.hasOwnProperty(property)) {
            if (this.searchModel.params[property] != null || this.searchModel.params[property] != '' || !this.searchModel.params[property]) {
              this.paramsModel[property] = this.searchModel.params[property]
            }
          }
        }

        this.$axios.$get('Receipts/search-non-issued', {params: this.paramsModel}).then(res => {
          this.searching = false;
          this.showTable = true;
          this.receipts = res.data;
          this.pages.previousPage = res.links.prev;
          this.pages.nextPage = res.links.next;
          this.pages.first = res.links.first;
          this.pages.last = res.links.last;
        }, error => {
            this.errors = error.response.data.error;
            this.searching = false;
            this.showTable = false;
        });
    },

    printReceipt(id) {
      PHE.printElement(document.getElementById(id));
    },
    
    getNonIssuedReceipts(pageUrl = null) {
        this.loading = true;
        let url = "Receipts/non-issued";
        if (pageUrl != null) {
          url = pageUrl;
        }
        this.$axios.$get(url, {params: this.paramsModel}).then(res => {
          this.receipts = res.data;
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
    issueReceipt(paymentReference) {
      this.contentFetched = false;
      this.openModal = true;
      this.issueReceiptModel.payment_reference = paymentReference;
      this.$axios.$post('Receipts/issue-receipt',  this.issueReceiptModel).then(res => {
        this.contentFetched = true;
        this.receipt = res.data;
        this.getNonIssuedReceipts();
      }, error => {
        this.contentFetched = false;
          this.errors = error.response.data.error;
      });
    },
  }
}
</script>
