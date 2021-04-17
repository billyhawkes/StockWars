// Imports
import pool from "../db/db";

// Data Types
import { User } from "..";

// Add user (Register)
export const addUser = async (
    username: User["username"],
    email: User["email"],
    hashedPassword: User["password"]
) => {
    const newUser = await pool.query(
        `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${hashedPassword}') RETURNING user_id, username`
    );
    return newUser.rows[0];
};

export const findUser = async (identity: User["username"] | User["email"]) => {
    const user = await pool.query(
        `SELECT user_id, username, password FROM users WHERE username='${identity}' OR email='${identity}' `
    );
    return user.rows[0] || false;
};

export const getUserContext = async (userID: number) => {
    const userContext = await pool.query(
        `SELECT user_id, username FROM users WHERE user_id=${userID}`
    );
    return userContext.rows[0];
};
