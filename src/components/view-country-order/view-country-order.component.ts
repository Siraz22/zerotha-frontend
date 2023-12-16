import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { countryWithMarketDataAPI } from '../../constants/projectConstants';
import { CountryDTO } from '../../dto/CountryDTO';
import { InvestmentType } from '../../enums/Investment-type';
import { AddStocksOrderModalComponent } from '../modal-components/add-stocks-order-modal/add-stocks-order-modal.component';

@Component({
    selector: 'app-view-country-order',
    templateUrl: './view-country-order.component.html',
    styleUrls: ['./view-country-order.component.css'],
})
export class ViewCountryOrderComponent implements OnInit {
    constructor(private modalService: NgbModal, private investmentService: InvestmentService) {}

    @Input()
    public countryDTO: CountryDTO;
    @Input()
    public selectedInvestmentType: InvestmentType;

    public hasMarketAPI = false;

    ngOnInit() {
        this.isOrderUsingMarketAPI();
        this.findAll();
    }

    private findAll(): void {
        this.investmentService.findAll();
    }

    private isOrderUsingMarketAPI(): void {
        if (this.selectedInvestmentType === InvestmentType.STOCK && countryWithMarketDataAPI.has(this.countryDTO.name)) {
            this.hasMarketAPI = true;
        }
    }

    public openAddOrderModal(): void {
        if (this.selectedInvestmentType === InvestmentType.STOCK) {
            const addStocksModalInstance = this.modalService.open(AddStocksOrderModalComponent, { size: 'lg' });
            addStocksModalInstance.componentInstance.countryDTO = this.countryDTO;

            //Hardcoded logic as a workaround for personal project.
            //Currently, only US has free API for market data
            //Indian market data is paid / locked behind a access token via third party login
            addStocksModalInstance.componentInstance.hasMarketAPI = this.hasMarketAPI;
        }
    }
}
