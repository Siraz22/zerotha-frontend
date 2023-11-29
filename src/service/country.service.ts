import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CountryDTO } from '../dto/CountryDTO';

@Injectable({
    providedIn: 'root',
})
export class CountryService {
    constructor(private httpClient: HttpClient) {}
    public saveCountry(countryDTO: CountryDTO): Observable<CountryDTO> {
        return this.httpClient.post<CountryDTO>('http://localhost:8080/api/v1/country', countryDTO);
    }

    public findAll(): Observable<CountryDTO[]> {
        return this.httpClient.get<CountryDTO[]>('http://localhost:8080/api/v1/country');
    }
}
