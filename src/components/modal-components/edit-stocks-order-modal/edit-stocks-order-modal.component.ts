import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CountryDTO } from '../../../dto/CountryDTO';
import { StockDTO } from '../../../dto/StockDTO';
import { StockUpdateDTO } from '../../../dto/StockUpdateDTO';
import { MarketCap } from '../../../enums/market-cap';
import { Sector } from '../../../enums/sector';
import { LocalAssetService } from '../../../service/local-asset.service';
import { StocksService } from '../../../service/stocks.service';

interface StockJsonI {
    symbol: string;
    name: string;
}

@Component({
    selector: 'app-edit-stocks-order-modal',
    templateUrl: './edit-stocks-order-modal.component.html',
    styleUrls: ['./edit-stocks-order-modal.component.css'],
})
export class EditStocksOrderModalComponent implements OnInit {
    public formGroup: FormGroup;
    public countryDTO: CountryDTO;

    public stockDTO: StockDTO;

    public searchResults: any = [];
    public labelFn: (stockJson: StockJsonI) => string = this.labelFunction;

    public MarketCap = MarketCap;
    public Sector = Sector;

    constructor(private formBuilder: FormBuilder, private activeModal: NgbActiveModal, private localAssetService: LocalAssetService, private stockService: StocksService) {}

    ngOnInit() {
        this.createFormGroup();
    }

    public closeModal(): void {
        this.activeModal.close();
    }

    public updateStock(stockId: number): void {
        this.stockService.updateStock(this.compileStockUpdateDTO(stockId)).subscribe((_) => {
            this.closeModal();
        });
    }

    public onMarketCapSelect(marketCap: MarketCap): void {
        this.formGroup.get('marketCap').setValue(marketCap);
    }

    public getSelectedStockJsonI(): StockJsonI[] {
        return [{ symbol: this.stockDTO.symbol, name: this.stockDTO.name }];
    }

    public getMarketCap(): MarketCap {
        const temp = this.formGroup.get('marketCap').value;
        return temp;
    }

    private compileStockUpdateDTO(stockId: number): StockUpdateDTO {
        const stockUpdateDTO = new StockUpdateDTO();
        stockUpdateDTO.id = stockId;
        stockUpdateDTO.quantity = this.formGroup.value.quantity;
        stockUpdateDTO.averagePrice = this.formGroup.value.averagePrice;
        stockUpdateDTO.marketCap = this.formGroup.value.marketCap;
        stockUpdateDTO.sector = this.formGroup.value.sector;
        return stockUpdateDTO;
    }

    private createFormGroup(): void {
        this.formGroup = this.formBuilder.group({
            symbol: [{ value: this.stockDTO.symbol, disabled: true }, Validators.required],
            name: [{ value: this.stockDTO.name, disabled: true }, Validators.required],
            quantity: [this.stockDTO.quantity, Validators.required],
            averagePrice: [this.stockDTO.averagePrice, Validators.required],
            marketCap: [this.stockDTO.marketCap, Validators.required],
            sector: [this.stockDTO.sector, Validators.required],
        });
    }

    private labelFunction(stockJson: StockJsonI): string {
        return stockJson.symbol + ' | ' + stockJson.name;
    }
}
