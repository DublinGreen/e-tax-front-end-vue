<template>
<v-container grid-list-lg class="dashboard-wrapper">
  <div class="headline mb-5 font-weight-medium">Generate Payment Bill</div>

  <v-sheet class="px-4 pt-4 pb-5 my-shadow-2" style="opacity: 0.9">
    <alert :data="alert_data"></alert>
    <form-section-title title="Assessments"></form-section-title>
    <v-layout row wrap>
       <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">Assessment Period</div>
        <v-select 
          item-text="name"
          item-value="period"
          :items="[{period:'monthly',name:'Monthly'},{period:'yearly',name:'Yearly'}]" 
          outline 
          v-model="bill.fiscal_period"
          name="fiscal period"
          v-validate="'required'">
          <div slot="label">Choose</div>
        </v-select>
        <div class="error-box">{{ errors.first('fiscal period') }}</div>
        
        </v-flex >
        <v-flex xs12 sm6 md4 v-if="displayFiscalMonth()">
          <div class="caption font-weight-bold mb-1">Assessment Month</div>
          <v-select 
            item-text="name"
            item-value="id"
            :items="months" 
            outline 
            v-model="bill.fiscal_month"
            name="fiscal month"
            v-validate="'required'">
            <div slot="label">Choose</div>
          </v-select>
          <div class="error-box">{{ errors.first('fiscal month') }}</div>
          
        </v-flex>
        <v-flex xs12 sm6 md4  v-if="displayFiscalYear()">
          <div class="caption font-weight-bold mb-1">Assessment Year</div>
          <v-select 
            :items="years" 
            outline 
            v-model="bill.fiscal_year"
            name="fiscal year"
            v-validate="'required'">
            <div slot="label">Choose</div>
          </v-select>
          <div class="error-box">{{ errors.first('fiscal year') }}</div>
          
        </v-flex>
    </v-layout>
    <form-section-title title="Revenue Sector and Source"></form-section-title>
    <v-layout row wrap>
      <v-flex xs12 sm12 md4>
        <div class="caption font-weight-bold mb-1">MDA</div>
        <v-select 
          item-text="name"
          item-value="code"
          :items="mdas" 
          outline 
          v-model="bill.agency_code"
          name="mda"
          v-validate="'required'"
          @change="getRevenueSource(bill.agency_code)">
          <div slot="label">Choose</div>
        </v-select>
        <div class="error-box">{{ errors.first('mda') }}</div>
        
      </v-flex>
      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">Revenue Source</div>
        <v-select 
          item-text="name"
          item-value="category_and_code"
          :items="revenues" 
          required
          outline 
          v-model="bill.revenue_code"
          @change="filterAndSetup()"
          name="revenue source"
          v-validate="'required'">
          <div slot="label">Choose</div>
        </v-select>
        <div class="error-box">{{ errors.first('revenue source') }}</div>
      </v-flex>
      <v-flex xs12 sm6 md4>
          <div class="caption font-weight-bold mb-1">Select Bills Tax Category</div>
          <v-select 
            :items="bill_category"
            item-text="name"
            item-value="name"
            outline 
            v-model="bill.bill_category"
            name="bill category"
            v-validate="'required'">
            <div slot="label">Choose</div>
          </v-select>
          <div class="error-box">{{ errors.first('bill category') }}</div>
        </v-flex>
    </v-layout>
    <paye :model="bill.payment_breakdown" 
      :bill-category="bill.bill_category" 
      @generateBill="generateBill">
    </paye>
    <dta :model="bill.payment_breakdown" 
      :bill-category="bill.bill_category" 
      @generateBill="generateBill">
    </dta>
    <others :model="bill.payment_breakdown" 
      :bill-category="bill.bill_category" 
      @generateBill="generateBill">
    </others>
      
    <section class="mt-5" v-if="new_bill.generated">
        <v-data-table hide-actions :headers="headers" :items="new_bill.data">
          <template v-slot:items="props">
            <td>{{ props.item.reference_code }}</td>
            <td>{{ props.item.anssid }}</td>
            <td>{{ props.item.anssid_name }}</td>
            <td>{{ props.item.total_amount_payable | formatNumber }}</td>
            <td>{{ props.item.revenue_name }}</td>
            <td class="text-xs-center">
              <v-layout>
                <v-btn flat small class="primary action-btn" @click="viewBill(props.item)">View</v-btn>
                <!-- <v-btn flat small class="primary action-btn" @click="editBill(props.item)">Edit</v-btn> -->
              </v-layout>
            </td>
          </template>
        </v-data-table>

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
              <bill id="bill_area" :result="new_bill.data[0]"></bill>
            </v-card-text>

          </v-card>
        </v-dialog>
      </section>
  </v-sheet>

</v-container>
</template>
<style>
  .error-box{
    color: rgb(163, 0, 0);
    margin-top:-12px
  }
</style>

<script>
import alert from '@/components/alert'
import Bill from "~/components/bill";
import TaxPayable from "~/utils/services/TaxPayable";
import General from "~/utils/services/General";
import BillTaxCategory from "~/utils/models/BillTaxCategory";
// components
import form_section_title from '~/components/html/form_section_title'
import paye from '~/components/bill_computation/paye'
import dta from '~/components/bill_computation/dta'
import others from '~/components/bill_computation/others'
var PHE = require('print-html-element')
export default {
  layout: 'user',
  components:{
    bill:Bill,
    alert,
    'form-section-title':form_section_title,
    paye,
    dta,
    others
  },
  data() {
    return {
      taxPayableService : new TaxPayable(),
      generalService : new General(),
      billTaxCategory : new BillTaxCategory(),
      alert_data:{
        errors:null,
        success:null
      },
      contentFetched:false,
      openModal:false,
      revenue_category:'',
      bill: {
        anssid:'',
        staff_anssid:'',
        agency_code:'',
        revenue_code:'',
        revenue_category:'',
        amount:'',
        payment_breakdown:{
          allowable_deductions:{
            life_insurance : 0,
            nhf:0,
            nhis:0,
            pension: {
                basic:0,
                housing:0,
                transport:0,
                computed:0
            },
          },
          annual_amount_payable:0,
          amount_payable:0,
          tax_free_income:0,
          taxable_income:0,
          consolidated_relief_allowance:0
        },
        fiscal_period:'',
        fiscal_month:'',
        fiscal_year:'',
        fiscal_date:'',
        tax_office_uuid:'',
        bill_category:''
      },
      new_bill:{
        generated:false,
        data:[]
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
          text: 'Revenue Name',
          value: 'revenueName',
          sortable: false,
        },
        {
          text: '',
          value: '',
          sortable: false,
        },
      ],
      mdas: [],
      revenues: [],
      bill_category:[]
    }
  },

  mounted() {
    this.getMda();
  },

  computed: {
    computedstartDate() {
      return this.formatDate(this.date)
    },
    years(){
      return [2000,2001,2002,2003,2004,2005,2006,2007,2008,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022]
    },
    months(){
      return [
        {id:1,name:'Jan'},
        {id:2,name:'Feb'},
        {id:3,name:'Mar'},
        {id:4,name:'Apr'},
        {id:5,name:'May'},
        {id:6,name:'Jun'},
        {id:7,name:'Jul'},
        {id:8,name:'Aug'},
        {id:9,name:'Sep'},
        {id:10,name:'Oct'},
        {id:11,name:'Nov'},
        {id:12,name:'Dec'}
      ]
    }
  },

  methods: {
      processAnssid(value){
          this.bill = {...value}
      },
      processChildComputation(value){
        this.bill.anssid =  value.anssid.anssid;
        this.bill.staff_anssid =  value.anssid.staff_anssid;
        this.bill.payment_breakdown = value.payment_breakdown;
      },
      printBill(id) {
        PHE.printElement(document.getElementById(id));
      },
      viewBill(bill){
        this.contentFetched = false;
        this.openModal = true;
        this.contentFetched = true;
      },

      displayFiscalYear(){
        if(this.bill.fiscal_period) return true;
        return false;
      },

      displayFiscalMonth(){
        if(this.bill.fiscal_period && this.bill.fiscal_period == 'monthly') return true;
        return false;
      },
      filterAndSetup(){
        this.revenue_category = '';
        let selectedRevenue = this.bill.revenue_code.split(':');
        this.revenue_category = selectedRevenue[0];  // this.revenue_category === "TAX"
        this.bill_category = this.billTaxCategory.getAll();
      },

      resetAlert(){
        this.alert_data = {errors:null,success:null};
      },
      resetForm(){
        // this.mdas = []
        this.revenues = [];
        this.bill_category = [];
        this.bill = this.generalService.getBillModel()
      },

      setFiscalDate(){
        let fiscal_year = this.bill.fiscal_year;
        let fiscal_month = this.bill.fiscal_month;
        if(fiscal_month !== '' && fiscal_month < 10){
          fiscal_month = `0${fiscal_month}`;
        }

        if(fiscal_month && fiscal_year ){
          this.bill.fiscal_date = `${fiscal_year}-${fiscal_month}-01`;
        }else if(fiscal_year){
          this.bill.fiscal_date = `${fiscal_year}-01-01`
        }
      },
    generateBill(value){
      this.processChildComputation(value);
      this.resetAlert();
       this.$validator.validate()
       .then(valid => {
        if (valid) {
            this.setFiscalDate();
            this.bill.revenue_code = this.bill.revenue_code.split(':')[1];
            this.bill.amount = this.bill.payment_breakdown.amount_payable;
            this.$axios.post('bills/generate', this.bill)
            //   console.log(this.bill);
            .then(response => {
                this.alert_data.success = response.data.message;
                this.new_bill.generated = true;
                this.new_bill.data = [];
                this.new_bill.data.push(response.data.bill);
                this.resetForm();
            })
            .catch(error => {
                if(error.response.data.code == 4000){
                    this.alert_data.errors = error.response.data.error
                }
                else if(error.response.data.code == 4001){
                // logout user
                // push to login page
                }
            });
        }
      })
    },
    getMda(){
      this.$axios.get('MDAs/get-mdas')
          .then(response => {
              this.mdas = response.data.data;

          })
          .catch(error => {
            // if(error.response.data.code == 4001){
            //     this.alertErrors = error.response.data.error
            // }
          });
    },
    getRevenueSource(agency_code){
      this.$axios.get(`MDAs/revenue-sources/${agency_code}`)
          .then(response => {
              this.revenues = response.data.data;
              this.filterAndSetup()
          })
          .catch(error => {
            // if(error.response.data.code == 4001){
            //     this.alertErrors = error.response.data.error
            // }
          });
    },
  }
}
</script>
