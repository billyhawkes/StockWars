// Model
import { costFromSymbol } from "../models/StockModel";
import { getCash, getOwnedStocks, getStockHistory } from "../models/UserModel";

class UserController {
    static Profile = async (req: any, res: any) => {
        const { userID } = req.body;

        try {
            // Get Cash
            const cash = await getCash(userID);

            // Get total stock worth
            const ownedStocks = await getOwnedStocks(userID);
            let stocksWorth = 0;
            for (let stock of ownedStocks) {
                const cost = await costFromSymbol(stock.symbol);
                stocksWorth += cost * stock.sum;
            }
            stocksWorth = Number(stocksWorth.toFixed(2));

            // Networth
            const netWorth = Number((cash + stocksWorth).toFixed(2));

            return res.json({ cash, stocksWorth, netWorth });
        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };
    static async Shares(req: any, res: any) {
        const { userID } = req.body;
        try {
            const ownedStocks = await getOwnedStocks(userID);
            return res.json(ownedStocks);
        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    static async History(req: any, res: any) {
        const { userID } = req.body;
        try {
            const stockHistory = await getStockHistory(userID);
            return res.json(stockHistory);
        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export default UserController;
