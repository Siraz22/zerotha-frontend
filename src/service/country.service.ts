import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CountryDTO } from '../dto/CountryDTO';
import { environment } from '../environments/environment';

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

    public findOne(countryId: number): Observable<CountryDTO> {
        return this.httpClient.get<CountryDTO>(`${environment.apiEndpoint}/country/${countryId}`);
    }

    public testing() {
        this.httpClient.get(`${environment.apiEndpoint}/country/testing`);
    }
}
