// Import
import express from "express";
const router = express.Router();

// Middleware
import { auth } from "../middleware/authMiddleware";
import { costFromSymbol } from "../models/stockModel";
import { getCash, getOwnedStocks } from "../models/userModel";

// Get your user info
router.get("/", auth, async (req, res) => {
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
});

// Leaderboard
//

export default router;
