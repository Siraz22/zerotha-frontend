import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CountryDTO } from 'src/dto/CountryDTO';

import { ModalResponse } from '../../enums/modal-actions';
import { ModalResult } from '../../interface/modalResult';
import { CountryService } from '../../service/country.service';
import { AddCountryModalComponent } from '../modal-components/add-country-modal/add-country-modal.component';

@Component({
    selector: 'app-list-countries',
    templateUrl: './list-countries.component.html',
    styleUrls: ['./list-countries.component.css'],
})
export class ListCountriesComponent implements OnInit {
    public countryDTOs: CountryDTO[];

    constructor(private modalService: NgbModal, private router: Router, private countryService: CountryService) {}

    ngOnInit(): void {
        this.findAll();
    }

    public goToCountry(countryId: number): void {
        this.router.navigate([`/country/${countryId}`]);
    }

    public openAddCountryModal(): void {
        const addCountryModalInstance = this.modalService.open(AddCountryModalComponent);
        addCountryModalInstance.result.then((modalResult: ModalResult) => {
            if (modalResult.response === ModalResponse.SUCCESS) {
                const countryDTO: CountryDTO = modalResult.data;
                this.countryService.saveCountry(countryDTO).subscribe(
                    (response) => {},
                    (error) => {}
                );
            }
        });
    }

    private findAll(): void {
        this.countryService.findAll().subscribe((result: CountryDTO[]) => {
            this.countryDTOs = result;
        });
    }
}
