import React, {useEffect, useState} from 'react';
import logo from '../images_logo/logo.svg';
import axiosClient from '../axiosClient';
import { useStateContext } from '../contexts/contextprovider';
import { redirect } from 'react-router-dom';
import { ShoppingCart } from 'react-feather';
import { Link, useLocation } from "react-router-dom";



export default function Header() {

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


    return(

        <div
            className="p-2 text-white flex justify-between"
            style={{
                background: 'linear-gradient(180deg, #FFF 50%, rgba(255, 255, 255, 0.90) 100%)',
                backdropFilter: 'blur(2px)',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 1000,
            }}
        >
            <div className="d-flex justify-content-center" style={{padding:"0.5rem"}}>
                <Link
                    to="/home"
                >
                <img src={logo} style={{ width: "2rem", height: "auto"}} />
                </Link>
            </div>
            <div style={{ fontSize: '0.5rem', textAlign: 'center', padding:"0.5rem" }}
                 className="flex flex-col items-center txt-grey-500"
            >
                <Link
                    to="/carrinho"
                    className="d-flex flex-column justify-content-center align-items-center rounded text-decoration-none"
                    style={{ color: location.pathname === "/carrinho" ? "black" : "#c2c2c2" }}
                >
                <ShoppingCart style={{ marginBottom: '0.2rem' }} />
                {screenWidth > 350 && <span>Carrinho</span>}
                </Link>
            </div>


{/*        <div>
            <img className='img-fluid size-10 ' src={logo} alt="logotipo sara" />
        </div>
        <div>
            <a href="" onClick={onLogout}>  <RiLogoutCircleLine  size={24} /></a>
            <a  href=""><FaCartShopping size={24} /></a>
        </div>*/}

    </div>

    )


}

