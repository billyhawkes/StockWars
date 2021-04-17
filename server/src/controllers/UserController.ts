// Model
import { costFromSymbol } from "../models/StockModel";
import { getCash, getOwnedStocks } from "../models/UserModel";

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

            // Networth
            const netWorth = cash + stocksWorth;

            return res.json({ cash, stocksWorth, netWorth });
        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };
}

export default UserController;
