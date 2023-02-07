import { useMutation } from "@tanstack/react-query";
import authApi from "../../api/auth";
import { SignUpUserType } from "../../types/auth";

const useCreateTodo = () => {
    return useMutation((user: SignUpUserType) => authApi.signUp(user));
};

export default useCreateTodo;
