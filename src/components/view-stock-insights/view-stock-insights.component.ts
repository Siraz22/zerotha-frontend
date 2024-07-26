import { Component, Input, OnInit } from '@angular/core';

import { StockDTO } from '../../dto/StockDTO';
import { NewsService } from '../../service/news.service';
import { WebSocketService } from '../../service/websocket.service';

@Component({
    selector: 'app-view-stock-insights',
    templateUrl: './view-stock-insights.component.html',
    styleUrls: ['./view-stock-insights.component.css'],
})
export class ViewStockInsightsComponent implements OnInit {
    @Input()
    public stockDTOs: StockDTO[];

    public newsUpdates: any[] = [];

    constructor(private newsService: NewsService, private webSocketService: WebSocketService) {}

    ngOnInit() {
        this.newsService.connect();
        this.newsService.getUpdatedNews().subscribe(
            (news) => this.newsUpdates.push(news),
            (err) => console.error(err)
        );

        // this.webSocketService.connect();
    }

    disconnect(): void {
        this.newsService.disconnect();
    }
}
