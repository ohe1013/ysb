import { useMutation, useQueryClient } from "@tanstack/react-query";
import todoApi from "../../api/todo";
import { TodoReqType } from "../../types/todo";

const useCreateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation((todo: TodoReqType) => todoApi.createTodo(todo), {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
    });
};

export default useCreateTodo;
