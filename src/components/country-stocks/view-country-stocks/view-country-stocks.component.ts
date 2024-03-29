import { Component, Input } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CountryDTO } from '../../../dto/CountryDTO';
import { StockDTO } from '../../../dto/StockDTO';

interface CountryInvestmentQueryParams {
    activeTab?: string;
}

@Component({
    selector: 'app-view-country-stocks',
    templateUrl: './view-country-stocks.component.html',
    styleUrls: ['./view-country-stocks.component.css'],
})
export class ViewCountryStocksComponent {
    constructor(private route: ActivatedRoute, private router: Router) {}

    @Input()
    public countryDTO: CountryDTO;

    public stockDTOs: StockDTO[] = [];
    public searchParams: CountryInvestmentQueryParams = {};
    public activeTabIndexForMatTab = 0;

    ngOnInit() {
        this.findParams();
    }

    public tabClicked(selectedTab: MatTabChangeEvent): void {
        this.searchParams.activeTab = selectedTab.tab.textLabel;
        this.activeTabIndexForMatTab = selectedTab.index;
        this.setRouteQueryParams();
    }

    private findParams(): void {
        this.route.queryParams.subscribe((queryParams) => {
            this.setSearchParams(queryParams);
            this.activeTabIndexForMatTab = this.getActiveTabIndex();
        });
    }

    private setSearchParams(params: Params): void {
        this.searchParams.activeTab = params['activeTab'];
    }

    private setRouteQueryParams(): void {
        this.router.navigate([], { queryParams: this.searchParams });
    }

    // Specific syntax for using google's mat tab group which looked good
    private getActiveTabIndex(): number {
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
}
