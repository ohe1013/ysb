import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
