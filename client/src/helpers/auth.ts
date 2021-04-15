import axios from "axios";

export const setupAuth = async () => {
    const token = localStorage.getItem("auth-token");

    // set token if none
    if (!token) return localStorage.setItem("auth-token", "");

    const res = await axios.get("/auth", {
        headers: { "auth-token": token },
    });
    const data = await res.data;
    return data;
};
// Login
export const login = async (
    identity: User["email"] | User["username"],
    password: User["password"]
) => {
    const res = await axios.post("/auth/login", { identity, password });
    const data = await res.data;
    localStorage.setItem("auth-token", data.token);
    return data;
};
// Register
export const register = async (
    username: User["username"],
    email: User["email"],
    password: User["password"],
    passwordCheck: User["password"]
) => {
    const res = await axios.post("/auth/register", {
        username,
        email,
        password,
        passwordCheck,
    });
    const data = await res.data;
    localStorage.setItem("auth-token", data.token);
    return data;
};
