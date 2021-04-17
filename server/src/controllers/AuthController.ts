// Imports
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db/db";

// Model
import { addUser, findUser, getUserContext } from "../models/AuthModel";

class AuthController {
    static Login = async (req: any, res: any) => {
        const { identity, password } = req.body;

        try {
            // Error: Left field/s empty
            if (!identity || !password)
                return res
                    .status(400)
                    .json({ message: "Please fill in all fields" });

            // Get User
            const user = await findUser(identity);

            // Error: Username doesn't exist
            if (!user)
                return res
                    .status(400)
                    .json({ message: "Username or Email doesn't exist" });
            // Error: Password is incorrect
            const passMatch = await bcrypt.compare(password, user.password);
            if (!passMatch)
                return res.status(400).json({ message: "Incorrect Password" });

            // Login //

            // Create token
            const token = await jwt.sign(
                { id: user.user_id },
                `${process.env.JWT_SECRET}`
            );

            return res.json({
                token,
                id: user.user_id,
                username: user.username,
            });
        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };
    static Register = async (req: any, res: any) => {
        const { username, email, password, passwordCheck } = req.body;

        try {
            // Error Checking //
            if (!username || !email || !password || !passwordCheck)
                return res
                    .status(400)
                    .json({ message: "Please fill in all fields" });
            if (password != passwordCheck)
                return res
                    .status(400)
                    .json({ message: "Passwords don't match" });
            if (password.length < 8)
                return res
                    .status(400)
                    .json({ message: "Password must be atleast 8 characters" });
            const matchingUsers = await pool.query(
                `SELECT * FROM users WHERE username='${username}' OR email='${email}'`
            );
            if (matchingUsers.rows[0])
                return res
                    .status(400)
                    .json({ message: "Username or Email already exists" });

            // Adding User //
            // Hash password
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create user
            const newUser = await addUser(username, email, hashedPassword);

            // Login
            const token = await jwt.sign(
                { id: newUser.user_id },
                `${process.env.JWT_SECRET}`
            );

            return res.json({
                token,
                id: newUser.user_id,
                username: newUser.username,
            });
        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };
    static UserContext = async (req: any, res: any) => {
        const { userID } = req.body;
        try {
            // Search for users
            const user = await getUserContext(userID);

            // Error: If the user didn't exist
            if (!user) {
                return res.status(400).json({ message: "No user from token" });
            } else {
                return res.json({
                    id: user.user_id,
                    username: user.username,
                });
            }
        } catch (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };
}

export default AuthController;
