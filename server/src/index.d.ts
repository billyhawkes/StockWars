export interface Stock {
    symbol: string;
    amount: number;
    cost: number | Promise<number>;
    date_time?: string;
}

export interface User {
    username: string;
    email: string;
    password: string;
    cash: number;
}
