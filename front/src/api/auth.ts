import { authAxios } from "./axios";
import { SignUpUserType, LoginUserType } from "../types/auth";

const authApi = {
    login: (data: LoginUserType) => {
        return authAxios.post("users/login", data);
    },
    signUp: (data: SignUpUserType) => {
        return authAxios.post("user/create", data);
    },
};

export default authApi;
