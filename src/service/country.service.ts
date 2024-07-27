import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CountryDTO } from '../dto/CountryDTO';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CountryService {
    private countryBehaviourSubject = new BehaviorSubject<CountryDTO>(null);
    currentCountryDTO$ = this.countryBehaviourSubject.asObservable();

    updateCountryDTO(countryDTO: CountryDTO): void {
        this.countryBehaviourSubject.next(countryDTO);
    }

    constructor(private httpClient: HttpClient) {}

    private countryApiPath = environment.API_ENDPOINT + '/country';

    public saveCountry(countryDTO: CountryDTO): Observable<CountryDTO> {
        return this.httpClient.post<CountryDTO>(this.countryApiPath, countryDTO);
    }

    public findAll(): Observable<CountryDTO[]> {
        return this.httpClient.get<CountryDTO[]>(this.countryApiPath);
    }

    public findOne(countryId: number): Observable<CountryDTO> {
        return this.httpClient.get<CountryDTO>(`${environment.API_ENDPOINT}/country/${countryId}`);
    }
}
