import "./App.css";
import React from "react";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import RequireAuth from "./components/auth/RequireAuth";

import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Editor from "./components/edit/Editor";
import Home from "./components/Home";
import Lounge from "./components/edit/Lounge";
import Admin from "./components/auth/Admin";
import Unauthorized from "./components/auth/UnAuthorized";
import PersistLogin from "./components/auth/PersistLogin";

const ROLES = {
    User: 2001,
    Editor: 1984,
    Admin: 5150,
};

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
                        <Route path="editor" element={<Editor />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
                        <Route path="lounge" element={<Lounge />} />
                    </Route>
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                        <Route path="admin" element={<Admin />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
