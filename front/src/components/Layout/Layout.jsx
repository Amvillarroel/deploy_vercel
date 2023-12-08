import React from "react";
import { AppNavbar } from "../app_navbar/app_navbar";

const Layout = ({ children }) => {
    return (
        <>
            <AppNavbar />
            {children}
        </>
    );
};

export { Layout };