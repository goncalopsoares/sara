import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import BottomNavBar from "./bottomnavbar";
import Header from "./header";
import { useEffect } from "react";
import axiosClient from "../axiosClient";


export default function DefaultLayout() {

    const {id_utilizador, user, token, setUser, setId_utilizador } = useStateContext();

    useEffect(() => {
        // Verifique se id_utilizador está disponível
        if (id_utilizador) {
            axiosClient.get(`/utilizador/${id_utilizador}`)
            .then(({ data }) => {
                setUser(data);
                setId_utilizador(data.id_utilizador); 
            })
                .catch(error => console.error('Error fetching user data:', error));
        } else {
            console.error('id_utilizador is not defined');
        }
    }, []); 

    
    useEffect(() => {
        console.log({ id_utilizador });
        console.log({ user });
    }, [id_utilizador, user]);

    if (!token) {
        return <Navigate to="/login" />;
    }

    console.log({user});

    return (
        <div>
            <div id="defaultLayout">
                <div>
                    <Header />
                    <main className="p-4">
                    

                        <Outlet />
            
                    </main>
                    {(user.tipo_utilizador === 2 || user.tipo_utilizador === 3) ? <BottomNavBar /> : null}

                </div>
            </div>
        </div>
    );
}
