import axios from "axios";
const url = "http://localhost:8080";

const authAxios = axios.create({
    baseURL: url,
});

authAxios.interceptors.request.use(
    (config) => {
        if (window.location.pathname.includes("/auth")) {
            return config;
        }
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers = {};
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { authAxios };
