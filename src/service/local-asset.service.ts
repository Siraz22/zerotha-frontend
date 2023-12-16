import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LocalAssetService {
    constructor(private httpClient: HttpClient) {}

    public getLocalCountryRecords(): Observable<any> {
        return this.httpClient.get('assets/offline-record.json');
    }

    public getLocalUSStocks(): Observable<any> {
        return this.httpClient.get('assets/us-stocks.json');
    }

    public getLocalIndianStocks(): Observable<any> {
        return this.httpClient.get('assets/indian-stocks.json');
    }
}
