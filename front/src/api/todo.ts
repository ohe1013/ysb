import { TodoReqType } from "../types/todo";
import { authAxios } from "./axios";

const todoApi = {
    getTodos: async () => {
        const { data } = await authAxios.get("todos");
        return data.data;
    },
    createTodo: (data: TodoReqType) => {
        return authAxios.post("todos", data);
    },
    deleteTodo: (id: string) => {
        return authAxios.delete(`todos/${id}`);
    },
};

export default todoApi;
