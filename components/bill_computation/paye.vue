<template>
    <div>
        <form-section-title title="Anssid"></form-section-title>
        <v-layout row wrap>
            <v-flex xs12 sm6 md4>
                <div class="caption font-weight-bold mb-1">Company ANSSID</div>
                <v-text-field 
                outline 
                v-model="anssid.anssid"
                name="anssid"
                v-validate="{ required: true, regex: /^\d{10}$/ }">
                <div class="" slot="label">Company ANSSID</div>
                </v-text-field>
                <div class="error-box">{{ errors.first('anssid') }}</div>
            </v-flex>
            <v-flex xs12 sm6 md4>
                <div class="caption font-weight-bold mb-1">Staff ANSSID</div>
                <v-text-field outline v-model="anssid.staff_anssid"
                    name="staff anssid"
                    v-validate="{ required: true, regex: /^\d{10}$/ }">
                    <div class="" slot="label">Staff ANSSID</div>
                </v-text-field>
                <div class="error-box">{{ errors.first('staff anssid') }}</div>
            </v-flex>
        </v-layout>
        <form-section-title title="Amount Computation"></form-section-title>
        <v-layout row wrap>

            <v-flex xs12 sm6 md4>
                <div class="caption font-weight-bold mb-1">Annual Gross Income (NGN)</div>
                <v-text-field outline v-model="model.gross_pay"
                    name="annual gross income"
                    v-on:keyup="runComputation(model.gross_pay)"
                    v-validate="{ required: true, regex: /^[1-9]\d{0,7}(?:\.\d{1,4})?$/ }">
                    <div class="" slot="label">Annual Gross Income</div>
                </v-text-field>
                <div class="error-box">{{ errors.first('annual gross income') }}</div>
            </v-flex>

            <v-flex xs12 sm6 md4>
                <div class="caption font-weight-bold mb-1">Consolidated Relief Allowance</div>
                <v-text-field outline v-model="model.consolidated_relief_allowance"
                    name="consolidated relief allowance"
                    v-validate="'required'" class='grayBox' readonly disabled="">
                </v-text-field>
                <div class="error-box">{{ errors.first('consolidated relief allowance') }}</div>
            </v-flex>

        </v-layout>
        <form-section-title title="Allowable Deductions ( Pension )"></form-section-title>
        <v-layout row wrap>
            <!--{{isAnnualGrossEmpty}}--> <!--Please don't forget to use this content for what it's intended-->
            
            <v-flex xs12 sm6 md3>
                <div class="caption font-weight-bold mb-1">Basic (NGN)</div>
                <v-text-field outline v-model="model.allowable_deductions.pension.basic"
                    name="basics"
                    @keyup="runComputation()"
                    v-validate="{ required: false, regex: /^[1-9]\d{0,7}(?:\.\d{1,4})?$/ }" :class="{ grayBox: isAnnualGrossEmpty }" :disabled="isAnnualGrossEmpty">
                    <div class="" slot="label">Enter amount</div>
                </v-text-field>
                <div class="error-box">{{ errors.first('basics') }}</div>
            </v-flex>

            <v-flex xs12 sm6 md3>
                <div class="caption font-weight-bold mb-1">Housing (NGN)</div>
                <v-text-field outline v-model="model.allowable_deductions.pension.housing"
                    name="housing"
                    @keyup="runComputation()"
                    v-validate="{ regex: /^[1-9]\d{0,7}(?:\.\d{1,4})?$/ }" :class="{ grayBox: isAnnualGrossEmpty }" :disabled="isAnnualGrossEmpty">
                    <div class="" slot="label">Enter amount</div>
                </v-text-field>
                <div class="error-box">{{ errors.first('housing') }}</div>
            </v-flex>

            <v-flex xs12 sm6 md3>
                <div class="caption font-weight-bold mb-1">Transport (NGN)</div>
                <v-text-field outline v-model="model.allowable_deductions.pension.transport"
                    name="transport"
                    v-on:keyup="runComputation()"
                    v-validate="{ regex: /^[1-9]\d{0,7}(?:\.\d{1,4})?$/ }" :class="{ grayBox: isAnnualGrossEmpty }" :disabled="isAnnualGrossEmpty">
                    <div class="" slot="label">Enter amount</div>
                </v-text-field>
                <div class="error-box">{{ errors.first('transport') }}</div>
            </v-flex>
            <v-flex xs12 sm6 md3>
                <div class="caption font-weight-bold mb-1">Pension Computed (NGN)</div>
                <v-text-field outline v-model="model.allowable_deductions.pension.computed"
                    name="pension"
                    v-validate="'required'" class='grayBox' readonly disabled="">
                </v-text-field>
                <div class="error-box">{{ errors.first('pension') }}</div>
            </v-flex>
        </v-layout>

        <form-section-title title="Allowable Deductions (Others)"></form-section-title>
        <v-layout row wrap>
            <v-flex xs12 sm6 md4>
                <v-checkbox 
                    v-model="model.allowable_deductions.is_nhf"
                    label="NHF"
                    @click="runComputation()"
                ></v-checkbox>
                <v-text-field outline v-model="model.allowable_deductions.nhf"
                    name="nhf"
                    v-validate="'required'" class='grayBox' readonly disabled="">
                </v-text-field>
                <div class="error-box">{{ errors.first('nhf') }}</div>
            </v-flex>
            <v-flex xs12 sm6 md4>
                <v-checkbox
                    v-model="model.allowable_deductions.is_life_insurance"
                    label="Life Insurance"
                    @click="runComputation()"
                ></v-checkbox>
                <v-text-field outline v-model="model.allowable_deductions.life_insurance"
                    name="life insurance"
                    v-validate="'required'" class='grayBox' readonly disabled="">
                </v-text-field>
                <div class="error-box">{{ errors.first('life insurance') }}</div>
            </v-flex>

            <v-flex xs12 sm6 md4>
                <v-checkbox 
                    v-model="model.allowable_deductions.is_nhis"
                    label="NHIS"
                    @click="runComputation()"
                ></v-checkbox>
                <v-text-field outline v-model="model.allowable_deductions.nhis"
                    name="nhis"
                    v-validate="'required'" class='grayBox' readonly disabled="">
                </v-text-field>
                <div class="error-box">{{ errors.first('nhis') }}</div>
            </v-flex>

        </v-layout>
        <form-section-title title="Amount Realization"></form-section-title>
        <v-layout row wrap>
            <v-flex xs12 sm6 md3>
            <div class="caption font-weight-bold mb-1">Tax Free Income (NGN)</div>
            <v-text-field outline v-model="model.tax_free_income"
                name="tax free income"
                v-validate="'required'" class='grayBox' readonly disabled="">
            </v-text-field>
            <div class="error-box">{{ errors.first('tax free income') }}</div>
            </v-flex>
            <v-flex xs12 sm6 md3>
            <div class="caption font-weight-bold mb-1">Taxable Income (NGN)</div>
            <v-text-field outline v-model="model.taxable_income"
                name="taxable income"
                v-validate="'required'" class='grayBox' readonly disabled="">
            </v-text-field>
            <div class="error-box">{{ errors.first('taxable income') }}</div>
            </v-flex>
            <v-flex xs12 sm6 md3>
            <div class="caption font-weight-bold mb-1">Annual Amount Payable (NGN)</div>
            <v-text-field outline v-model="model.annual_amount_payable" 
                name="annual amount payable"
                v-validate="'required'" class='grayBox' readonly disabled="">
            </v-text-field>
            <div class="error-box">{{ errors.first('annual amount payable') }}</div>
            </v-flex>
            <v-flex xs12 sm6 md3>
            <div class="caption font-weight-bold mb-1">Amount Payable (NGN)</div>
            <v-text-field outline v-model="model.amount_payable" 
                name="amount-payable"
                v-validate="'required'" class='grayBox' readonly disabled="">
            </v-text-field>
            <div class="error-box">{{ errors.first('amount-payable') }}</div>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm6 md3>
                <v-btn @click="generateBill" small flat block round class="success caption mt-4">Pay Now</v-btn>
            </v-flex>
            <v-flex xs12 sm6 md3>
                <v-btn @click="resetPaymentBreakdown(); anssid.staff_anssid = ''; anssid.anssid = ''" small flat block round class="error caption mt-4">Clear</v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>
<style scoped>
    .grayBox >>> .v-text-field__slot input {
        background-color: #ccc!important;
        color: #111;
    }
    .grayBox >>> .v-input__slot {
        background-color: #ccc!important;
    }
</style>
<script>
import form_section_title from '~/components/html/form_section_title'
import TaxPayable from "~/utils/services/TaxPayable";
import General from "~/utils/services/General";
export default {
    props: {
        billCategory:String,
        model_: {
            type: Object,
            default: () => {
                return {
                    life_insurance : 0,
                    nhf:0,
                    nhis:0,
                    pension: {
                        basic: '',
                        housing: '',
                        transport: '',
                        computed: 0
                    }
                }
            }
        }
    },
    created () {
        this.model = this.model_
    },
    data () {
        return {
            taxPayableService : new TaxPayable(),
            generalService : new General(),
            anssid:{
                anssid:'',
                staff_anssid:'',
            },
            model: {},
            isAnnualGrossEmpty: true
        }
    },
    components: {
        'form-section-title':form_section_title
    },

    methods: {
        resetPaymentBreakdown(){
            this.model = {
                allowable_deductions:{
                    life_insurance : 0,
                    nhf:0,
                    nhis:0,
                    pension: {
                        basic:'',
                        housing:'',
                        transport:'',
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
        runComputation() {
            let gross_income = this.model.gross_pay;
            if(Number(gross_income) === 0 || isNaN(Number(gross_income))){
            gross_income = 0;
                this.resetPaymentBreakdown()
            }
            let pensions = this.generalService.getPension(this.model.allowable_deductions.pension);
            this.model.allowable_deductions.pension.computed = pensions;
            let basic = this.model.allowable_deductions.pension.basic;

            let personal_allowance = this.generalService.getConsolidatedReliefAllowance(gross_income);
            this.model.consolidated_relief_allowance = personal_allowance;

            // get allowable_deductions
            let nhf = this.generalService.getNHF({
                basic:basic,
                is_nhf:this.model.allowable_deductions.is_nhf
            });

            this.model.allowable_deductions.nhf = nhf ;
            
            
            let life_insurance = this.generalService.getLifeInsurance({
                basic : basic,
                is_life_insurance : this.model.allowable_deductions.is_life_insurance
            })
            this.model.allowable_deductions.life_insurance = life_insurance;
            

            let nhis = this.generalService.getNHIS({
                basic:basic,
                is_nhis:this.model.allowable_deductions.is_nhis
            })
            this.model.allowable_deductions.nhis = nhis;
            

            let allowable_deduction = pensions + nhf + life_insurance + nhis; 
            let tax_free_income = personal_allowance + allowable_deduction;
            this.model.tax_free_income = tax_free_income;
            let taxable_income = Math.abs(gross_income - tax_free_income);
            this.model.taxable_income = taxable_income;

            let tax_payable = this.taxPayableService.getAnnualtaxPayable(taxable_income);
            this.model.annual_amount_payable = tax_payable;
            this.model.amount_payable = this.taxPayableService.getMonthlyTaxPayable(tax_payable);

        },

        generateBill(){
            this.$validator.validate()
            .then(valid => {
                if (valid) {
                    let data = {
                        anssid:this.anssid,
                        payment_breakdown:this.model
                    }
                    this.$emit('generateBill',data);
                }
            })
            
        }
    },
    watch: {
        'model.gross_pay' (newValue) {
            if (newValue) this.isAnnualGrossEmpty = false;
            else this.isAnnualGrossEmpty = true;
        }
    }
}
</script>
