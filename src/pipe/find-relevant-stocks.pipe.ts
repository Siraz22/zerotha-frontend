import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'findRelevantStocks',
})
export class FindRelevantStocksPipe implements PipeTransform {
    transform(allStockSymbols: string[], porfolioStockSymbols: string[]): string[] {
        return allStockSymbols.filter((symbol) => porfolioStockSymbols.includes(symbol));
    }
}
