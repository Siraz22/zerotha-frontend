import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { StockDTO } from '../../dto/StockDTO';
import { MarketCap } from '../../enums/market-cap';
import { Sector } from '../../enums/sector';
import { StocksGroupBy } from '../../enums/stocks-group-by';

@Component({
    selector: 'app-expanding-stocks-table',
    templateUrl: './expanding-stocks-table.component.html',
    styleUrls: ['./expanding-stocks-table.component.css'],
    animations: [
        trigger('myAnimation', [
            transition(':enter', [
                style({ opacity: 0, height: 0 }),
                animate(
                    '300ms',
                    style({
                        opacity: 1,
                        height: 30,
                    })
                ),
            ]),
            transition(':leave', [
                animate(
                    '200ms',
                    style({
                        opacity: 0,
                        height: 0,
                    })
                ),
            ]),
        ]),
    ],
})
export class ExpandingStocksTableComponent implements OnChanges {
    @Input()
    public stockDTOs: StockDTO[];
    @Input()
    public groupBy: StocksGroupBy;
    @Input()
    currentTotalValue: number;

    public groupedTableData: { [key: string]: StockDTO[] } = {};
    public mapKeysAndImg: string[][] = [];
    public isRowCollapsed: { [key: string]: boolean } = {};

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        this.populateMap();
    }

    public toggleRowCollapse(key: string) {
        this.isRowCollapsed[key] = !this.isRowCollapsed[key];
    }

    private populateMap(): void {
        this.groupedTableData = {};
        this.isRowCollapsed = {};
        this.mapKeysAndImg = [];

        this.stockDTOs.forEach((stock) => {
            const key: string = this.groupBy === StocksGroupBy.MARKET_CAP ? stock.marketCap : stock.sector;
            if (!this.groupedTableData[key]) {
                this.groupedTableData[key] = [];
                this.mapKeysAndImg.push([key, this.getImageLink(this.groupBy, key)]);
                this.isRowCollapsed[key] = false;
            }
            this.groupedTableData[key].push(stock);

            const c = this.groupedTableData[key].reduce((total, stockDTO) => total + stockDTO.fe_currentPrice || 0, 0);
        });

        if (this.groupBy === StocksGroupBy.MARKET_CAP) {
            const marketCapOrder = [MarketCap.MEGA_CAP, MarketCap.LARGE_CAP, MarketCap.MID_CAP, MarketCap.SMALL_CAP];
            this.mapKeysAndImg.sort((a, b) => {
                return marketCapOrder.indexOf(a[0] as MarketCap) - marketCapOrder.indexOf(b[0] as MarketCap);
            });
        }
    }

    //To do : convert this to a pipe to avoid repeat calls
    public calculateTotalInvestedValueForGroup(stockDTOs: StockDTO[]): number {
        return stockDTOs.reduce((total, stockDTO) => total + stockDTO.quantity * stockDTO.averagePrice || 0, 0);
    }

    public calculateTotalPAndLForGroup(stockDTOs: StockDTO[]): number {
        return stockDTOs.reduce((total, stockDTO) => total + stockDTO.quantity * (stockDTO.fe_currentPrice - stockDTO.averagePrice) || 0, 0);
    }

    public calculateTotalCurrentValueForGroup(stockDTOs: StockDTO[]): number {
        return stockDTOs.reduce((total, stockDTO) => total + stockDTO.fe_currentPrice || 0, 0);
    }

    public calculateTotalWeightForGroup(stockDTOs: StockDTO[]): number {
        return stockDTOs.reduce((total, stockDTO) => total + stockDTO.fe_currentPrice || 0, 0) / this.currentTotalValue;
    }

    public formatEnumHeading(groupBy: StocksGroupBy, key: string): string {
        if (groupBy === StocksGroupBy.MARKET_CAP) {
            switch (key) {
                case MarketCap.MEGA_CAP:
                    return 'Mega Cap';
                case MarketCap.LARGE_CAP:
                    return 'Large Cap';
                case MarketCap.MID_CAP:
                    return 'Mid Cap';
                case MarketCap.SMALL_CAP:
                    return 'Small Cap';
            }
        } else if (groupBy === StocksGroupBy.SECTOR) {
            switch (key) {
                case Sector.ENERGY:
                    return 'Energy';
                case Sector.MATERIALS:
                    return 'Materials';
                case Sector.INDUSTRIALS:
                    return 'Industrials';
                case Sector.UTILITIES:
                    return 'Utilities';
                case Sector.HEALTHCARE:
                    return 'Healthcare';
                case Sector.FINANCIALS:
                    return 'Financials';
                case Sector.CONSUMER_DISCRETIONARY:
                    return 'Consumer Discretionary';
                case Sector.CONSUMER_STAPLES:
                    return 'Consumer Staples';
                case Sector.INFORMATION_TECHNOLOGY:
                    return 'Information Technology';
                case Sector.COMMUNICATION:
                    return 'Communication';
                case Sector.REAL_ESTATE:
                    return 'Real Estate';
                case Sector.ETF:
                    return 'ETF';
                case Sector.INDEX_FUNDS:
                    return 'Index Funds';
                default:
                    return '';
            }
        }
        return '';
    }

    private getImageLink(groupBy: StocksGroupBy, key: string): string {
        if (groupBy === StocksGroupBy.MARKET_CAP) {
            switch (key) {
                case MarketCap.MEGA_CAP:
                    return 'https://cdn-icons-png.flaticon.com/128/705/705668.png';
                case MarketCap.LARGE_CAP:
                    return 'https://cdn-icons-png.flaticon.com/128/1603/1603175.png';
                case MarketCap.MID_CAP:
                    return 'https://cdn-icons-png.flaticon.com/128/11147/11147483.png';
                case MarketCap.SMALL_CAP:
                    return 'https://cdn-icons-png.flaticon.com/128/1974/1974214.png';
                default:
                    return '';
            }
        } else if (groupBy === StocksGroupBy.SECTOR) {
            switch (key) {
                case Sector.ENERGY:
                    return 'https://cdn-icons-png.flaticon.com/128/2511/2511629.png';
                case Sector.MATERIALS:
                    return 'https://cdn-icons-png.flaticon.com/128/4862/4862275.png';
                case Sector.INDUSTRIALS:
                    return 'https://cdn-icons-png.flaticon.com/128/1037/1037503.png';
                case Sector.UTILITIES:
                    return 'https://cdn-icons-png.flaticon.com/128/564/564939.png';
                case Sector.HEALTHCARE:
                    return 'https://cdn-icons-png.flaticon.com/128/3004/3004458.png';
                case Sector.FINANCIALS:
                    return 'https://cdn-icons-png.flaticon.com/128/781/781831.png';
                case Sector.CONSUMER_DISCRETIONARY:
                    return 'https://cdn-icons-png.flaticon.com/128/3081/3081559.png';
                case Sector.CONSUMER_STAPLES:
                    return 'https://cdn-icons-png.flaticon.com/128/706/706164.png';
                case Sector.INFORMATION_TECHNOLOGY:
                    return 'https://cdn-icons-png.flaticon.com/128/9626/9626716.png';
                case Sector.COMMUNICATION:
                    return 'https://cdn-icons-png.flaticon.com/128/610/610413.png';
                case Sector.REAL_ESTATE:
                    return 'https://cdn-icons-png.flaticon.com/128/602/602182.png';
                case Sector.ETF:
                    return 'https://cdn-icons-png.flaticon.com/128/11443/11443091.png';
                case Sector.INDEX_FUNDS:
                    return 'https://cdn-icons-png.flaticon.com/128/4449/4449895.png';
                default:
                    return '';
            }
        }
        return '';
    }
}
