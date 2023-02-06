import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import authApi from "../api/auth";
import { UserType } from "../types/auth";

const useSignUp = () => {
    const navigate = useNavigate();

    return useMutation((user: UserType) => authApi.signUp(user), {
        onSuccess: () => navigate("/auth"),
    });
};

export default useSignUp;
