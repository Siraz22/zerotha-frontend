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

    private symbols: string[];

    constructor(private newsService: NewsService, private webSocketService: WebSocketService) {}

    ngOnInit() {
        this.populateSymbols();
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
            console.log(data);
            this.newsUpdates = data.news;
        });
    }
}
