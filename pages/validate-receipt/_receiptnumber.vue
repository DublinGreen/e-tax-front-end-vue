<template>
<v-container grid-list-xs>

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
    this.validateReceipt();
  },

  methods: {
    validateReceipt() {
      if(navigator.onLine) {
        this.loading = true;
        this.$axios.$get('Common/verify-receipt/' + this.$router.currentRoute.params.receiptnumber).then(res => {
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
          this.$router.push('/validate-receipt');
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
