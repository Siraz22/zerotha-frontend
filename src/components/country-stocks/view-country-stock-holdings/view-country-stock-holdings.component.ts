import { Component, Input, OnInit } from '@angular/core';

import { StockDTO } from '../../../dto/StockDTO';
import { StocksGroupBy } from '../../../enums/stocks-group-by';

@Component({
    selector: 'app-view-country-stock-holdings',
    templateUrl: './view-country-stock-holdings.component.html',
    styleUrls: ['./view-country-stock-holdings.component.css'],
})
export class ViewCountryStockHoldingsComponent implements OnInit {
    @Input()
    public stockDTOs: StockDTO[];
    public totalInvestment: number;

    public StocksGroupBy = StocksGroupBy;
    public groupByOptions = [StocksGroupBy.NONE, StocksGroupBy.MARKET_CAP, StocksGroupBy.SECTOR];
    public selectedGroupBy = StocksGroupBy.MARKET_CAP;

    constructor() {}

    ngOnInit() {
        this.totalInvestment = this.stockDTOs.reduce((total, stock) => total + stock.fe_currentPrice || 0, 0);
    }
}
