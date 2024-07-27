import { Component, Input, OnInit } from '@angular/core';

import { StockDTO } from '../../dto/StockDTO';
import { NewsService } from '../../service/news.service';
import { WebSocketService } from '../../service/websocket.service';

interface NewsImage {
    size: string;
    url: string;
}

interface NewsArticle {
    author: string;
    content: string;
    created_at: string;
    headline: string;
    id: number;
    images: NewsImage[];
    source: string;
    summary: string;
    symbols: string[];
    updated_at: string;
    url: string;
}

@Component({
    selector: 'app-view-stock-insights',
    templateUrl: './view-stock-insights.component.html',
    styleUrls: ['./view-stock-insights.component.css'],
})
export class ViewStockInsightsComponent implements OnInit {
    @Input()
    public stockDTOs: StockDTO[];
    public newsUpdates: NewsArticle[] = [];

    public symbols: string[];
    public selectedOverview = 'Gainers';
    public topGainers: StockDTO[];
    public topLosers: StockDTO[];

    constructor(private newsService: NewsService, private webSocketService: WebSocketService) {}

    ngOnInit() {
        this.populateSymbols();
        this.findLosersAndGainers();
    }

    selectOverview(option: string) {
        this.selectedOverview = option;
    }

    public findLosersAndGainers(): void {
        const sortedStocks = [...this.stockDTOs].sort((a, b) => {
            const profitA = a.quantity * (a.fe_currentPrice - a.averagePrice);
            const profitB = b.quantity * (b.fe_currentPrice - b.averagePrice);
            return profitA - profitB;
        });

        // Map sorted stocks to a string representation
        const stockProfits = sortedStocks.map((stock) => `${stock.symbol}: ${stock.quantity * ((stock.fe_currentPrice || 0) - stock.averagePrice)}`).join(', ');

        // Get the top three losers (smallest total values)
        this.topLosers = sortedStocks.slice(0, 3);

        // Get the top three gainers (largest total values)
        this.topGainers = sortedStocks.slice(-3).reverse();
    }

    redirectToNews(url: string): void {
        window.open(url, '_blank');
    }

    private populateSymbols(): void {
        this.symbols = this.stockDTOs.map((stockDTO) => stockDTO.symbol);
        this.populateNews();
    }

    private populateNews(): void {
        this.newsService.getNews(this.symbols).subscribe((data) => {
            this.newsUpdates = data.news;
        });
    }
}
