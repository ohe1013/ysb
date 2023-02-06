import { authAxios } from "./axios";
import { UserType } from "../types/auth";

const authApi = {
    login: (data: UserType) => {
        return authAxios.post("users/login", data);
    },
    signUp: (data: UserType) => {
        return authAxios.post("user/create", data);
    },
};

export default authApi;
