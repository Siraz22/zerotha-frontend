import { MarketCap } from '../enums/market-cap';
import { Sector } from '../enums/sector';
import { InvestmentDTO } from './InvestmentDTO';

export class StockDTO extends InvestmentDTO {
    symbol: string;
    name: string;
    marketCap: MarketCap;
    sector: Sector;
}
