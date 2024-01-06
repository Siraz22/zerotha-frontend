import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CountryDTO } from '../../../dto/CountryDTO';
import { StockDTO } from '../../../dto/StockDTO';
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
    public hasMarketAPI: boolean;

    public stockDTO: StockDTO;

    public searchResults: any = [];
    public labelFn: (stockJson: StockJsonI) => string = this.labelFunction;

    public selectedStock: any;
    public stocks: StockJsonI[] = [];

    public MarketCap = MarketCap;
    public Sector = Sector;

    constructor(private formBuilder: FormBuilder, private activeModal: NgbActiveModal, private localAssetService: LocalAssetService, private stockService: StocksService) {}

    ngOnInit() {
        console.log(this.stockDTO);
        if (this.hasMarketAPI) {
            this.initializeStocks();
        }
        this.createFormGroup();
    }

    private initializeStocks(): void {
        if (this.countryDTO.name == 'United States') {
            this.localAssetService.getLocalUSStocks().subscribe((data: StockJsonI[]) => (this.stocks = data));
        }
    }

    public closeModal(): void {
        this.activeModal.close();
    }

    public onStockSelect(event: any): void {
        console.log(event);
    }

    public saveStock(): void {
        this.stockService.saveStock(this.compileStockDTO()).subscribe((_) => {
            this.closeModal();
        });
    }

    public onMarketCapSelect(marketCap: MarketCap): void {
        this.formGroup.get('marketCap').setValue(marketCap);
    }

    private compileStockDTO(): StockDTO {
        const stockDTO = new StockDTO();

        // stockDTO.associatedCountryId = this.countryDTO.id;
        // stockDTO.name = this.formGroup.value.name;
        // stockDTO.symbol = this.formGroup.value.symbol;
        // stockDTO.investmentType = InvestmentType.STOCK;

        stockDTO.quantity = this.formGroup.value.quantity;
        stockDTO.averagePrice = this.formGroup.value.averagePrice;
        stockDTO.marketCap = this.formGroup.value.marketCap;
        stockDTO.sector = this.formGroup.value.sector;
        return stockDTO;
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
