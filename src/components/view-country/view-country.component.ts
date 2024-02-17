import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { InvestmentType } from '../../enums/Investment-type';
import { CountryService } from '../../service/country.service';

interface investmentOverview {
    investmentType: InvestmentType;
}

@Component({
    selector: 'app-view-country',
    templateUrl: './view-country.component.html',
    styleUrls: ['./view-country.component.css'],
})
export class ViewCountryComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute, private countryService: CountryService) {}

    public selectedInvestmentType: InvestmentType = InvestmentType.STOCK;
    public InvestmentType = InvestmentType;

    public investmentTypeRecords: investmentOverview[] = [];

    ngOnInit() {
        this.route.firstChild?.data.subscribe((data) => {
            this.selectedInvestmentType = data['selectedInvestmentType'];
        });

        this.investmentTypeRecords = [
            {
                investmentType: InvestmentType.STOCK,
            },
            {
                investmentType: InvestmentType.DEBT,
            },
            {
                investmentType: InvestmentType.PRECIOUS_METALS,
            },
            {
                investmentType: InvestmentType.MUTUAL_FUNDS,
            },
            {
                investmentType: InvestmentType.DIGITAL_ASSETS,
            },
        ];
    }

    selectInvestment(option: string): void {
        this.selectedInvestmentType = this.getInvestmentTypeFromURL(option);
        this.router.navigate([option], { relativeTo: this.route });
    }

    public getSelectedInvestmentIndex(): number {
        // Check if selectedInvestmentType is set
        if (!this.selectedInvestmentType) {
            return -1; // Return -1 or another value to indicate no selection
        }

        // Find the index of selectedInvestmentType in investmentTypeRecords
        const index = this.investmentTypeRecords.findIndex((record) => record.investmentType === this.selectedInvestmentType);

        return index;
    }

    private getInvestmentTypeFromURL(investmentString: string): InvestmentType {
        switch (investmentString) {
            case 'stocks':
                return InvestmentType.STOCK;
            case 'debt':
                return InvestmentType.DEBT;
            case 'metals':
                return InvestmentType.PRECIOUS_METALS;
            case 'mutual-funds':
                return InvestmentType.MUTUAL_FUNDS;
            case 'digital':
                return InvestmentType.DIGITAL_ASSETS;
            default:
                return null;
        }
    }
}
