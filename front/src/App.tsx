import React from "react";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import RequireAuth from "./components/auth/RequireAuth";

import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/Home";
import Admin from "./components/auth/Admin";
import Unauthorized from "./components/auth/UnAuthorized";
import PersistLogin from "./components/auth/PersistLogin";
import LinkPage from "./components/LinkPage";
import MainRoom from "./components/ysb/MainRoom";

const ROLES = {
  User: 2001,
  Admin: 5150,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="mainRoom" element={<MainRoom />} />
        <Route path="unauthorized" element={<Unauthorized />} />
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
  );
}

export default App;
