import React from "react";
import { Header } from "../Header/Header";

const Layout = ({ children }) => {
    return (
        <>
            <Header></Header>
            {children}
            
        </>
    );
};

export { Layout };