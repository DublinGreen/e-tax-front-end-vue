<template>
<section class="receipt-wrapper">
  <v-layout row wrap>
    <v-flex sm12 lg12 xl9 mx-auto>
      <v-img src="/receipt/receipt-bg.png" class="mx-auto bg">
        <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-layout>
        <v-layout row wrap mx-4 mt-2>
          <v-flex md2>
            <v-img src="/receipt/anambra-logo.png" class="logo">
              <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </v-layout>
            </v-img>
          </v-flex>

          <v-flex md8>
            <div class="font-weight-bold text-xs-center receipt-title mt-2">GOVERNMENT OF ANAMBRA STATE, NIGERIA</div>
            <div class="font-weight-regular text-xs-center receipt-title">Anambra Internal Revenue Service (AIRS)</div>
            <div class="font-weight-thin text-xs-center receipt-title-2">Revenue House, 1 Esther Obiakor Avenue Awka</div>
          </v-flex>

          <v-flex md2>
            <v-img src="/receipt/airs-logo.png" class="logo2">
              <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </v-layout>
            </v-img>
          </v-flex>
        </v-layout>

        <div class="receipt-number font-weight-bold">RECEIPT NO : <span class="font-weight-regular">{{ result.receipt_number }}</span></div>

        <v-layout row wrap mt-3 v-if="result.receipt_type == 'TAX'">
          <v-flex xs6 md6 lg6>
            <v-sheet style="border-radius: unset" dark class="green text-xs-center receipt-header">RECEIPT CATEGORY</v-sheet>

            <v-sheet style="border-radius: unset" class="font-weight-bold ml-4 transparent">
              <div class="receipt-item">Payment Reference :</div>
              <div class="receipt-item">Bill Reference Code :</div>
              <div class="receipt-item">Payment Date :</div>
              <div class="receipt-item">ANSSID :</div>
              <div class="receipt-item">Name :</div>
              <div class="receipt-item">Tax Payer Address :</div>
              <div class="receipt-item">Revenue Code :</div>
              <div class="receipt-item">MDA Name :</div>
              <div class="receipt-item">Revenue Name :</div>
              <div class="receipt-item" style="height:40px;">Amount Billed :</div>
              <div class="receipt-item" style="height:40px;">Amount Due :</div>
              <div class="receipt-item" style="height:40px;">Amount Paid :</div>
              <div class="receipt-item" style="height:40px;">Amount Remaining (Balance) :</div>
              <div class="receipt-item">Payment Channel :</div>
              <div class="receipt-item">Fiscal Period Covered :</div>
              <div class="receipt-item">Receipt Issued by :</div>
              <div class="receipt-item">Issue Date:</div>
              <div class="receipt-item">Tax Office:</div>
              <div class="receipt-item">Revenue / Processing Zone :</div>
            </v-sheet>
          </v-flex>

          <v-flex xs6 md6 lg6>
            <v-sheet style="border-radius: unset" dark class="grey text-xs-center receipt-header">GENERAL</v-sheet>

            <v-sheet style="border-radius: unset; opacity: 0.6" class="mr-4 grey lighten-2">
              <div class="receipt-item">{{ result.payment_reference }}</div>
              <div class="receipt-item">{{ result.bill_reference_code }}</div>
              <div class="receipt-item">{{ result.payment_date_time }}</div>
              <div class="receipt-item">{{ result.anssid }}</div>
              <div class="receipt-item">{{ result.anssid_name }}</div>
              <div class="receipt-item">{{ result.tax_payer_address }}&nbsp;</div>
              <div class="receipt-item">({{ result.revenue_code }})</div>
              <div class="receipt-item">{{ result.agency_name }}</div>
              <div class="receipt-item">{{ result.revenue_name }}</div>
              <div class="receipt-item" style="height:40px;">(N{{ result.amount_billed }}) {{ result.amount_billed | toWords }} naira only</div>
              <div class="receipt-item" style="height:40px;">(N{{ result.amount_due }}) {{ result.amount_due | toWords }} naira only</div>
              <div class="receipt-item" style="height:40px;">(N{{ result.amount }}) {{ result.amount | toWords }} naira only</div>
              <div class="receipt-item" style="height:40px;">(N{{ result.amount_remaining }}) {{ result.amount_remaining | toWords }} naira only</div>
              <div class="receipt-item">{{ result.payment_channel }}</div>
              <div class="receipt-item">{{ result.fiscal_period }} ({{ result.fiscal_date}})</div>
              <div class="receipt-item">{{ result.issuer }}</div>
              <div class="receipt-item">{{ result.date_issued }}</div>
              <div class="receipt-item">{{ result.tax_office }}</div>
              <div class="receipt-item">{{ result.processing_zone }}</div>
            </v-sheet>
          </v-flex>
        </v-layout>

        <v-layout row wrap mt-3 v-if="result.receipt_type == 'NON_TAX'">

          <v-flex xs12 md12 lg12 mb-2 mt-2>
            <v-sheet style="border-radius: unset;" class="text-xs-left receipt-header">PAYERS INFORMATION</v-sheet>
          </v-flex>

          <v-flex xs4 md4 lg4>

            <v-sheet style="border-radius: unset;" class="left-title font-weight-bold">
              <div class="receipt-item">Name:</div>
              <div class="receipt-item">ANSSID:</div>
            </v-sheet>
          </v-flex>

          <v-flex xs8 md8 lg8>

            <v-sheet style="border-radius: unset;" class="lighten-2 right-title">
              <div class="receipt-item">{{ result.anssid_name }}</div>
              <div class="receipt-item">{{ result.anssid }}</div>
            </v-sheet>
          </v-flex>


          <v-flex xs12 md12 lg12 mb-3 mt-3>
            <v-sheet style="border-radius: unset;" class="text-xs-left receipt-header">PAYMENT DESCRIPTION</v-sheet>
          </v-flex>


          <v-flex xs4 md4 lg4>

            <v-sheet style="border-radius: unset" class="font-weight-bold left-title">
              <div class="receipt-item">Payment Date :</div>
              <div class="receipt-item">Payment Reference :</div>
              <div class="receipt-item">Revenue Code :</div>
              <div class="receipt-item">Revenue Name :</div>
              <div class="receipt-item amount">Amount Billed :</div>
              <div class="receipt-item amount">Amount Due :</div>
              <div class="receipt-item amount">Amount Paid :</div>
              <div class="receipt-item amount">Amount Remaining (Balance) :</div>
              <div class="receipt-item">Receipt Issued by :</div>
              <div class="receipt-item">Fiscal Period Covered :</div>
              <div class="receipt-item">Issue Date:</div>
              <div class="receipt-item">Tax Office:</div>
              <div class="receipt-item">Revenue / Processing Zone :</div>
            </v-sheet>
          </v-flex>

          <v-flex xs8 md8 lg8>

            <v-sheet style="border-radius: unset;" class="lighten-2 right-title">
              <div class="receipt-item">{{ result.payment_date_time }}</div>
              <div class="receipt-item">{{ result.payment_reference }}</div>
              <div class="receipt-item">{{ result.revenue_code }}</div>
              <div class="receipt-item">{{ result.revenue_name }}</div>
              <div class="receipt-item amount">(N{{ result.amount_billed | formatNumber }}) {{ result.amount_billed | toWords }} naira only <br></div>
              <div class="receipt-item amount">(N{{ result.amount_due | formatNumber }}) {{ result.amount_due | toWords }} naira only <br></div>
              <div class="receipt-item amount">(N{{ result.amount | formatNumber }}) {{ result.amount | toWords }} naira only <br></div>
              <div class="receipt-item amount">(N{{ result.amount_remaining | formatNumber }}) {{ result.amount_remaining | toWords }} naira only <br></div>
              <!-- <div class="receipt-item">2019</div> -->
              <div class="receipt-item">{{ result.issuer }}</div>
              <div class="receipt-item">{{ result.fiscal_period }} ( {{result.fiscal_date}} )</div>
              <div class="receipt-item">{{ result.date_issued }}</div>
              <div class="receipt-item">{{ result.tax_office }}</div>
              <div class="receipt-item">{{ result.processing_zone }}</div>
            </v-sheet>
          </v-flex>

          <v-flex xs12 md12 lg12 mb-3 mt-3>
            <v-sheet style="border-radius: unset;" class="text-xs-left receipt-header">PAYMENT CHANNEL INFORMATION</v-sheet>
          </v-flex>

          <v-flex xs4 md4 lg4>

            <v-sheet style="border-radius: unset" class="font-weight-bold left-title">
              <div class="receipt-item">Payment Channel :</div>
            </v-sheet>
          </v-flex>

          <v-flex xs8 md8 lg8>

            <v-sheet style="border-radius: unset;" class="lighten-2 right-title">
              <div class="receipt-item">{{ result.payment_channel }}</div>
            </v-sheet>
          </v-flex>

        </v-layout>



        <v-layout row wrap mt-3>
          <v-flex md8 pl-4>
            <v-img v-bind:src="qrimage" class="barcode">
              <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </v-layout>
            </v-img>
            <div class="url font-weight-bold mt-2">Verification URL: <span class="font-weight-regular">{{ validateReceiptUrl }}</span></div>
            <div class="url font-weight-bold">Verification Code: <span class="font-weight-regular">{{ result.receipt_number }}</span></div>
          </v-flex>

          <v-flex md4>
            <div class="signature-wrapper">
              <v-img class="mx-auto signature" src="/receipt/sigature.png">
                <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-layout>
              </v-img>
              <hr>
              <div class="signatory font-weight-bold">Dr David Nzekwu</div>
              <div class="signatory">Executive Chairman, <span class="primary--text">AIRS</span></div>
            </div>
          </v-flex>
        </v-layout>

        <v-layout class="receipt-footer">
          
          <v-flex md8>
            <v-img src="/receipt/anscims-logo.png" class="footer-logo" width="100"></v-img>
          </v-flex>

          <v-flex md4>
            <v-img src="/receipt/uoe-domos.png" class="footer-logo-2"></v-img>
          </v-flex>
        </v-layout>
      </v-img>
    </v-flex>
  </v-layout>
</section>
</template>

<script>
export default {
  props: ['result'],
  data() {
    return {
      google_qr_api: "https://chart.googleapis.com/chart?cht=qr&chs=100x100&chl=",
      validateReceiptUrl: '',
      qrimage: ''
    }
  },
  mounted() {
    this.generateValidateUrl();
  },
  methods: {
    generateValidateUrl() {
      this.validateReceiptUrl = window.location.origin + '/validate-receipt/' + this.result.receipt_number;
      this.qrimage = this.google_qr_api + this.validateReceiptUrl;
    },
  }
}
</script>

<style lang="scss" scoped>


@media print {
    @page { size: auto;  margin: 1em; padding: 1em; }
    body {
      margin: 1.6cm;
    }
}

.receipt-footer {
  margin: 1em 0 2em 0;
  padding-bottom: 2em;
}

.left-title {
  background: rgba(0, 128, 1, 0.71); color:#fff; font-weight: bold; font-size: 16px;
}
.right-title {
   background: rgba(73, 164, 80, 0.28); color: #000; font-weight: bold; font-size: 16px;
}
.bg {
  // width: 595px;
  height: 950px;
  background-color: white;
}

.receipt-title {
  font-size: 1.15em;
}

.receipt-title-2 {
  font-size: 0.8em;
}

.logo {
  width: 80px;
}

.logo2 {
  width: 97px;
}

.receipt-number {
  font-size: 1em;
  text-align: right;
  margin: 10px 20px 0 0;
}

.receipt-item {
  font-size: 0.7em;
  padding: 6px 0 6px 27px;
  border-bottom: green solid 1px;
}

.receipt-item-bottom {
  font-size: 0.7em;
  padding: 20px 0 0 25px;
}

.custom-receipt-item {
  padding-top: 37px;
}

.receipt-header {
  background:#fdc25b; opacity: 0.8; font-weight: bolder; font-size: 20px; padding:10px; padding-left:30px;
}

.barcode {
  width: 60px
}

.url {
  font-size: 0.6em;
}

.signature-wrapper {
  width: 160px;
  padding-right: 15px;
  margin-top: 14px;
  margin-left: auto;
  margin-right: auto;
}

.signature {
  width: 90px;
}

.signatory {
  font-size: 0.8em
}

.footer-logo-1 {
  margin-top: 15px;
  margin-left: 25px;
  width: 80px;
}

.footer-logo-2 {
  margin-top: 15px;
  margin-right: 25px;
  width: 180px;
  float: right;
}

.receipt-item.amount {
  height: 40px;
}

@media print {
  .bg {
    width: 1090px;
    min-height: 1505px;
    height: 100%;
    background-color: white;

  }
  .receipt-item.amount {
    height: 100px !important;
    // padding: 0 !important;
  }
  .receipt-title {
    font-size: 2.2em;
  }

  .receipt-title-2 {
    font-size: 1.5em;
  }

  .logo {
    width: 135px;
  }

  .logo2 {
    width: 152px;
  }

  .receipt-number {
    font-size: 1.6em;
    text-align: right;
    padding: 10px 50px 0 0;
  }

  .receipt-item {
    font-size: 1.4em;
    padding: 33px 0 5px 25px;

  }

  .receipt-item-bottom {
    font-size: 1.4em;
    padding: 43px 0 5px 25px;
  }

  .custom-receipt-item {
    padding-top: 53px;
    box-sizing: content-box;
  }

  .receipt-header {
    font-size: 1.9em;
    font-weight: bold;
    padding: 20px 0;
  }

  .barcode {
    width: 90px
  }

  .url {
    font-size: 1em;
  }

  .signature-wrapper {
    width: 230px;
    margin-top: 10px;
  }

  .signature {
    width: 150px;
  }

  .signatory {
    font-size: 1.1em
  }

  .footer-logo-1 {
    margin-top: 35px;
    margin-left: 25px;
    width: 130px;
  }

  .footer-logo-2 {
    // margin-top: 35px;
    // // margin-right: 25px;
    // width: 230px;
    // float: unset;
    // position: fixed;
    // right: 25px;
  }
}
</style>
