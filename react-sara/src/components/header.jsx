
import React from 'react';
import logo from '../images_logo/logo.svg';
import { FaCartShopping } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import axiosClient from '../axiosClient';
import { useStateContext } from '../contexts/contextprovider';
import { redirect } from 'react-router-dom';

export default function Header() {  

const { setUser, setToken, setId_utilizador} = useStateContext();


    const onLogout= (ev)=>{
        ev.preventDefault();
        axiosClient.post('/logout')
            .then(({}) => {
                setUser(null);
                setToken(null);
                setId_utilizador(null);
                redirect('/login');
            })
            .catch((error) => {
                console.error("Erro ao fazer logout:", error);
                // Opcional: lidar com erros de logout
            });

    }

    return(

    <header className="bg-green-400 p-4 text-white flex justify-between">
    <div><img className='img-fluid size-10 ' src={logo} alt="logotipo sara" /></div>
    <div>
        <a href="" onClick={onLogout}>  <RiLogoutCircleLine  size={24} /></a>
        <a  href=""><FaCartShopping size={24} /></a>
    </div>
</header>)


}

