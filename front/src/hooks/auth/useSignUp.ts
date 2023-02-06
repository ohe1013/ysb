import { useMutation } from "@tanstack/react-query";
import authApi from "../../api/auth";
import { UserType } from "../../types/auth";

const useCreateTodo = () => {
    return useMutation((user: UserType) => authApi.signUp(user));
};

export default useCreateTodo;
