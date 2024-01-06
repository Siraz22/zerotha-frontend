import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { countryWithMarketDataAPI } from '../../constants/projectConstants';
import { CountryDTO } from '../../dto/CountryDTO';
import { StockDTO } from '../../dto/StockDTO';
import { StocksService } from '../../service/stocks.service';
import { AddStocksOrderModalComponent } from '../modal-components/add-stocks-order-modal/add-stocks-order-modal.component';
import { EditStocksOrderModalComponent } from '../modal-components/edit-stocks-order-modal/edit-stocks-order-modal.component';

@Component({
    selector: 'app-view-country-stock-order',
    templateUrl: './view-country-stock-order.component.html',
    styleUrls: ['./view-country-stock-order.component.css'],
})
export class ViewCountryStockOrderComponent implements OnInit {
    constructor(private modalService: NgbModal, private stockService: StocksService) {}

    @Input()
    public countryDTO: CountryDTO;

    public hasMarketAPI = false;
    public stockDTOs: StockDTO[] = [];

    ngOnInit() {
        this.isOrderUsingMarketAPI();
        this.findAll();
    }

    private findAll(): void {
        this.stockService.findAll().subscribe((stockDTOs: StockDTO[]) => {
            this.stockDTOs = stockDTOs;
        });
    }

    private isOrderUsingMarketAPI(): void {
        if (countryWithMarketDataAPI.has(this.countryDTO.name)) {
            this.hasMarketAPI = true;
        }
    }

    public openAddOrderModal(): void {
        const addStocksModalInstance = this.modalService.open(AddStocksOrderModalComponent, { size: 'lg' });
        addStocksModalInstance.componentInstance.countryDTO = this.countryDTO;

        //Currently, only US has free API for market data
        addStocksModalInstance.componentInstance.hasMarketAPI = this.hasMarketAPI;
    }

    public openEditStockModal(stockDTOToEdit: StockDTO): void {
        const editStocksModalInstance = this.modalService.open(EditStocksOrderModalComponent, { size: 'lg' });
        editStocksModalInstance.componentInstance.stockDTO = stockDTOToEdit;
    }
}
