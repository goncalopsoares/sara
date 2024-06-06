import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Camera, AlertTriangle, LogOut } from 'react-feather';
import { useState, useEffect } from "react";
import logo from '../images_logo/logo.svg';
import axiosClient from "../axiosClient.js";
import { useStateContext } from "../contexts/contextprovider.jsx";

const TopNavbar = () => {
    const location = useLocation();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const { setUser, setId_utilizador, setToken } = useStateContext();

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post('/logout')
            .then(() => {
                setUser(null);
                setToken(null);
                setId_utilizador(null);
                redirect('/login');
            })
            .catch((error) => {
                console.error("Erro ao fazer logout:", error);
                // Optional: handle logout errors
            });
    };

    return (
        <div className="d-flex justify-content-between w-100 position-fixed top-0 start-0 end-0">
            <div
                className="d-flex justify-content-start align-items-center p-2 gap-12"
                style={{
                    background: "linear-gradient(0deg, white 0%, rgba(255, 255, 255, 0.90) 100%)",
                    backdropFilter: "blur(4px)",
                    zIndex: 1000,
                    height: "5rem",
                }}
            >
                <div className="d-flex flex-column text-center ms-4 ps-1">
                    <Link
                        to="/homesara"
                        className="d-flex flex-column justify-content-center align-items-center rounded text-decoration-none"
                    >
                        <img src={logo} style={{ width: "2rem", height: "auto" }} />
                    </Link>
                </div>
                <div className="text-center">
                    <Link
                        to="/homesara"
                        className="d-flex flex-row justify-content-center align-items-center rounded text-decoration-none"
                        style={{ color: location.pathname === "/home" ? "black" : "#c2c2c2" }}
                    >
                        <Home className="me-2" />
                        {screenWidth > 350 && <span>Home</span>}
                    </Link>
                </div>
                <div className="text-center">
                    <Link
                        to="/equipamentos"
                        className="d-flex flex-row justify-content-center align-items-center rounded text-decoration-none"
                        style={{ color: location.pathname === "/equipamentos" ? "black" : "#c2c2c2" }}
                    >
                        <Camera className="me-2" />
                        {screenWidth > 350 && <span>Equipamentos</span>}
                    </Link>
                </div>
                <div className="text-center">
                    <Link
                        to=""
                        className="d-flex flex-row justify-content-center align-items-center rounded text-decoration-none"
                        style={{ color: location.pathname === "/notificacoes" ? "black" : "#c2c2c2" }}
                    >
                        <BookOpen className="me-2" />
                        {screenWidth > 350 && <span>Histórico</span>}
                    </Link>
                </div>
                <div className="text-center">
                    <Link
                        to=""
                        className="d-flex flex-row justify-content-center align-items-center rounded text-decoration-none"
                        style={{ color: location.pathname === "/users" ? "black" : "#c2c2c2" }}
                    >
                        <AlertTriangle className="me-2" />
                        {screenWidth > 350 && <span>Anomalias</span>}
                    </Link>
                </div>
            </div>
            <div className="text-center d-flex align-items-center me-4">
                <button
                    onClick = {onLogout}
                    className="d-flex flex-row justify-content-center align-items-center rounded text-decoration-none"
                    style={{ color: location.pathname === "/notificacoes" ? "black" : "#c2c2c2" }}
                    >
                    <LogOut className="me-2" />
                    {screenWidth > 350 && <span>Sair</span>}
                </button>
            </div>
        </div >
    );
};

export default TopNavbar;
