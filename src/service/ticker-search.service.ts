import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

    public getOHLC_US(symbol: string): Observable<Alpaca_LatestBarSingleResponse> {
        const options = {
            headers: this.headers,
        };

        const reqUrl = this.apiUrl + symbol + '/bars/latest?feed=iex';
        return this.httpClient.get<any>(reqUrl, options);
    }
}
