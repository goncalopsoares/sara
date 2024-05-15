import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { useStateContext } from "../contexts/contextprovider"


export default function DefaultLayout({}) {
    const{user, token}=useStateContext();

    if(!token){
        return <Navigate to="/login"/>
    }

    return(
        <div>
            <div id="defaultLayout">
            <div>
                <header>
                    <div>
                        Header

                     </div>
                     <div>
                        {user.name}
                
                        <a href="" className='button-red' onClick={onLogout}>Logout </a>
                     </div>
                 </header>
<main>

    <Outlet/>
    </main>
             </div>
            </div>
         

        </div>
    )
    
    }