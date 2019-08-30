<template>
    <v-layout row wrap v-if="bill.revenue_category">
      <v-flex xs12 md12><h4>Amount Computation</h4><v-divider></v-divider></v-flex>
       
        <v-flex xs12 sm6 md4>
          <div class="caption font-weight-bold mb-1">Select Bills Tax Category</div>
          <v-select 
            :items="bill_category" 
            outline 
            v-model="bill.bill_category"
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
            v-validate="'required|numeric'"
            readonly>
          </v-text-field>
          <div class="error-box">{{ errors.first('consolidated relief allowance') }}</div>
        </v-flex>
        <v-flex xs12 sm6 md4 v-if="canShowPension()">
          <div class="caption font-weight-bold mb-1">Pensions <span>(Total of Basic + Housing + Transport)</span></div>
          <v-text-field outline v-model="bill.payment_breakdown.pensions"
            name="pensions"
            v-on:keyup="runComputation()"
            v-validate="'required|numeric'">
            <div class="" slot="label">Pensions</div>
          </v-text-field>
          <div class="error-box">{{ errors.first('pensions') }}</div>
        </v-flex>
        <v-flex xs12 sm6 md4 v-if="canShowBasic()">
          <div class="caption font-weight-bold mb-1">Basic <span style="font-size:8px">Enter to recompute the NHIS, NHF, Life Insurance if Applicable </span></div>
          <v-text-field outline v-model="bill.payment_breakdown.basic"
            name="basic"
            v-on:keyup="runComputation()"
            v-validate="'numeric'">
            <div class="" slot="label">Basic</div>
          </v-text-field>
          <div class="error-box">{{ errors.first('basics') }}</div>
        </v-flex>
        <v-flex xs12 sm6 md4 v-if="canShowNHF()">
          <div class="caption font-weight-bold mb-1">NHF</div>
          <v-layout wrap row>
              <v-checkbox
                md2
                v-model="bill.payment_breakdown.is_nhf"
              ></v-checkbox>
              <v-text-field outline v-model="bill.payment_breakdown.nhf"
                  name="nhf"
                  v-validate="'required|numeric'" readonly>
              </v-text-field>
              <div class="error-box">{{ errors.first('nhf') }}</div>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm6 md4 v-if="canShowLifeInsurance()">
          <div class="caption font-weight-bold mb-1">Life Insurance</div>
          <v-text-field outline v-model="bill.payment_breakdown.life_insurance"
            name="life insurance"
            v-validate="'required|numeric'" readonly>
          </v-text-field>
          <div class="error-box">{{ errors.first('life insurance') }}</div>
        </v-flex>
        <v-flex xs12 sm6 md4 v-if="canShowNHIS()">
          <div class="caption font-weight-bold mb-1">NHIS</div>
          <v-text-field outline v-model="bill.payment_breakdown.nhis"
            name="nhis"
            v-validate="'required|numeric'" readonly>
          </v-text-field>
          <div class="error-box">{{ errors.first('nhis') }}</div>
        </v-flex>
        <v-flex xs12 sm6 md4 v-if="canShowTaxFreeIncome()">
          <div class="caption font-weight-bold mb-1">Tax Free Income</div>
          <v-text-field outline v-model="bill.payment_breakdown.tax_free_income"
            name="tax free income"
            v-validate="'required|numeric'" readonly>
          </v-text-field>
          <div class="error-box">{{ errors.first('tax free income') }}</div>
        </v-flex>
        <v-flex xs12 sm6 md4 v-if="canShowTaxableIncome()">
          <div class="caption font-weight-bold mb-1">Taxable Income</div>
          <v-text-field outline v-model="bill.payment_breakdown.taxable_income"
            name="taxable income"
            v-validate="'required|numeric'" readonly>
          </v-text-field>
          <div class="error-box">{{ errors.first('taxable income') }}</div>
        </v-flex>
        <v-flex xs12 sm6 md4 v-if="canShowAmountPayable()">
          <div class="caption font-weight-bold mb-1">Annual Amount Payable</div>
          <v-text-field outline v-model="bill.payment_breakdown.annual_amount_payable" 
            name="annual amount payable"
            v-validate="'required|numeric'"
            readonly>
          </v-text-field>
          <div class="error-box">{{ errors.first('annual amount payable') }}</div>
        </v-flex>
        <v-flex xs12 sm6 md4 v-if="canShowAmountPayable()">
          <div class="caption font-weight-bold mb-1">Amount Payable</div>
          <v-text-field outline v-model="bill.amount" 
            name="amount-payable"
            v-validate="'required|numeric'"
            :readonly="canModifyAmountPayable()">
            <div class="" slot="label">Amount Payable</div>
          </v-text-field>
          <div class="error-box">{{ errors.first('amount-payable') }}</div>
        </v-flex>
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
    </v-layout>
</template>
