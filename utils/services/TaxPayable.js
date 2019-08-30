export default class TaxPayable{
    getAnnualtaxPayable(taxable_income) {
        let rem_taxable_income = taxable_income;
        // process
        // 1st stage => 300,000 for 7%
        // 2nd stage => 300,000 for 11%
        // 3rd stage => 500,000 for 15%
        // 4th stage => 500,000 for 19%
        // 5th stage => 1,600,000 for 21%
        // 6th stage => 3,200,000 for 24%
        const stage1TaxAmount = 300000;
        const stage1TaxPercentage = 7;
        let stage1Tax = 0;

        const stage2TaxAmount = 300000;
        const stage2TaxPercentage = 11;
        let stage2Tax = 0;

        const stage3TaxAmount = 500000;
        const stage3TaxPercentage = 15;
        let stage3Tax = 0;

        const stage4TaxAmount = 500000;
        const stage4TaxPercentage = 19;
        let stage4Tax = 0;

        const stage5TaxAmount = 1600000;
        const stage5TaxPercentage = 21;
        let stage5Tax = 0;

        const stage6TaxAmount = 3200000;
        const stage6TaxPercentage = 24;
        let stage6Tax = 0;

        // process the first stage of tax deduction (300,000 for 7%)
        if (rem_taxable_income > stage1TaxAmount) {
            stage1Tax = (stage1TaxAmount * stage1TaxPercentage) / 100;
            rem_taxable_income -= stage1TaxAmount;
            // 2nd stage
            if (rem_taxable_income > stage2TaxAmount) {
                stage2Tax = (stage2TaxAmount * stage2TaxPercentage) / 100;
                rem_taxable_income -= stage2TaxAmount;
                // 3rd stage
                if (rem_taxable_income > stage3TaxAmount) {
                    stage3Tax = (stage3TaxAmount * stage3TaxPercentage) / 100;
                    rem_taxable_income -= stage3TaxAmount;
                    // 4th stage
                    if (rem_taxable_income > stage4TaxAmount) {
                        stage4Tax = (stage4TaxAmount * stage4TaxPercentage) / 100;
                        rem_taxable_income -= stage4TaxAmount;
                        // 5th stage
                        if (rem_taxable_income > stage5TaxAmount) {
                            stage5Tax = (stage5TaxAmount * stage5TaxPercentage) / 100;
                            rem_taxable_income -= stage5TaxAmount;
                            // 6th stage
                            if (rem_taxable_income > stage6TaxAmount) {
                                stage6Tax = (stage6TaxAmount * stage6TaxPercentage) / 100;
                                rem_taxable_income -= stage5TaxAmount;
                            } else {
                                stage6Tax = (rem_taxable_income * stage6TaxPercentage) / 100;
                                rem_taxable_income = 0;
                            }
                        } else {
                            stage5Tax = (rem_taxable_income * stage5TaxPercentage) / 100;
                            rem_taxable_income = 0;
                        }

                    } else {
                        stage4Tax = (rem_taxable_income * stage4TaxPercentage) / 100;
                        rem_taxable_income = 0;
                    }
                } else {
                    stage3Tax = (rem_taxable_income * stage3TaxPercentage) / 100;
                    rem_taxable_income = 0;
                }
            } else {
                stage2Tax = (rem_taxable_income * stage2TaxPercentage) / 100;
                rem_taxable_income = 0;
            }
        } else {
            stage1Tax = (rem_taxable_income * stage1TaxPercentage) / 100;
            rem_taxable_income = 0;
        }

        let total = stage1Tax + stage2Tax + stage3Tax + stage4Tax + stage5Tax + stage6Tax;
        return Math.ceil(total);

    }

    getMonthlyTaxPayable(annual_tax_payable) {
        return Math.ceil(annual_tax_payable / 12);
    }
}