import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Camera, AlertTriangle, LogOut } from 'react-feather';
import {useState,useEffect} from "react";
import logo from '../images_logo/logo.svg';

const TopNavbar = () => {
    const location = useLocation();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    return (
        <div
            className="d-flex justify-content-around align-items-center position-fixed top-0 start-0 end-0 p-2 w-100"
            style={{
                background: "linear-gradient(0deg, white 0%, rgba(255, 255, 255, 0.90) 100%)",
                backdropFilter: "blur(4px)",
                zIndex: 1000,
                height: "5rem",
                fontSize: '0.5rem',
            }}
        >
            <div className="text-center flex-fill">
                <Link
                    to="/homesara"
                    className="d-flex flex-column justify-content-center align-items-center rounded text-decoration-none"
                    >
                    <img src={logo} style={{ width: "2rem", height: "auto"}} />
                    </Link >
            </div>
            <div className="text-center flex-fill">
                <Link
                    to="/homesara"
                    className="d-flex flex-column justify-content-center align-items-center rounded text-decoration-none"
                    style={{ color: location.pathname === "/home" ? "black" : "#c2c2c2" }}
                >
                    <Home/>
                    {screenWidth > 350 && <span style={{paddingTop:"0.2rem"}}>Home</span>}
                </Link>
            </div>
            <div className="text-center flex-fill">
                <Link
                    to="/equipamentos"
                    className="d-flex flex-column justify-content-center align-items-center rounded text-decoration-none"
                    style={{ color: location.pathname === "/equipamentos" ? "black" : "#c2c2c2" }}
                >
                    <Camera/>
                    {screenWidth > 350 && <span style={{paddingTop:"0.2rem"}}>Equipamentos</span>}
                </Link>
            </div>
            <div className="text-center flex-fill">
                <Link
                    to=""
                    className="d-flex flex-column justify-content-center align-items-center rounded text-decoration-none"
                    style={{ color: location.pathname === "/notificacoes" ? "black" : "#c2c2c2" }}
                >
                    <BookOpen />
                    {screenWidth > 350 && <span style={{paddingTop:"0.2rem"}}>Histórico</span>}
                </Link>
            </div>
            <div className="text-center flex-fill">
                <Link
                    to=""
                    className="d-flex flex-column justify-content-center align-items-center rounded text-decoration-none"
                    style={{ color: location.pathname === "/users" ? "black" : "#c2c2c2" }}
                >
                    <AlertTriangle />
                    {screenWidth > 350 && <span style={{paddingTop:"0.2rem"}}>Anomalias</span>}
                </Link>
            </div>
        </div>
    );
};

export default TopNavbar;
