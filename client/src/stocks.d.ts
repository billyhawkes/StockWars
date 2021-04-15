interface Stock {
    stock_id: number;
    symbol: string | undefined;
    amount: number | undefined;
    cost: string;
    date_time: string;
}

interface User {
    username: string;
    email: string;
    password: string;
}

interface ClientUser {
    token: string | undefined;
    id: number | undefined;
    username: string | undefined;
}
