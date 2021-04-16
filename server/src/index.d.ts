export interface Stock {
    symbol: string;
    amount: number;
    cost: number | Promise<number>;
    date_time?: string;
}
