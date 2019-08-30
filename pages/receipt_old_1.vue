<template>
  <v-container class="dashboard-wrapper">
    <div class="headline mb-5 font-weight-medium">
      RECEIPT ISSUANCE
      <v-btn
        round
        color="blue white--text"
        v-if="receiptGenerated"
        @click="resetSearchResults()"
      >Click To Issue Another Receipt</v-btn>
    </div>

    <v-sheet class="px-4 pt-4 pb-5 my-shadow-2" style="opacity: 0.9">
      
        <NonIssuedReceipts :runSearch="false" />
      
    </v-sheet>
    

  </v-container>
</template>

<style lang="scss" scoped>
</style>

<script>
import Receipt from "~/components/receipt";
import receiptCategories from "@/utils/route";
import NonIssuedReceipts from '~/components/tabs/nonissuedreceipts'
import axios from "axios";
import uuid from "uuid";

var PHE = require("print-html-element");
export default {
  layout: "user",
  components: {
    Receipt,
    NonIssuedReceipts
  },
  data() {
    return {
      valid: false,
      date: new Date().toISOString().substr(0, 10),
      fetching: false,
      loading: false,
      errors: null,
      receipt: {},
      receiptModel: {
        payment_reference: "",
      },
      receiptGenerated: false,
      // paymentReferenceRules: [
      //   v => !!v || 'Payment Reference is required',
      // ],
      // anssidRules: [
      //   v => !!v || 'ANSSID Number is required',
      // ],
    };
  },

  mounted: function() {
    this.$store.dispatch('auth/checkPermission', ['ISSUE_RECEIPT']);
  },

  methods: {
    generateReceipt() {
      this.loading = true;
      this.$axios.$post("Receipts/issue-receipt", this.receiptModel).then(
        res => {
          this.$toast.success("Receipt successfully issued!");
          this.loading = false;
          this.receipt = res.data;
          this.receiptGenerated = true;
        },
        error => {
          this.loading = false;
          this.errors = error.response.data.error;
        }
      );
    },
    printReceipt(id) {
      PHE.printElement(document.getElementById(id));
    },
    resetSearchResults() {
      this.receiptGenerated = false;
      this.receiptModel = {};
      this.errors = null;
    }
  },

  created() {
  },
};
</script>
