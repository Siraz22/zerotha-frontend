import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { InvestmentType } from '../../enums/Investment-type';
import { CountryService } from '../../service/country.service';

@Component({
    selector: 'app-view-country',
    templateUrl: './view-country.component.html',
    styleUrls: ['./view-country.component.css'],
})
export class ViewCountryComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute, private countryService: CountryService) {}

    public selectedInvestmentType: InvestmentType = InvestmentType.STOCK;
    public InvestmentType = InvestmentType;

    ngOnInit() {
        this.route.firstChild?.data.subscribe((data) => {
            this.selectedInvestmentType = data['selectedInvestmentType'];
        });
    }

    selectInvestment(option: string): void {
        this.selectedInvestmentType = this.getInvestmentTypeFromURL(option);
        this.router.navigate([option], { relativeTo: this.route });
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
