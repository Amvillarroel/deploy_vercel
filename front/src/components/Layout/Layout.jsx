import React from "react";
import { Header } from "../Header/Header";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export { Layout };