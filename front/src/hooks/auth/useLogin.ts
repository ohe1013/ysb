import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import authApi from "../../api/auth";
import { AuthResType, LoginUserType } from "../../types/auth";

const useLogin = () => {
    const navigate = useNavigate();
    return useMutation((user: LoginUserType) => authApi.login(user), {
        onSuccess: (data: AxiosResponse<AuthResType>) => {
            const accessToken = data.data.accessToken;
            localStorage.setItem("accessToken", accessToken);
            navigate("/");
        },
    });
};

export default useLogin;
