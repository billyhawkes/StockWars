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
