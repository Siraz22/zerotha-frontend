import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Alpaca_LatestBarSingleResponse } from '../interface/Alpaca_LatestBarSingleResponse';

@Injectable({
    providedIn: 'root',
})
export class TickerSearchService {
    constructor(private httpClient: HttpClient) {}

    //US Market Section
    private apiUrl = 'https://data.alpaca.markets/v2/stocks/';
    private apiKey = 'PK1O4HNXXOX7D8V5PPQI';
    private apiSecretKey = 'G8knEQ4rc7KTNqEFzGuaiZ8oYwrS8uImD5LQ8aJn';

    private headers = new HttpHeaders({
        Accept: 'application/json',
        'APCA-API-KEY-ID': this.apiKey,
        'APCA-API-SECRET-KEY': this.apiSecretKey,
    });

    public getFakeOHLC_US(symbol: string): Observable<Alpaca_LatestBarSingleResponse> {
        if (symbol === 'MSFT')
            return of({
                bar: {
                    c: 105.0, // Closing price
                    h: 110.0, // Highest price
                    l: 95.0, // Lowest price
                    n: 1000, // Number of trades
                    o: 100.0, // Opening price
                    t: '2024-06-09T16:00:00Z', // Timestamp
                    v: 5000, // Volume
                    vw: 150.5, // Volume-weighted average price (VWAP)
                },
                symbol: symbol,
            });
        else
            return of({
                bar: {
                    c: 55.0, // Closing price
                    h: 60.0, // Highest price
                    l: 40.0, // Lowest price
                    n: 1100, // Number of trades
                    o: 50.0, // Opening price
                    t: '2024-06-09T17:00:00Z', // Timestamp
                    v: 5200, // Volume
                    vw: 152.5, // Volume-weighted average price (VWAP)
                },
                symbol: symbol,
            });
    }

    public getOHLC_US(symbol: string): Observable<Alpaca_LatestBarSingleResponse> {
        const options = {
            headers: this.headers,
        };

        const reqUrl = this.apiUrl + symbol + '/bars/latest?feed=iex';
        return this.httpClient.get<any>(reqUrl, options);
    }
}
