import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
    providedIn: 'root',
})
export class WebSocketService {
    private socketSubject: WebSocketSubject<any>;

    constructor() {}

    public connect(): void {
        this.socketSubject = webSocket('wss://stream.data.alpaca.markets/v1beta1/news');

        this.socketSubject.next({ action: 'auth', key: 'PK1O4HNXXOX7D8V5PPQI', secret: 'G8knEQ4rc7KTNqEFzGuaiZ8oYwrS8uImD5LQ8aJn' });

        this.socketSubject.subscribe(
            (data) => {
                console.log(data);
            },
            (err) => {
                console.log(err);
            },
            () => console.log('Complete')
        );
    }
}
