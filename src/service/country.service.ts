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

    private countryApiPath = environment.apiEndpoint + '/country';

    public saveCountry(countryDTO: CountryDTO): Observable<CountryDTO> {
        return this.httpClient.post<CountryDTO>(this.countryApiPath, countryDTO);
    }

    public findAll(): Observable<CountryDTO[]> {
        return this.httpClient.get<CountryDTO[]>(this.countryApiPath);
    }

    public findOne(countryId: number): Observable<CountryDTO> {
        return this.httpClient.get<CountryDTO>(`${environment.apiEndpoint}/country/${countryId}`);
    }
}
