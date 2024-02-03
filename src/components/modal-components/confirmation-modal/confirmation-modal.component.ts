import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.css'],
})
export class ConfirmationModalComponent implements OnInit {
    constructor(private activeModal: NgbActiveModal) {}

    public message: string;

    ngOnInit() {}

    public closeModal(performAction: boolean): void {
        this.activeModal.close(performAction);
    }
}
