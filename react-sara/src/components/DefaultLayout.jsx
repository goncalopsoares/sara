import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import UltimasRequisicoes from '../views/ultimasrequisicoes';
import BottomNavBar from "./bottomnavbar";
import { useEffect } from "react";
import axiosClient from "../axiosClient";

export default function DefaultLayout() {

    const { user, token, setUser } = useStateContext();

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => setUser(data))
            .catch(error => console.error('Error fetching user data:', error));
    }, []);


    if (!token) {
        return <Navigate to="/login" />;
    }

    console.log({user});

    return (
        <div>
            <div id="defaultLayout">
                <div>
                    <header className="bg-green-400 p-4 text-white flex justify-between">
                        <div>Header</div>
                        <div>
                            <a href="" className='button-red'>Logout</a>
                        </div>
                    </header>
                    <main className="p-4">
                        <Outlet />
            
                    </main>
                    <BottomNavBar />
                </div>
            </div>
        </div>
    );
}
