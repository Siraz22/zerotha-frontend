import { Component, Input } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import TreemapModule from 'highcharts/modules/treemap';

import { CountryDTO } from '../../../dto/CountryDTO';
import { StockDTO } from '../../../dto/StockDTO';
import { LatestBar } from '../../../interface/latestBar';
import { StockAlpacaService } from '../../../service/stock-alpaca.service';
import { StocksService } from '../../../service/stocks.service';
import { StockSearchParams } from '../../search-params/stock-search-params';

// Initialize the Treemap module
TreemapModule(Highcharts);

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

    updateFlag: boolean = false;
    Highcharts: typeof Highcharts = Highcharts;
    chartOptions: Highcharts.Options = {
        title: null,
        chart: {
            height: 230,
        },
        series: [
            {
                type: 'treemap',
                layoutAlgorithm: 'squarified',
                data: [
                    {
                        name: 'Loading',
                        value: 1,
                    },
                ],
            },
        ],
        tooltip: {
            formatter: function () {
                const point = this.point as any;
                const roundedPnl = point.custom.pnl.toFixed(2); // Round to 2 decimal places
                return `${point.custom.name}: ${roundedPnl}`;
            },
        },
    };

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
            this.populateLivePrices(stockDTOs);
        });

        this.route.queryParams.subscribe((queryParams) => {
            this.setSearchParams(queryParams);
            this.activeTabIndexForMatTab = this.getActiveTabIndex();
        });
    }

    private populateLivePrices(stockDTOs: StockDTO[]): void {
        if (stockDTOs.length == 0) {
            this.stockDTOs = stockDTOs;
            return;
        }

        const symbols = stockDTOs.map((stockDTO) => stockDTO.symbol);
        this.stockAlpacaService.getBars(symbols).subscribe((data: MultipleBarsResponse) => {
            const barsMap: Bars = data.bars;

            const treemapSeries = this.chartOptions.series[0] as Highcharts.SeriesTreemapOptions;
            treemapSeries.data = [];

            stockDTOs.forEach((stockDTO) => {
                const stockBar = barsMap[stockDTO.symbol];

                stockDTO.fe_currentPrice = stockBar.c;

                const pnl = stockDTO.quantity * (stockDTO.fe_currentPrice - stockDTO.averagePrice);

                this.investedAmount += stockDTO.averagePrice * stockDTO.quantity;
                this.currentValue += stockDTO.fe_currentPrice * stockDTO.quantity;

                this.todaysOpeningTotal += stockBar.o;
                this.todaysClosingTotal += stockBar.c;

                treemapSeries.data.push({
                    name: stockDTO.symbol,
                    value: Math.abs(pnl), // Absolute value to indicate size
                    color: pnl > 0 ? 'green' : 'red', // Color based on profit or loss
                    custom: { name: stockDTO.name, pnl },
                });
            });

            this.updateFlag = true;
            this.stockDTOs = stockDTOs;
        });
    }

    private updateChart(): void {
        this.Highcharts.chart('container', this.chartOptions);
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
