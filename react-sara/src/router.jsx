import { createBrowserRouter } from 'react-router-dom';
import Login from './views/login.jsx';
import Register from './views/register.jsx';
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import Users from './views/users.jsx';
import Home from './views/home.jsx';
import SaraHome from './views/sara/SaraHome.jsx';
import Requisitar from './views/requisitar.jsx';
import Equipamentos from './views/equipamentos.jsx';
import Notificacoes from "./views/Notificacoes";
import Carrinho from "./views/Carrinho";



const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <DefaultLayout />,
            children: [
                {
                    path: '/users',
                    element: <Users />,
                },
                {
                    path: '/home',
                    element: <Home />,
                },
                {
                    path: '/homesara',
                    element: <SaraHome />,
                },
                {
                    path: '/requisitar',
                    element: <Requisitar />,
                },
                {
                    path: '/equipamentos',
                    element: <Equipamentos />,
                },
                {
                    path: "/notificacoes",
                    element: <Notificacoes />
                },
                {
                    path: "/carrinho",
                    element: <Carrinho />
                }


            ]
        },
        {
            path: '/',
            element: <GuestLayout />,
            children: [
                {
                    path: '/login',
                    element: <Login />,
                },
                {
                    path: '/register',
                    element: <Register />,
                }
            ]
        },
    ]
);



export default router;
