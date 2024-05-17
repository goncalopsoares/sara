import React from 'react';
import { Link } from 'react-router-dom';
import { FaList, FaPlusCircle, FaCogs, FaUsers } from 'react-icons/fa';

const BottomNavBar = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-green-400 text-white flex justify-around p-4">
            <Link to="/ultimasrequisicoes" className="flex flex-col items-center">
                <FaList className="text-2xl" />
                <span>Ultimas Requisicoes</span>
            </Link>
            <Link to="/requisitar" className="flex flex-col items-center">
                <FaPlusCircle className="text-2xl" />
                <span>Requisitar</span>
            </Link>
            <Link to="/equipamentos" className="flex flex-col items-center">
                <FaCogs className="text-2xl" />
                <span>Equipamentos</span>
            </Link>
            <Link to="/users" className="flex flex-col items-center">
                <FaUsers className="text-2xl" />
                <span>Users</span>
            </Link>
        </div>
    );
};

export default BottomNavBar;
