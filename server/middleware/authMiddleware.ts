// Imports
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const auth = async (req: any, res: any, next: any) => {
    const token = req.header("auth-token");

    // If no token
    if (!token)
        return res
            .status(401)
            .json({ message: "Authorization Denied. No token" });

    // Verify token
    jwt.verify(token, `${process.env.JWT_SECRET}`, (err: any, decoded: any) => {
        if (err)
            return res.status(401).json({
                message: "Authorization Denied. Token Verification Error",
            });
        if (decoded) req.body.userID = decoded.id;
    });

    next();
};
