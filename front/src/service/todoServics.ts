import ApiService from "./apiService";
import axios from "./config/axios";

const getTodos = async () => {
    ApiService.setHeader();

    return axios.get("/todos");
};

const createTodos = (data: { title: string; content: string }) => {
    ApiService.setHeader();
    axios.post("/todos", data);
};

export { getTodos, createTodos };
