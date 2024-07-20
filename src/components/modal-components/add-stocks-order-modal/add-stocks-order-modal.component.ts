import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CountryDTO } from '../../../dto/CountryDTO';
import { StockDTO } from '../../../dto/StockDTO';
import { InvestmentType } from '../../../enums/Investment-type';
import { MarketCap } from '../../../enums/market-cap';
import { Sector } from '../../../enums/sector';
import { Alpaca_LatestBarSingleResponse } from '../../../interface/Alpaca_LatestBarSingleResponse';
import { IStockJson } from '../../../interface/StockJsonI';
import { LocalAssetService } from '../../../service/local-asset.service';
import { StocksService } from '../../../service/stocks.service';
import { TickerSearchService } from '../../../service/ticker-search.service';

@Component({
    selector: 'app-add-stocks-order-modal',
    templateUrl: './add-stocks-order-modal.component.html',
    styleUrls: ['./add-stocks-order-modal.component.css'],
})
export class AddStocksOrderModalComponent implements OnInit {
    public formGroup: FormGroup;
    public countryDTO: CountryDTO;
    public hasMarketAPI: boolean;

    public searchResults: any = [];
    public labelFn: (stockJson: IStockJson) => string = this.labelFunction;
    public searchFn: (searchTerm: string, stockJson: IStockJson) => boolean = this.searchFunction;

    public selectedStock: any;
    public stocks: IStockJson[] = [];

    public MarketCap = MarketCap;
    public Sector = Sector;

    constructor(
        private formBuilder: FormBuilder,
        private activeModal: NgbActiveModal,
        private localAssetService: LocalAssetService,
        private tickerSearchService: TickerSearchService,
        private stockService: StocksService
    ) {}

    ngOnInit() {
        if (this.hasMarketAPI) {
            this.initializeStocks();
        }
        this.createFormGroup();
    }

    public prefillSymbol(event: IStockJson): void {
        if (this.hasMarketAPI) {
            if (this.countryDTO.name == 'United States') {
                const symbol = event.symbol;
                this.formGroup.get('symbol').setValue(symbol);
                this.formGroup.updateValueAndValidity();
                this.tickerSearchService.getOHLC_US(symbol).subscribe((data: Alpaca_LatestBarSingleResponse) => {
                    this.selectedStock = data;
                });
            }
        }
    }

    private initializeStocks(): void {
        if (this.countryDTO.name == 'United States') {
            this.localAssetService.getLocalUSStocks().subscribe((data: IStockJson[]) => (this.stocks = data));
        }
    }

    public closeModal(isSaved: boolean): void {
        this.activeModal.close(isSaved);
    }

    public onStockSelect(event: any): void {
        console.log(event);
    }

    public saveStock(): void {
        this.stockService.saveStock(this.compileStockDTO()).subscribe(
            (_) => {
                this.closeModal(true);
            },
            (error) => {
                console.error('Error:', error); // Log the error to get more information
            }
        );
    }

    public onMarketCapSelect(marketCap: MarketCap): void {
        this.formGroup.get('marketCap').setValue(marketCap);
    }

    public openEditStockModal(): void {}

    private compileStockDTO(): StockDTO {
        const stockDTO = new StockDTO();
        stockDTO.associatedCountryId = this.countryDTO.id;
        stockDTO.name = this.formGroup.value.name;
        stockDTO.symbol = this.formGroup.value.symbol;
        stockDTO.quantity = this.formGroup.value.quantity;
        stockDTO.averagePrice = this.formGroup.value.averagePrice;
        stockDTO.marketCap = this.formGroup.value.marketCap;
        stockDTO.sector = this.formGroup.value.sector;
        stockDTO.investmentType = InvestmentType.STOCK;
        return stockDTO;
    }

    private createFormGroup(): void {
        this.formGroup = this.formBuilder.group({
            symbol: [null, Validators.required],
            name: [null, Validators.required],
            quantity: [0, Validators.required],
            averagePrice: [0, Validators.required],
            marketCap: [MarketCap.SMALL_CAP, Validators.required],
            sector: [Sector.ENERGY, Validators.required],
        });
    }

    private labelFunction(stockJson: IStockJson): string {
        return stockJson.symbol + ' | ' + stockJson.name;
    }

    private searchFunction(searchTerm: string, stockJson: IStockJson): boolean {
        return stockJson.name.toLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1;
    }
}
