import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const refresh = async () => {
        const res = await axios.post(
            "/user/login",
            JSON.stringify({ id: "gosu", password: "1q2w3e4r" }),
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        setAuth((prev) => {
            console.log(JSON.stringify(prev));
            console.log(res.data[0]);
            return { 
                ...prev, 
                roles: [1984, 2001, 5150],
                accessToken: res.data[0],
             };
        });
        return res.data[0];
    };
    return refresh;
};

export default useRefreshToken;
