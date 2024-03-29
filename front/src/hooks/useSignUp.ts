import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import authApi from "../api/auth";
import { SignUpUserType } from "../types/auth";

const useSignUp = () => {
    const navigate = useNavigate();

    return useMutation((user: SignUpUserType) => authApi.signUp(user), {
        onSuccess: () => navigate("/auth"),
    });
};

export default useSignUp;
