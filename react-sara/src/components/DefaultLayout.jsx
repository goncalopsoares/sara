import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import UltimasRequisicoes from '../views/ultimasrequisicoes'; 
import BottomNavBar from "./bottomnavbar";

export default function DefaultLayout() {
    const { token } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

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
