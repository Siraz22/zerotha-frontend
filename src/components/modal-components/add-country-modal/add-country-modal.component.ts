import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CountryDTO } from '../../../dto/CountryDTO';
import { ModalResponse } from '../../../enums/modal-actions';
import { ModalResult } from '../../../interface/modalResult';
import { LocalAssetService } from '../../../service/local-asset.service';

interface CountryJsonI {
    name: string;
    code: string;
    emoji: string;
    unicode: string;
    image: string;
    currency_code: string;
    currency_name: string;
    currency_symbol: string;
}

@Component({
    selector: 'app-add-country-modal',
    templateUrl: './add-country-modal.component.html',
    styleUrls: ['./add-country-modal.component.css'],
})
export class AddCountryModalComponent implements OnInit {
    public formGroup: FormGroup;
    public offlineRecords: CountryJsonI[];
    public selectedCountry: CountryJsonI;

    public searchFn: (searchTerm: string, countryJson: CountryJsonI) => boolean = this.searchFunction;
    public labelFn: (countryJson: CountryJsonI) => string = this.labelFunction;

    constructor(private activeModal: NgbActiveModal, private formBuilder: FormBuilder, private localAssetService: LocalAssetService) {}
    ngOnInit() {
        this.fetchRecords();
    }

    public closeModal(): void {
        this.activeModal.close();
    }

    public saveCountry(): void {
        if (this.formGroup.invalid) {
        } else {
            const countryDTO: CountryDTO = this.compileCountryDTO();
            const modalResult: ModalResult = { response: ModalResponse.SUCCESS, data: countryDTO };
            this.activeModal.close(modalResult);
        }
    }

    public autofillCountryDetails(): void {
        const selectedCountryName = this.formGroup.get('countryName')?.value;
        this.selectedCountry = this.offlineRecords.find((country) => country.name === selectedCountryName);
        if (this.selectedCountry) {
            this.formGroup.get('currencyCode')?.setValue(this.selectedCountry?.currency_code);
            this.formGroup.get('currencyName')?.setValue(this.selectedCountry?.currency_name);
            this.formGroup.get('currencySymbol')?.setValue(this.selectedCountry?.currency_symbol);
            this.formGroup.updateValueAndValidity();
        }
    }

    private createFormGroup(): void {
        this.formGroup = this.formBuilder.group({
            countryName: ['India', Validators.required],
            currencyCode: [null, Validators.required],
            currencyName: [null],
            currencySymbol: [null],
            investedAmount: 0,
        });

        this.autofillCountryDetails();
    }

    private fetchRecords(): void {
        this.localAssetService.getLocalCountryRecords().subscribe((offlineRecords) => {
            this.offlineRecords = offlineRecords;
            this.createFormGroup();
        });
    }

    private compileCountryDTO() {
        const countryDTO: CountryDTO = new CountryDTO();
        countryDTO.name = this.selectedCountry.name;
        countryDTO.currency = this.selectedCountry.currency_code;
        countryDTO.currencyName = this.selectedCountry.currency_name;
        countryDTO.currencySymbol = this.selectedCountry.currency_symbol;
        return countryDTO;
    }

    //country dropdown functions

    private searchFunction(searchTerm: string, countryJson: CountryJsonI): boolean {
        return countryJson.name.toLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1;
    }

    private labelFunction(countryJson: CountryJsonI): string {
        return countryJson.emoji + ' ' + countryJson.name;
    }
}
