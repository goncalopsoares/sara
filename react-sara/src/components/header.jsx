
import React from 'react';
import logo from '../images_logo/logo.svg';
import { FaCartShopping } from "react-icons/fa6";

export default function Header() {  

    return(

    <header className="bg-green-400 p-4 text-white flex justify-between">
    <div><img className='img-fluid size-10 ' src={logo} alt="logotipo sara" /></div>
    <div>
        <a  href=""><FaCartShopping size={24} /></a>
    </div>
</header>)


}

