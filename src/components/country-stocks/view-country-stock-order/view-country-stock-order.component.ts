import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { countryWithMarketDataAPI } from '../../../constants/projectConstants';
import { CountryDTO } from '../../../dto/CountryDTO';
import { StockDTO } from '../../../dto/StockDTO';
import { Alpaca_LatestBarSingleResponse } from '../../../interface/Alpaca_LatestBarSingleResponse';
import { StocksService } from '../../../service/stocks.service';
import { TickerSearchService } from '../../../service/ticker-search.service';
import { AddStocksOrderModalComponent } from '../../modal-components/add-stocks-order-modal/add-stocks-order-modal.component';
import { ConfirmationModalComponent } from '../../modal-components/confirmation-modal/confirmation-modal.component';
import { EditStocksOrderModalComponent } from '../../modal-components/edit-stocks-order-modal/edit-stocks-order-modal.component';

@Component({
    selector: 'app-view-country-stock-order',
    templateUrl: './view-country-stock-order.component.html',
    styleUrls: ['./view-country-stock-order.component.css'],
})
export class ViewCountryStockOrderComponent implements OnInit {
    constructor(private modalService: NgbModal, private stockService: StocksService, private tickerSearchService: TickerSearchService) {}

    @Input()
    public countryDTO: CountryDTO;

    public hasMarketAPI = false;
    public stockDTOs: StockDTO[] = [];

    ngOnInit() {
        this.hasMarketAPI = countryWithMarketDataAPI.has(this.countryDTO.name);
        this.findAll();
    }

    private findAll(): void {
        this.stockService.findAll().subscribe((stockDTOs: StockDTO[]) => {
            this.stockDTOs = stockDTOs;
            if (this.hasMarketAPI) {
                this.populateCurrentPrice();
            }
        });
    }

    public populateCurrentPrice(): void {
        this.stockDTOs.forEach((stockDTO) => {
            if (this.countryDTO.name == 'United States') {
                this.tickerSearchService.getOHLC_US(stockDTO.symbol).subscribe((data: Alpaca_LatestBarSingleResponse) => {
                    stockDTO.fe_currentPrice = data.bar.c;
                });
            }
        });
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

    public openDeleteStockModal(stockDTOToDelete: StockDTO): void {
        const confirmationModalInstance = this.modalService.open(ConfirmationModalComponent, { size: 'lg' });
        confirmationModalInstance.componentInstance.message = 'Are you sure you want to delete' + stockDTOToDelete.name + ' stock?';

        confirmationModalInstance.result.then((resultBoolean: boolean) => {
            if (resultBoolean) {
                this.stockService.delete(stockDTOToDelete.id).subscribe((data) => console.log('Completed!'));
            }
        });
    }
}
