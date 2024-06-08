import { Component, Input, OnInit } from '@angular/core';

import { StockDTO } from '../../../dto/StockDTO';

@Component({
    selector: 'app-view-country-stock-holdings',
    templateUrl: './view-country-stock-holdings.component.html',
    styleUrls: ['./view-country-stock-holdings.component.css'],
})
export class ViewCountryStockHoldingsComponent implements OnInit {
    @Input()
    public stockDTOs: StockDTO[];

    constructor() {}

    ngOnInit() {}
}
