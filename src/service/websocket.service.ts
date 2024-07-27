import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class WebSocketService {
    private socketSubject: WebSocketSubject<any>;

    constructor() {}

    public connect(): void {
        this.socketSubject = webSocket('wss://stream.data.alpaca.markets/v1beta1/news');

        this.socketSubject.next({ action: 'auth', key: environment.ALPACA_KEY, secret: environment.ALPACA_SECRET });

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
