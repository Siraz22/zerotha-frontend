import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, switchMap } from 'rxjs';

import { CountryDTO } from '../../dto/CountryDTO';
import { InvestmentType } from '../../enums/Investment-type';
import { CountryService } from '../../service/country.service';

interface CountryInvestmentQueryParams {
    activeTab: string;
}

@Component({
    selector: 'app-view-country-investment',
    templateUrl: './view-country-investment.component.html',
    styleUrls: ['./view-country-investment.component.css'],
})
export class ViewCountryInvestmentComponent implements OnInit {
    constructor(private route: ActivatedRoute, private router: Router, private countryService: CountryService) {}

    public currentCountryDTO: CountryDTO;

    public selectedInvestmentType: InvestmentType;
    public InvestmentType = InvestmentType;

    public searchParams: CountryInvestmentQueryParams = { activeTab: '' };

    ngOnInit() {
        combineLatest([this.route.parent.params.pipe(switchMap((params) => this.countryService.findOne(Number(params['countryId'])))), this.route.data]).subscribe(
            ([countryDTO, routeData]) => {
                this.currentCountryDTO = countryDTO;
                this.selectedInvestmentType = routeData['selectedInvestmentType'];
                this.populateQueryParams();
            }
        );
    }

    public tabClicked(selectedTab: MatTabChangeEvent): void {
        this.searchParams.activeTab = selectedTab.tab.textLabel;
        this.setRouteQueryParams();
    }

    public getActiveTabIndex(): number {
        switch (this.searchParams.activeTab) {
            case 'Insights':
                return 0;
            case 'Holdings':
                return 1;
            case 'Orders':
                return 2;
            default:
                return 0;
        }
    }

    //Use to populate Query Params
    private populateQueryParams(): void {
        this.route.queryParams.subscribe((queryParams) => {
            this.searchParams.activeTab = queryParams['activeTab'];
        });
        this.setRouteQueryParams();
    }

    //Use to navigate to the route with Query Params
    private setRouteQueryParams(): void {
        this.router.navigate([], {
            queryParams: this.searchParams,
        });
    }
}
