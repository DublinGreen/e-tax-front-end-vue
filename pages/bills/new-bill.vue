<template>
<v-container grid-list-lg class="dashboard-wrapper">
  <div class="headline mb-5 font-weight-medium">Generate Payment Bill</div>

  <v-sheet class="px-4 pt-4 pb-5 my-shadow-2" style="opacity: 0.9">
    <alert :data="alert_data"></alert>
    <v-layout row wrap>
      <!-- <v-flex xs12 md12><h4>Assessments</h4>
         <v-divider></v-divider>
      </v-flex> -->
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
    <v-layout row wrap>
      <v-flex xs12 sm6 md4>
        <div class="caption font-weight-bold mb-1">ANSSID</div>
        <v-text-field 
          outline 
          v-model="bill.anssid"
          name="anssid"
          v-validate="'required'">
          <div class="" slot="label">ANSSID</div>
        </v-text-field>
        <div class="error-box">{{ errors.first('anssid') }}</div>
      </v-flex>
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
    </v-layout>
    
    <v-layout row wrap v-if="canShowSelectBillCategory()">
      <v-flex xs12 md12 class="sec-head"><h4>Amount Computation</h4><v-divider></v-divider></v-flex>
       
        <v-flex xs12 sm6 md4>
          <div class="caption font-weight-bold mb-1">Select Bills Tax Category</div>
          <v-select 
            :items="bill_category" 
            outline 
            v-model="bill.bill_category"
            @change="resetPaymentBreakdown()"
            name="bill category"
            v-validate="'required'">
            <div slot="label">Choose</div>
          </v-select>
          <div class="error-box">{{ errors.first('bill category') }}</div>
        </v-flex>
      
        <v-flex xs12 sm6 md4 v-if="canShowGrossPay()">
          <div class="caption font-weight-bold mb-1">Annual Gross Income</div>
          <v-text-field outline v-model="bill.payment_breakdown.gross_pay"
            name="annual gross income"
            v-on:keyup="runComputation()"
            v-validate="'required|numeric'">
            <div class="" slot="label">Annual Gross Income</div>
          </v-text-field>
          <div class="error-box">{{ errors.first('annual gross income') }}</div>
        </v-flex>
        <v-flex xs12 sm6 md4 v-if="canShowConsolidatedReliefAllowance()">
          <div class="caption font-weight-bold mb-1">Consolidated Relief Allowance</div>
          <v-text-field outline v-model="bill.payment_breakdown.consolidated_relief_allowance"
            name="consolidated relief allowance"
            v-validate="'required'"
            readonly>
          </v-text-field>
          <div class="error-box">{{ errors.first('consolidated relief allowance') }}</div>
        </v-flex>
    </v-layout>
    <v-layout row wrap v-if="canShowPensionAllowableDeduction()">
      <v-flex xs12 md12 class="sec-head"><h4>Allowable Deductions ( Pension )</h4><v-divider></v-divider></v-flex>
        <v-flex xs12 sm6 md3>
          <div class="caption font-weight-bold mb-1">Basic</div>
          <v-text-field outline v-model="bill.payment_breakdown.allowable_deductions.pension.basic"
            name="basic"
            v-on:keyup="runComputation()"
            v-validate="'required'">
            <div class="" slot="label">Basic</div>
          </v-text-field>
          <div class="error-box">{{ errors.first('basics') }}</div>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <div class="caption font-weight-bold mb-1">Housing</div>
          <v-text-field outline v-model="bill.payment_breakdown.allowable_deductions.pension.housing"
            name="housing"
            v-on:keyup="runComputation()"
            v-validate="'required'">
            <div class="" slot="label">Housing</div>
          </v-text-field>
          <div class="error-box">{{ errors.first('housing') }}</div>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <div class="caption font-weight-bold mb-1">Transport</div>
          <v-text-field outline v-model="bill.payment_breakdown.allowable_deductions.pension.transport"
            name="transport"
            v-on:keyup="runComputation()"
            v-validate="'required'">
            <div class="" slot="label">Transport</div>
          </v-text-field>
          <div class="error-box">{{ errors.first('transport') }}</div>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <div class="caption font-weight-bold mb-1">Pension Computed</div>
          <v-text-field outline v-model="bill.payment_breakdown.allowable_deductions.pension.computed"
            name="pension"
            v-validate="'required'" readonly>
          </v-text-field>
          <div class="error-box">{{ errors.first('pension') }}</div>
        </v-flex>
    </v-layout>
    <v-layout row wrap v-if="canShowOtherAllowableDeductions()">
      <v-flex xs12 md12 class="sec-head"><h4>Allowable Deductions (Others)</h4><v-divider></v-divider></v-flex>

        <v-flex xs12 sm6 md4>
          <v-checkbox 
            v-model="bill.payment_breakdown.allowable_deductions.is_nhf"
            label="NHF"
            @click="runComputation()"
          ></v-checkbox>
          <v-text-field outline v-model="bill.payment_breakdown.allowable_deductions.nhf"
              name="nhf"
              v-validate="'required'" readonly>
          </v-text-field>
          <div class="error-box">{{ errors.first('nhf') }}</div>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-checkbox
            v-model="bill.payment_breakdown.allowable_deductions.is_life_insurance"
            label="Life Insurance"
            @click="runComputation()"
          ></v-checkbox>
          <v-text-field outline v-model="bill.payment_breakdown.allowable_deductions.life_insurance"
            name="life insurance"
            v-validate="'required'" readonly>
          </v-text-field>
          <div class="error-box">{{ errors.first('life insurance') }}</div>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-checkbox 
            v-model="bill.payment_breakdown.allowable_deductions.is_nhis"
            label="NHIS"
            @click="runComputation()"
          ></v-checkbox>
          <v-text-field outline v-model="bill.payment_breakdown.allowable_deductions.nhis"
            name="nhis"
            v-validate="'required'" readonly>
          </v-text-field>
          <div class="error-box">{{ errors.first('nhis') }}</div>
        </v-flex>
    </v-layout>
    <v-layout row wrap v-if="canShowAmountRealization()">
      <v-flex xs12 md12 class="sec-head"><h4>Amount Realization</h4><v-divider></v-divider></v-flex>
        <v-flex xs12 sm6 md3>
          <div class="caption font-weight-bold mb-1">Tax Free Income</div>
          <v-text-field outline v-model="bill.payment_breakdown.tax_free_income"
            name="tax free income"
            v-validate="'required'" readonly>
          </v-text-field>
          <div class="error-box">{{ errors.first('tax free income') }}</div>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <div class="caption font-weight-bold mb-1">Taxable Income</div>
          <v-text-field outline v-model="bill.payment_breakdown.taxable_income"
            name="taxable income"
            v-validate="'required'" readonly>
          </v-text-field>
          <div class="error-box">{{ errors.first('taxable income') }}</div>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <div class="caption font-weight-bold mb-1">Annual Amount Payable</div>
          <v-text-field outline v-model="bill.payment_breakdown.annual_amount_payable" 
            name="annual amount payable"
            v-validate="'required'"
            readonly>
          </v-text-field>
          <div class="error-box">{{ errors.first('annual amount payable') }}</div>
        </v-flex>
        <v-flex xs12 sm6 md3>
          <div class="caption font-weight-bold mb-1">Amount Payable</div>
          <v-text-field outline v-model="bill.payment_breakdown.amount_payable" 
            name="amount-payable"
            v-validate="'required'"
            :readonly="canModifyAmountPayable()">
            <div class="" slot="label">Amount Payable</div>
          </v-text-field>
          <div class="error-box">{{ errors.first('amount-payable') }}</div>
        </v-flex>
    </v-layout>
    <v-layout row wrap v-if="!canModifyAmountPayable()">
      <v-flex xs12 md12 class="sec-head"><h4>Amount Realization</h4><v-divider></v-divider></v-flex>

        <v-flex xs12 sm6 md3>
          <div class="caption font-weight-bold mb-1">Amount Payable</div>
          <v-text-field outline v-model="bill.payment_breakdown.amount_payable" 
            name="amount-payable"
            v-validate="'required'"
            :readonly="canModifyAmountPayable()">
            <div class="" slot="label">Amount Payable</div>
          </v-text-field>
          <div class="error-box">{{ errors.first('amount-payable') }}</div>
        </v-flex>
    </v-layout>
    
    <v-layout row wrap v-if="canShowAddStaffAnssid()">
      <v-flex xs12 md12>
        <h4>PAYE Staff ANSSID</h4>
        <v-divider></v-divider>
      </v-flex>
        <v-flex xs12 sm6 md4>
          <div class="caption font-weight-bold mb-1">Staff ANSSID</div>
          <v-text-field outline v-model="bill.staff_anssid"
            name="staff anssid"
            v-validate="'required'">
            <div class="" slot="label">Staff ANSSID</div>
          </v-text-field>
          <div class="error-box">{{ errors.first('staff anssid') }}</div>
        </v-flex>
    </v-layout>
      
      <v-layout row wrap>
      <v-flex xs12 sm6 md4>
        <v-btn @click="generateBill()" small flat block round class="secondary caption mt-4">Generate</v-btn>
      </v-flex>
    </v-layout>
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
  .sec-head{
    /* background-color:#b4c7e8 */
    background-color:rgba(38, 144, 235, 0.2)
  }
</style>

<script>
import alert from '@/components/alert'
import Bill from "~/components/bill";
import TaxPayable from "~/utils/services/TaxPayable";
import General from "~/utils/services/General";
var PHE = require('print-html-element')
export default {
  layout: 'user',
  components:{
    bill:Bill,
    alert
  },
  data() {
    return {
      taxPayableService : new TaxPayable(),
      generalService : new General(),
      alert_data:{
        errors:null,
        success:null
      },
      contentFetched:false,
      openModal:false,
      revenue_category:'',
      bill:{
        anssid:'',
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
        staff_anssid:'',
        staff_name:'',
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
      
      bill_category:['PAYE','DTA','OTHERS'],
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
    resetPaymentBreakdown(){
      this.bill.payment_breakdown = {
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
          
        }
    },
    printBill(id) {
      PHE.printElement(document.getElementById(id));
    },
    viewBill(bill){
      this.contentFetched = false;
      this.openModal = true;
      this.contentFetched = true;
    },
    canShowAddStaffAnssid(){
        if(this.bill.bill_category == 'PAYE') return true;
        return false;
    },
    canModifyAmountPayable(){
      if(this.bill.bill_category == 'OTHERS') return false;
      return true;
    },
    haveBothPayeAndDTA(){
      if(this.bill.bill_category == 'PAYE' || this.bill.bill_category == 'DTA') return true;
      return false;
    },
    haveOnlyPaye(){
      if(this.bill.bill_category == 'PAYE') return true;
      return false;
    },
    canShowGrossPay(){
      if(this.haveBothPayeAndDTA()) return true;
      return false;
    },
    canShowConsolidatedReliefAllowance(){
      if(this.haveBothPayeAndDTA()) return true;
      return false;
    },
    canShowOtherAllowableDeductions(){
      if(this.bill.bill_category == 'PAYE') return true;
      return false;
    },
    canShowPensionAllowableDeduction(){
      if(this.bill.bill_category == 'PAYE') return true;
      return false;
    },
    canShowAmountRealization(){
      if(this.haveBothPayeAndDTA()) return true;
      return false;
    },
    canShowSelectBillCategory(){
      if(this.revenue_category) return true;
      return false;
    },
    // isPaye(){
    //   if(this.bill.revenue_category == 'TAX') return true;
    //   return false;
    // },
    
    runComputation() {
        let gross_income = this.bill.payment_breakdown.gross_pay;
        if(Number(gross_income) === 0 || isNaN(Number(gross_income))){
          gross_income = 0;
          this.resetPaymentBreakdown()
        }
        let pensions = this.generalService.getPension(this.bill.payment_breakdown.allowable_deductions.pension);
        this.bill.payment_breakdown.allowable_deductions.pension.computed = pensions;
        let basic = this.bill.payment_breakdown.allowable_deductions.pension.basic;

        let personal_allowance = this.generalService.getConsolidatedReliefAllowance(gross_income);// personal_allowance
        this.bill.payment_breakdown.consolidated_relief_allowance = personal_allowance;

        // get allowable_deductions
        let nhf = 0
        if(this.bill.payment_breakdown.allowable_deductions.is_nhf){
          nhf = this.generalService.getNHF(basic);
        }
        this.bill.payment_breakdown.allowable_deductions.nhf = nhf ;
        
        
        let life_insurance = 0
        if(this.bill.payment_breakdown.allowable_deductions.is_life_insurance){
          life_insurance = this.generalService.getLifeInsurance(basic);
        }
        this.bill.payment_breakdown.allowable_deductions.life_insurance = life_insurance;
        

        let nhis = 0
        if(this.bill.payment_breakdown.allowable_deductions.is_nhis){
          nhis = this.generalService.getNHIS(basic);
        }
        this.bill.payment_breakdown.allowable_deductions.nhis = nhis;
        

        let allowable_deduction = pensions + nhf + life_insurance + nhis; // allowable_deduction
        // console.log('allowable_deduction',allowable_deduction)

        // tax_free_income = personal_allowance + allowable_deduction
        let tax_free_income = personal_allowance + allowable_deduction;
        this.bill.payment_breakdown.tax_free_income = tax_free_income;
        // console.log('tax_free_income',tax_free_income)
        // taxable_income = gross_pay - tax_free_income
        let taxable_income = Math.abs(gross_income - tax_free_income);
        this.bill.payment_breakdown.taxable_income = taxable_income;
        // console.log('taxable_income',taxable_income)

        let tax_payable = this.taxPayableService.getAnnualtaxPayable(taxable_income);
        this.bill.payment_breakdown.annual_amount_payable = tax_payable;
        this.bill.payment_breakdown.amount_payable = this.taxPayableService.getMonthlyTaxPayable(tax_payable);

    },
    

    isTax(){
      if(this.bill.revenue_category == 'TAX') return true;
      return false;
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
      console.log('revenue_category',this.revenue_category);

    },
    resetAlert(){
      this.alert_data = {errors:null,success:null};
    },
    resetForm(){
      this.bill = {
        anssid:'',
        agency_code:'',
        revenue_code:'',
        revenue_category:'',
        amount:'',
        payment_breakdown:{},
        fiscal_period:'',
        fiscal_month:'',
        fiscal_year:'',
        fiscal_date:'',
        tax_office_uuid:'',
        staff_anssid:'',
        staff_name:'',
      }
    },
    setFiscalDate(){
      let fiscal_year = this.bill.fiscal_year;
      let fiscal_month = this.bill.fiscal_month;
      console.log(fiscal_month);
      if(fiscal_month !== '' && fiscal_month < 10){
        fiscal_month = `0${fiscal_month}`;
      }

      if(fiscal_month && fiscal_year ){
        this.bill.fiscal_date = `${fiscal_year}-${fiscal_month}-01`;
      }else if(fiscal_year){
        this.bill.fiscal_date = `${fiscal_year}-01-01`
      }
    },
    generateBill(){
      this.resetAlert();
       this.$validator.validate()
       .then(valid => {
        if (valid) {
          this.setFiscalDate();
          this.bill.revenue_code = this.bill.revenue_code.split(':')[1];
          this.bill.amount = this.bill.payment_breakdown.amount_payable;
          this.$axios.post('bills/generate', this.bill)
          .then(response => {
              this.alert_data.success = response.data.message;
              this.new_bill.generated = true;
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
