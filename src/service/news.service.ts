import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class NewsService {
    constructor(private httpClient: HttpClient) {}

    private apiUrl = 'https://data.alpaca.markets/v1beta1/news';
    private apiKey = 'PK1O4HNXXOX7D8V5PPQI';
    private apiSecretKey = 'G8knEQ4rc7KTNqEFzGuaiZ8oYwrS8uImD5LQ8aJn';

    private headers = new HttpHeaders({
        Accept: 'application/json',
        'APCA-API-KEY-ID': this.apiKey,
        'APCA-API-SECRET-KEY': this.apiSecretKey,
    });

    public getNews(symbols: string[]): Observable<any> {
        const options = {
            headers: this.headers,
            params: this.createParams(symbols),
        };

        const reqUrl = this.apiUrl;
        return this.httpClient.get<any>(reqUrl, options);
    }

    private createParams(symbols: string[]): HttpParams {
        let params = new HttpParams();
        params = params.append('symbols', symbols.join(','));
        return params;
    }
}
