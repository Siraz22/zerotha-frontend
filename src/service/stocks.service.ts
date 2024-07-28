import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { StockSearchParams } from '../components/search-params/stock-search-params';
import { StockDTO } from '../dto/StockDTO';
import { StockUpdateDTO } from '../dto/StockUpdateDTO';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class StocksService {
    constructor(private httpClient: HttpClient) {}

    public saveStock(stockDTO: StockDTO): Observable<StockDTO> {
        return this.httpClient.post<StockDTO>(`${environment.API_ENDPOINT}/stock`, stockDTO);
    }

    public updateStock(stockUpdateDTO: StockUpdateDTO): Observable<StockDTO> {
        return this.httpClient.patch<StockDTO>(`${environment.API_ENDPOINT}/stock`, stockUpdateDTO);
    }

    public delete(id: number): Observable<Object> {
        return this.httpClient.delete(`${environment.API_ENDPOINT}/stock/${id}`);
    }

    public findAll(stockSearchParams: StockSearchParams): Observable<StockDTO[]> {
        let params = new HttpParams();
        params = params.append('countryId', stockSearchParams.countryId);
        return this.httpClient.get<StockDTO[]>(`${environment.API_ENDPOINT}/stock`, { params: params });
    }
}
