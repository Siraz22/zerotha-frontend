import { MarketCap } from '../enums/market-cap';
import { Sector } from '../enums/sector';
import { InvestmentDTO } from './InvestmentDTO';

export class StockUpdateDTO extends InvestmentDTO {
    marketCap: MarketCap;
    sector: Sector;
}
