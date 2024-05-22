
import React from 'react';
import logo from '../images_logo/logo.svg';
import axiosClient from '../axiosClient';
import { useStateContext } from '../contexts/contextprovider';
import { redirect } from 'react-router-dom';
import { ShoppingCart } from 'react-feather';


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
                <img src={logo} style={{ width: "2rem", height: "auto"}} />
            </div>
            <div style={{ fontSize: '0.5rem', textAlign: 'center', padding:"0.5rem" }}
                 className="flex flex-col items-center txt-grey-500"
            >
                <ShoppingCart style={{ marginBottom: '0.2rem' }} />
                <div>Carrinho</div>
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

