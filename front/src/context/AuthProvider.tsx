import React, { SetStateAction } from "react";
import { Dispatch } from "react";
import { createContext, useState } from "react";

const AuthContext = createContext<ProviderProps>({} as ProviderProps);

type Props = {
    children: React.ReactNode;
};
export type Auth = {
    email?: string;
    pwd?: string;
    roles?: number[];
    accessToken?: string;
};
type ProviderProps = {
    auth: Auth;
    setAuth: Dispatch<SetStateAction<Auth>>;
};

export const AuthProvider = ({ children }: Props) => {
    const [auth, setAuth] = useState<Auth>({});


    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
