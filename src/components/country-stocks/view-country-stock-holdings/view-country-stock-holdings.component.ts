import { Component, Input, OnInit } from '@angular/core';

import { CountryDTO } from '../../../dto/CountryDTO';
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
    @Input()
    public countryDTO: CountryDTO;
    @Input()
    public currentTotalValue = 0;

    public StocksGroupBy = StocksGroupBy;
    public groupByOptions = [StocksGroupBy.NONE, StocksGroupBy.MARKET_CAP, StocksGroupBy.SECTOR];
    public selectedGroupBy = StocksGroupBy.MARKET_CAP;

    constructor() {}

    public calculateWeight(price: number, total: number): number {
        return price / total;
    }

    ngOnInit() {}
}
