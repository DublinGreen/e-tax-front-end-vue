<template>
<section>
  <v-layout row wrap>
    <v-flex md12 sm12 mt-4>
      <v-sheet class="grey lighten-2 pa-3 text-xs-center font-weight-bold caption mb-4">Narrow down search results by using the options below. You must alter at least one of the fields, then click the search button</v-sheet>
    </v-flex>

      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">Receipt Number</div>
        <v-text-field v-model="searchModel.params.receipt_number" outline>
          <div class="" slot="label">Search by receipt number</div>
        </v-text-field>
      </v-flex>

      <!-- <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">Name</div>
        <v-text-field  v-model="searchModel.params.name" outline>
          <div class="" slot="label">Search by payer's name</div>
        </v-text-field>
      </v-flex> -->

      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">ANSSID</div>
        <v-text-field v-model="searchModel.params.anssid" outline>
          <div class="" slot="label">Search by ANSSID</div>
        </v-text-field>
      </v-flex>

      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">Revenue Name</div>
        <v-text-field v-model="searchModel.params.revenue_name" outline>
          <div class="" slot="label">Search by revenue name</div>
        </v-text-field>
      </v-flex>

      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">Amount</div>
        <v-text-field v-model="searchModel.params.amount" outline>
          <div class="" slot="label">Search by amount paid</div>
        </v-text-field>
      </v-flex>

      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">Issue Date</div>

        <v-menu ref="dateMenu" v-model="dateMenu" :close-on-content-click="false" :nudge-right="40" lazy transition="scale-transition" offset-y full-width max-width="290px" min-width="290px">

          <template v-slot:activator="{ on }">
            <v-text-field outline v-model="searchModel.params.issue_date" label="Choose Date" append-icon="mdi-calendar-clock" @blur="date = parseDate(startDate)" v-on="on"></v-text-field>
          </template>

          <v-date-picker color="secondary" v-model="searchModel.params.issue_date" no-title @input="dateMenu = false"></v-date-picker>
        </v-menu>
      </v-flex>

      <v-flex xs12 sm6 md4 mx-auto>
        <v-btn small flat block round @click="searchReceipts" :loading="searching" :disabled="searching" class="secondary caption mt-4">Search</v-btn>
        <!-- <v-btn small flat block round @click="resetSearch" class="secondary caption mt-4">Reset</v-btn> -->
      </v-flex>
    </v-layout>

      <v-data-table hide-actions :headers="headers" :items="receipts">
        <template v-slot:items="props">
          <td>{{ props.item.ReceiptNumber }}</td>
          <td>{{ props.item.PayerName }}</td>
          <td>{{ props.item.ANSSID }}</td>
          <td>{{ props.item.RevenueName }}</td>
          <td>{{ props.item.Amount | formatNumber }}</td>
          <td>{{ props.item.DateIssued | moment("YYYY-MM-DD") }}</td>
          <td class="text-xs-center">
            <v-layout>
              <v-btn flat small class="primary action-btn" @click="viewReceipt(props.item.ID)">View</v-btn>
            </v-layout>
          </td>
        </template>
      </v-data-table>

      <v-flex xs12 sm6 md4 mt-5 mx-auto text-xs-center>
        <v-item-group class="v-btn-group" v-show="!loading">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn flat class="secondary " @click="getIssuedReceipts(pages.first)" v-on="on"><v-icon right>fast_rewind</v-icon></v-btn>
            </template>
            <span>Firstpage</span>
          </v-tooltip>
          <v-btn flat class="secondary" @click="getIssuedReceipts(pages.previousPage)" :disabled="pages.previousPage == null"><v-icon right>mdi-arrow-left-bold</v-icon> Previous Page
          </v-btn>
          <v-btn flat class="secondary" @click="getIssuedReceipts(pages.nextPage)" :disabled="pages.nextPage == null">Next Page <v-icon right>mdi-arrow-right-bold</v-icon>
          </v-btn>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn flat class="secondary " @click="getIssuedReceipts(pages.last)" v-on="on"><v-icon right>fast_forward</v-icon></v-btn>
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
  data() {
    return {
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
          receipt_number: null,
          // name: null,
          anssid: null,
          revenue_name: null,
          amount: null,
          issue_date: null
        }
      },
      paramsModel: {},
      headers: [{
          text: 'Receipt No',
          value: 'receiptNo',
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
          text: 'Issue Date',
          value: 'issueDate',
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
    this.getIssuedReceipts();
  },


  methods: {
    searchReceipts(pageUrl) {
        this.searching = true;

        for (const property in this.searchModel.params) {
          if (this.searchModel.params.hasOwnProperty(property)) {
            if (this.searchModel.params[property] != null ) {
              this.paramsModel[property] = this.searchModel.params[property]
            }
          }
        }

        this.$axios.$get('Receipts/search', {params: this.paramsModel}).then(res => {
          this.receipts = res.data;
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
    getIssuedReceipts(pageUrl = null) {
        this.loading = true;
        let url = "Receipts/issued";
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
    viewReceipt(receiptNumber) {
      this.contentFetched = false;
      this.openModal = true;
      this.$axios.$get('Receipts/get/' + receiptNumber).then(res => {
        this.contentFetched = true;
        this.receipt = res.data;
      }, error => {
          this.errors = error.response.data.error;
      });
    },
    printReceipt(id) {
      PHE.printElement(document.getElementById(id));
    },
  }
}
</script>
