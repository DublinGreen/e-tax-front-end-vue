export default class General{
    getPersonalIncome(annual_gross_income) {
        let gross_pay = annual_gross_income;

        // get personal allowance => personal_income + 20% of gross
        // personal income => higher of 200k or of 1% of gross

        let higher_of_200k = 200000;
        let one_percent_on_GI = gross_pay / 100;

        if (gross_pay > higher_of_200k) {
            if (one_percent_on_GI > higher_of_200k) {
                return one_percent_on_GI;
            } else {
                return higher_of_200k;
            }
        } else {
            return one_percent_on_GI;
        }

    }
    get20PercentOnGI(annual_gross_income) {
        return (20 * annual_gross_income) / 100;
    }

    getConsolidatedReliefAllowance(annual_gross_income) {
        return this.getPersonalIncome(annual_gross_income) + this.get20PercentOnGI(annual_gross_income);
    }

    getPension({basic,housing,transport}) {// basic or annual_GI
        let total = Number(basic) + Number(housing) + Number(transport);
        return (8 * total) / 100
    }
    getNHF({basic,is_nhf}) {
        if(is_nhf)  return (2.5 * Number(basic)) / 100;
        return 0;
    }
    getLifeInsurance({basic,is_life_insurance}) {
        if(is_life_insurance) return (2.5 * Number(basic)) / 100;
        return 0
        
    }
    getNHIS({basic,is_nhis}) {
        if(is_nhis) return (2.5 * Number(basic)) / 100;
        return 0;
    }
    dtaComputation() {

        let gross_pay = this.bill.payment_breakdown.gross_pay;

        // get personal allowance => personal_income + 20% of gross
        // personal income => higher of 200k or of 1% of gross

        let personal_income = 0;
        let higher_of_200k = 200000;
        if (gross_pay > higher_of_200k) {
            personal_income = higher_of_200k;
        } else {
            personal_income = gross_pay / 100;
        }

        let cpi = gross_pay / 100;
        if (cpi > personal_income) {
            personal_income = cpi;
        }
        this.bill.payment_breakdown.personal_income = personal_income;

        let percentage_on_gross = (20 * gross_pay) / 100;// 20% on gross
        this.bill.payment_breakdown.percentage_on_gross = percentage_on_gross;

        let personal_allowance = personal_income + percentage_on_gross;// personal_allowance
        this.bill.payment_breakdown.consolidated_relief_allowance = personal_allowance;
        // console.log('personal_allowance',personal_allowance)

        // tax_free_income = personal_allowance + allowable_deduction
        let tax_free_income = personal_allowance;
        this.bill.payment_breakdown.tax_free_income = tax_free_income;
        // console.log('tax_free_income',tax_free_income)
        // taxable_income = gross_pay - tax_free_income
        let taxable_income = Math.abs(gross_pay - tax_free_income);
        this.bill.payment_breakdown.taxable_income = taxable_income;
        // console.log('taxable_income',taxable_income)

        let tax_payable = this.taxPayableComputation(taxable_income);
        this.bill.amount = tax_payable;
        // let tax_payable = this.
    }

    getBillModel(){
        return {
            anssid: '',
            agency_code: '',
            revenue_code: '',
            revenue_category: '',
            amount: '',
            payment_breakdown: {
                allowable_deductions: {
                    life_insurance: 0,
                    nhf: 0,
                    nhis: 0,
                    pension: {
                        basic: 0,
                        housing: 0,
                        transport: 0,
                        computed: 0
                    },
                },
                annual_amount_payable: 0,
                amount_payable: 0,
                tax_free_income: 0,
                taxable_income: 0,
                consolidated_relief_allowance: 0
            },
            tax_office_uuid: '',
            staff_anssid: '',
            staff_name: '',
            bill_category: ''
        }
    }

    
}