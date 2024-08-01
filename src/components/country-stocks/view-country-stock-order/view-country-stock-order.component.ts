import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { countryWithMarketDataAPI } from '../../../constants/projectConstants';
import { CountryDTO } from '../../../dto/CountryDTO';
import { StockDTO } from '../../../dto/StockDTO';
import { StocksService } from '../../../service/stocks.service';
import { AddStocksOrderModalComponent } from '../../modal-components/add-stocks-order-modal/add-stocks-order-modal.component';
import { ConfirmationModalComponent } from '../../modal-components/confirmation-modal/confirmation-modal.component';
import { EditStocksOrderModalComponent } from '../../modal-components/edit-stocks-order-modal/edit-stocks-order-modal.component';

@Component({
    selector: 'app-view-country-stock-order',
    templateUrl: './view-country-stock-order.component.html',
    styleUrls: ['./view-country-stock-order.component.css'],
})
export class ViewCountryStockOrderComponent implements OnInit {
    constructor(private modalService: NgbModal, private stockService: StocksService) {}

    @Input()
    public countryDTO: CountryDTO;
    @Input()
    public stockDTOs: StockDTO[];

    @Output()
    public refreshStocks = new EventEmitter<boolean>();

    public hasMarketAPI = false;

    ngOnInit() {
        this.hasMarketAPI = countryWithMarketDataAPI.has(this.countryDTO.name);
    }

    public openAddOrderModal(): void {
        const addStocksModalInstance = this.modalService.open(AddStocksOrderModalComponent, { size: 'lg' });
        addStocksModalInstance.componentInstance.countryDTO = this.countryDTO;

        //Currently, only US has free API for market data
        addStocksModalInstance.componentInstance.hasMarketAPI = this.hasMarketAPI;
        addStocksModalInstance.result.then((isSaved) => {
            if (isSaved) {
                this.refreshStocks.emit(true);
            }
        });
    }

    public openEditStockModal(stockDTOToEdit: StockDTO): void {
        const editStocksModalInstance = this.modalService.open(EditStocksOrderModalComponent, { size: 'lg' });
        editStocksModalInstance.componentInstance.stockDTO = stockDTOToEdit;

        editStocksModalInstance.result.then((stockUpdated: boolean) => {
            if (stockUpdated) {
                this.refreshStocks.emit(true);
            }
        });
    }

    public openDeleteStockModal(stockDTOToDelete: StockDTO): void {
        const confirmationModalInstance = this.modalService.open(ConfirmationModalComponent, { size: 'lg' });
        confirmationModalInstance.componentInstance.message = 'Are you sure you want to delete' + stockDTOToDelete.name + ' stock?';

        confirmationModalInstance.result.then((resultBoolean: boolean) => {
            if (resultBoolean) {
                this.stockService.delete(stockDTOToDelete.id).subscribe((_) => {
                    this.refreshStocks.emit(true);
                });
            }
        });
    }
}
