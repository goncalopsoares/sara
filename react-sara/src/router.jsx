import {createBrowserRouter} from 'react-router-dom';
import Login from './views/login.jsx';
import Register from './views/register.jsx';
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import Users from './views/users.jsx';
import UltimasRequisicoes from './views/ultimasrequisicoes.jsx';
import Requisitar from './views/requisitar.jsx';
import Equipamentos from './views/equipamentos.jsx';



const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <DefaultLayout/>,
            children: [
                {
                path: '/users',
                element: <Users/>,
                },
                {
                    path: '/ultimasrequisicoes',
                    element: <UltimasRequisicoes/>,
                    },
                    {
                        path: '/requisitar',
                        element: <Requisitar/>,
                        },
                        {
                            path: '/equipamentos',
                            element: <Equipamentos/>,
                            }

            
            ]
        },
        {
            path: '/',
            element: <GuestLayout/>,
            children: [
                {
                    path: '/login',
                    element: <Login/>,
                },
                {
                    path: '/register',
                    element: <Register/>,
                }
            ]
        },
    ]
);



export default router;