import { Component, Input } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CountryDTO } from '../../../dto/CountryDTO';
import { StockDTO } from '../../../dto/StockDTO';
import { LatestBar } from '../../../interface/latestBar';
import { StockAlpacaService } from '../../../service/stock-alpaca.service';
import { StocksService } from '../../../service/stocks.service';
import { StockSearchParams } from '../../search-params/stock-search-params';

interface ViewCountryStocksSearchParams {
    activeTab?: string;
}

interface Bars {
    [symbol: string]: LatestBar;
}

interface MultipleBarsResponse {
    bars: Bars;
}

@Component({
    selector: 'app-view-country-stocks',
    templateUrl: './view-country-stocks.component.html',
    styleUrls: ['./view-country-stocks.component.css'],
})
export class ViewCountryStocksComponent {
    constructor(private route: ActivatedRoute, private router: Router, private stockService: StocksService, private stockAlpacaService: StockAlpacaService) {}

    @Input()
    public countryDTO: CountryDTO;

    public stockDTOs: StockDTO[];
    public searchParams: ViewCountryStocksSearchParams = { activeTab: 'Insights' };
    public activeTabIndexForMatTab = 0;

    public currentValue = 0;
    public investedAmount = 0;

    public todaysOpeningTotal = 0;
    public todaysClosingTotal = 0;

    public countryStockSearchParams: StockSearchParams;

    ngOnInit() {
        this.countryStockSearchParams = { countryId: this.countryDTO.id };
        this.findAll();
    }

    public tabClicked(selectedTab: MatTabChangeEvent): void {
        this.searchParams.activeTab = selectedTab.tab.textLabel;
        this.activeTabIndexForMatTab = selectedTab.index;
        this.setRouteQueryParams();
    }

    public refreshStocks(refresh: boolean): void {
        if (refresh) {
            this.findAll();
        }
    }

    private findAll(): void {
        this.stockService.findAll(this.countryStockSearchParams).subscribe((stockDTOs: StockDTO[]) => {
            this.stockDTOs = this.populateLivePrices(stockDTOs);
        });

        this.route.queryParams.subscribe((queryParams) => {
            this.setSearchParams(queryParams);
            this.activeTabIndexForMatTab = this.getActiveTabIndex();
        });
    }

    private populateLivePrices(stockDTOs: StockDTO[]): StockDTO[] {
        if (stockDTOs.length > 1) {
            const symbols = stockDTOs.map((stockDTO) => stockDTO.symbol);
            this.stockAlpacaService.getBars(symbols).subscribe((data: MultipleBarsResponse) => {
                const barsMap: Bars = data.bars;

                stockDTOs.forEach((stockDTO) => {
                    const stockBar = barsMap[stockDTO.symbol];

                    stockDTO.fe_currentPrice = stockBar.c;

                    this.investedAmount += stockDTO.averagePrice * stockDTO.quantity;
                    this.currentValue += stockDTO.fe_currentPrice * stockDTO.quantity;

                    this.todaysOpeningTotal += stockBar.o;
                    this.todaysClosingTotal += stockBar.c;
                });
            });
        }
        return stockDTOs;
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
