import axios, { type InternalAxiosRequestConfig } from "axios";
import { TOKEN_CYBERSOFT, VITE_BASE_URL } from "../constants";



export const api = axios.create({
    baseURL: VITE_BASE_URL,
})

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const user = localStorage.getItem("USER_ADMIN");
    const accessToken = user ? JSON.parse(user).accessToken : "";

    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    config.headers["TokenCybersoft"] = TOKEN_CYBERSOFT;

    return config;
});
