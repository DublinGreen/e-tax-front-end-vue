<template>
<v-container grid-list-xs>

<v-layout align-center justify-center  v-show="!receiptGenerated">
    <v-flex xs12 md7 lg6 offset-md3 offset-sm3>
      <nuxt-link to="/">
        <v-img src="/anscims-logo.svg" class="mx-auto mb-2" width="300"></v-img>
      </nuxt-link>
      <v-sheet class="my-shadow curved-edges pa-5">
        <div class="secondary--text mb-4 text-xs-center">Enter the receipt number to validate</div>

        <v-form v-model="validateForm" v-on:submit.prevent="validateReceipt">

          <v-layout row wrap>
            <v-flex xs12 sm3 mt-1 :text-xs-right="this.$vuetify.breakpoint.smAndUp">
              <div class="caption mb-1 secondary--text">Receipt Number:</div>
            </v-flex>
            <v-flex xs12 sm9 :pl-2="this.$vuetify.breakpoint.smAndUp">
              <v-text-field placeholder="Enter your receipt number" :rules="receiptnumberRules" v-model="receiptModel.receipt_number" required autofocus outline></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 sm3></v-flex>
            <v-flex :pl-2="this.$vuetify.breakpoint.smAndUp" xs12 sm9 text-xs-center>
              <v-btn :loading="loading" :disabled="loading || !validateForm"  type="submit" dark class="secondary caption" flat small round block>VERIFY</v-btn>
              <span class="secondary--text caption"><nuxt-link class="secondary--text" to="/">&laquo; Back to Login</nuxt-link></span>
            </v-flex>
          </v-layout>
        </v-form>
      </v-sheet>
    </v-flex>
  </v-layout>

<v-flex class="hidden-xs-only" v-show="receiptGenerated">

    <v-layout justify-center mb-4 mt-1>
      <v-btn class="" @click="goBack">&laquo; Go back</v-btn>
    </v-layout>

<Receipt id="receiptArea" :result="receipt" />
  <v-layout mt-4 justify-center>
    <v-btn
      style="width: 200px"
      flat
      round
      class="secondary caption"
      @click="printReceipt('receiptArea')"
    >Print Reciept</v-btn>
  </v-layout>

</v-flex>

</v-container>
</template>

<script>
import Receipt from "~/components/receipt";
var PHE = require("print-html-element");

export default {
  components: {
    Receipt
  },
  data() {
    return {
      validateForm: false,
      receiptGenerated: false,
      valid: false,
      loading: false,
      errors: null,
      receipt: {},
      receiptModel: {
        receipt_number: '',
      },
      receiptnumberRules: [
        v => !!v || 'Receipt number is required',
      ],
    }
  },

  created: function() {
  },

  methods: {
    validateReceipt() {
      if(navigator.onLine) {
        this.loading = true;
        this.$axios.$get('Common/verify-receipt/' + this.receiptModel.receipt_number).then(res => {
          if(res.status == true) {
            this.$toast.success('This is a valid receipt');
            this.receipt = res.data;
            this.receiptGenerated = true;
            this.loading = false;
          }else {
            this.$toast.error(res.message)
          }
        }, error => {
          this.loading = false;
          this.$toast.error(error.response.data.message)
        })
      }else {
        this.$toast.error('Please Check your Internet Connection and Try Again!');
      }
    },
    printReceipt(id) {
      PHE.printElement(document.getElementById(id));
    },
    goBack() {
      this.$router.push('/');
    }
  }
}
</script>
