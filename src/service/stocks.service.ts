import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { StockDTO } from '../dto/StockDTO';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class StocksService {
    constructor(private httpClient: HttpClient) {}

    public saveStock(stockDTO: StockDTO): Observable<StockDTO> {
        return this.httpClient.post<StockDTO>(`${environment.apiEndpoint}/stock`, stockDTO);
    }

    public findAll(): Observable<StockDTO[]> {
        return this.httpClient.get<StockDTO[]>(`${environment.apiEndpoint}/stock`);
    }
}
