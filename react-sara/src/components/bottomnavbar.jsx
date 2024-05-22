import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, PlusCircle, Camera, User } from 'react-feather';

const BottomNavBar = () => {
    const location = useLocation();

    const linkStyle = (path) => {
        return location.pathname === path
            ? { background: "black", gap: 4 }
            : { gap: 4 };
    };

    const iconStyle = (path) => {
        return location.pathname === path
            ? { width: 24, height: 24, position: "relative", color: "white" }
            : { width: 24, height: 24, position: "relative", color: "#C2C2C2" };
    };

    const textStyle = (path) => {
        return location.pathname === path
            ? {
                  fontSize: 9,
                  fontFamily: "Poppins",
                  lineHeight: "10.80px",
                  wordWrap: "break-word",
                  color: "white",
                  fontWeight: "bold",
              }
            : {
                  fontSize: 9,
                  fontFamily: "Poppins",
                  fontWeight: "400",
                  lineHeight: "10.80px",
                  wordWrap: "break-word",
                  color: "#C2C2C2",
              };
    };

    return (
        <div
            className="d-flex justify-content-around align-items-center position-fixed bottom-0 start-0 end-0 p-2 w-100"
            style={{
                background: "linear-gradient(0deg, white 0%, rgba(255, 255, 255, 0.90) 100%)",
                backdropFilter: "blur(4px)",
                zIndex: 1000,
                height: "5rem",
            }}
        >
            <div className="text-center flex-fill">
                <Link
                    to="/home"
                    className="d-flex flex-column justify-content-center align-items-center rounded text-decoration-none navbar-button"
                    style={linkStyle("/home")}
                >
                    <Home style={iconStyle("/home")} />
                    <span style={textStyle("/home")}>Home</span>
                </Link>
            </div>
            <div className="text-center flex-fill">
                <Link
                    to="/requisitar"
                    className="d-flex flex-column justify-content-center align-items-center rounded text-decoration-none navbar-button"
                    style={linkStyle("/requisitar")}
                >
                    <PlusCircle style={iconStyle("/requisitar")} />
                    <span style={textStyle("/requisitar")}>Requisitar</span>
                </Link>
            </div>
            <div className="text-center flex-fill">
                <Link
                    to="/equipamentos"
                    className="d-flex flex-column justify-content-center align-items-center rounded text-decoration-none navbar-button"
                    style={linkStyle("/equipamentos")}
                >
                    <Camera style={iconStyle("/equipamentos")} />
                    <span style={textStyle("/equipamentos")}>Equipamentos</span>
                </Link>
            </div>
            <div className="text-center flex-fill">
                <Link
                    to="/users"
                    className="d-flex flex-column justify-content-center align-items-center rounded text-decoration-none navbar-button"
                    style={linkStyle("/users")}
                >
                    <User style={iconStyle("/users")} />
                    <span style={textStyle("/users")}>Perfil</span>
                </Link>
            </div>
        </div>
    );
};

export default BottomNavBar;
