import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import UltimasRequisicoes from '../views/home'; 
import BottomNavBar from "./bottomnavbar";
import Header from "./header";

export default function DefaultLayout() {
    const { token} = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <div id="defaultLayout">
                <div>
                    <Header />
                    <main className="p-4">
                        
                        <Outlet />
                    
                    </main>
                    <BottomNavBar />
                </div>
            </div>
        </div>
    );
}
