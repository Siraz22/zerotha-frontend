import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-add-country-modal',
    templateUrl: './add-country-modal.component.html',
    styleUrls: ['./add-country-modal.component.css'],
})
export class AddCountryModalComponent implements OnInit {
    public formGroup: FormGroup;

    constructor(private activeModal: NgbActiveModal, private formBuilder: FormBuilder) {}
    ngOnInit() {
        this.createFormGroup();
    }

    public closeModal(): void {
        this.activeModal.close();
    }

    public saveCountry(): void {}

    private createFormGroup(): void {
        this.formGroup = this.formBuilder.group({
            name: [null, Validators.required],
            currency: [null, Validators.required],
            investedAmount: 0,
        });
    }
}
