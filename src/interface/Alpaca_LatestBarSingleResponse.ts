export interface Alpaca_LatestBarSingleResponse {
    bar: {
        c: number; // Closing price
        h: number; // Highest price
        l: number; // Lowest price
        n: number; // Number of trades
        o: number; // Opening price
        t: string; // Timestamp
        v: number; // Volume
        vw: number; // Volume-weighted average price (VWAP)
    };
    symbol: string;
}
