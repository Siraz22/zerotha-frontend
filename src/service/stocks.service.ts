import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { StockDTO } from '../dto/StockDTO';
import { StockUpdateDTO } from '../dto/StockUpdateDTO';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class StocksService {
    constructor(private httpClient: HttpClient) {}

    public saveStock(stockDTO: StockDTO): Observable<StockDTO> {
        return this.httpClient.post<StockDTO>(`${environment.apiEndpoint}/stock`, stockDTO);
    }

    public updateStock(stockUpdateDTO: StockUpdateDTO): Observable<StockDTO> {
        return this.httpClient.patch<StockDTO>(`${environment.apiEndpoint}/stock`, stockUpdateDTO);
    }

    public delete(id: number): Observable<Object> {
        return this.httpClient.delete(`${environment.apiEndpoint}/stock/${id}`);
    }

    public findAll(): Observable<StockDTO[]> {
        return this.httpClient.get<StockDTO[]>(`${environment.apiEndpoint}/stock`);
    }
}
