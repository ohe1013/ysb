import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Layout from "../components/layout/Layout";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import MainRoom from "../components/ysb/MainRoom";
import Unauthorized from "../components/auth/UnAuthorized";
import PersistLogin from "../components/auth/PersistLogin";
import RequireAuth from "../components/auth/RequireAuth";
import Admin from "../components/auth/Admin";
import Home from "../pages/Home";
import MapPage from "../pages/MapPage";
import Test from "../pages/Test";

const ROLES = {
    User: 2001,
    Admin: 5150,
};

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="mainRoom" element={<MainRoom />} />
                    <Route path="map" element={<MapPage />} />
                    <Route path="unauthorized" element={<Unauthorized />} />
                    <Route path="test" element={<Test />} />
                    <Route element={<PersistLogin />}>
                        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                            <Route path="/" element={<Home />} />
                        </Route>
                        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                            <Route path="admin" element={<Admin />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
export default Router;
