import { authAxios } from "./axios";
import { UserType } from "../types/user";

const authApi = {
    login: (data: UserType) => {
        return authAxios.post("user/login", data);
    },
    signUp: (data: UserType) => {
        return authAxios.post("user/create", data);
    },
};

export default authApi;
