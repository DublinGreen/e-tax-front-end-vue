<template>
    <div>
        <form-section-title title="Anssid"></form-section-title>
        <v-layout row wrap>
            <v-flex xs12 sm6 md4>
                <div class="caption font-weight-bold mb-1">ANSSID</div>
                <v-text-field 
                outline 
                v-model="anssid.anssid"
                name="anssid"
                v-validate="{ required: true, regex: /^\d{10}$/ }">
                <div class="" slot="label">ANSSID</div>
                </v-text-field>
                <div class="error-box">{{ errors.first('anssid') }}</div>
            </v-flex>
        </v-layout>
        <form-section-title title="Amount Realization"></form-section-title>
        <v-layout row wrap>
            <v-flex xs12 sm6 md4>
            <div class="caption font-weight-bold mb-1">Amount Payable (NGN)</div>
            <v-text-field outline v-model="model.amount_payable" 
                name="amount payable"
                v-validate="{ required: true, regex: /^[1-9]\d{0,7}(?:\.\d{1,4})?$/ }"
                >
                <div class="" slot="label">0</div>
            </v-text-field>
            <div class="error-box">{{ errors.first('amount payable') }}</div>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm6 md3>
                <v-btn @click="generateBill" small flat block round class="success caption mt-4">Pay Now</v-btn>
            </v-flex>
            <v-flex xs12 sm6 md3>
                <v-btn @click="resetPaymentBreakdown(); anssid.anssid = ''" small flat block round class="error caption mt-4">Clear</v-btn>
            </v-flex>
        </v-layout>
    </div>
</template>
<style scoped>
    .grayBox >>> .v-text-field__slot input {
        background-color: #d0d0d0!important;
    }
    .grayBox >>> .v-input__slot {
        background-color: #d0d0d0!important;
    }
</style>
<script>
import form_section_title from '~/components/html/form_section_title'
export default {
    props:{
        billCategory:String,
        model_: {
            type:Object,
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
    data(){
        return {
            anssid:{
                anssid:'',
                staff_anssid:'',
            },
            model: {}
        }
    },
    components:{
        'form-section-title':form_section_title
    },
    methods: {  
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
}
</script>
