import { Component, Input, OnInit } from '@angular/core';

import { StockDTO } from '../../dto/StockDTO';

@Component({
    selector: 'app-view-stock-insights',
    templateUrl: './view-stock-insights.component.html',
    styleUrls: ['./view-stock-insights.component.css'],
})
export class ViewStockInsightsComponent implements OnInit {
    @Input()
    public stockDTOs: StockDTO[];

    constructor() {}

    ngOnInit() {}
}
