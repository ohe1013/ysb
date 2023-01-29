import axios from "./config/axios";

const ApiService = {
    setHeader: () => {
        axios.defaults.headers.common["Authorization"] = localStorage.getItem("accessToken");
    },
};

export default ApiService;
