import axios, { type InternalAxiosRequestConfig } from "axios";
const TOKEN_CYBERSOFT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgNTQiLCJIZXRIYW5TdHJpbmciOiIyOC8wOC8yMDI2IiwiSGV0SGFuVGltZSI6IjE3ODc4NzUyMDAwMDAiLCJuYmYiOjE3Njk1MzMyMDAsImV4cCI6MTc4ODAyMjgwMH0.cX4W082coiCPW_GttAh6P5fDK6QCHTATy3vjQnjDt9Q"

export const api = axios.create({
    baseURL: "https://movienew.cybersoft.edu.vn/api/",
})

api.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
    const user = localStorage.getItem("USER_ADMIN");
    const accessToken = user ? JSON.parse(user).accessToken : "";

    config.headers["Authorization"] = `Bearer ${accessToken}`;
    config.headers["TokenCybersoft"] = TOKEN_CYBERSOFT;

    return config;
});