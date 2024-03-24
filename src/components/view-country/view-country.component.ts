import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { CountryDTO } from '../../dto/CountryDTO';
import { InvestmentType } from '../../enums/Investment-type';
import { CountryService } from '../../service/country.service';
import { isNotNullOrUndefined } from '../../utils/common-utils';
import { ViewCountryRequestParams } from '../requests-params/view-country-request-params';

@Component({
    selector: 'app-view-country',
    templateUrl: './view-country.component.html',
    styleUrls: ['./view-country.component.css'],
})
export class ViewCountryComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute, private countryService: CountryService) {}

    public countryDTO: CountryDTO;
    public searchParams: ViewCountryRequestParams = {};
    public InvestmentType = InvestmentType;

    ngOnInit() {
        this.findOne();
    }

    public setSelectedInvestmentType(investmentType?: InvestmentType): void {
        this.searchParams.investmentType = investmentType;
        this.redirectToInvestmentType();
    }

    public redirectToInvestmentType(): void {
        const redirectPath = isNotNullOrUndefined(this.searchParams.investmentType) ? this.searchParams.investmentType : 'info';
        this.router.navigate(['/country', this.searchParams.countryId, redirectPath], { queryParams: { activeTab: 'Insights' }, relativeTo: this.route });
    }

    private findOne(): void {
        this.route.params
            .pipe(
                switchMap((params) => {
                    this.setSearchParams(params);
                    return this.countryService.findOne(this.searchParams.countryId);
                })
            )
            .subscribe((countryDTO: CountryDTO) => {
                this.countryDTO = countryDTO;
            });
    }

    private setSearchParams(params: Params): void {
        this.searchParams.countryId = Number(params['countryId']);
        this.searchParams.investmentType = params['investmentType'] as InvestmentType;
    }
}
