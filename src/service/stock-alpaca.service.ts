import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class StockAlpacaService {
    constructor(private httpClient: HttpClient) {}

    //US Market Section
    private apiKey = 'PK1O4HNXXOX7D8V5PPQI';
    private apiSecretKey = 'G8knEQ4rc7KTNqEFzGuaiZ8oYwrS8uImD5LQ8aJn';

    private headers = new HttpHeaders({
        Accept: 'application/json',
        'APCA-API-KEY-ID': this.apiKey,
        'APCA-API-SECRET-KEY': this.apiSecretKey,
    });

    public getBar(symbol: string): Observable<any> {
        const options = {
            headers: this.headers,
        };

        const reqUrl = 'https://data.alpaca.markets/v2/stocks/' + symbol + '/bars/latest?feed=iex';
        return this.httpClient.get<any>(reqUrl, options);
    }

    public getBars(symbols: string[]): Observable<any> {
        const options = {
            headers: this.headers,
            params: this.createParamsBars(symbols),
        };

        const reqUrl = 'https://data.alpaca.markets/v2/stocks/bars/latest';
        return this.httpClient.get<any>(reqUrl, options);
    }

    public createParamsBars(symbols: string[]): HttpParams {
        let params = new HttpParams();
        params = params.append('symbols', symbols.join(','));
        params = params.append('feed', 'iex');
        return params;
    }
}
