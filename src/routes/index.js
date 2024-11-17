import { TransitionProvider } from '../context/TransitionContext';
import TransitionComponent from '../components/transition';

import FormLayout from "../components/layouts/formLayout";
import LayoutDefault from "../components/layouts/layoutDefault";

import Home from "../pages/Home";
import Login from "../pages/login/login";
import Register from "../pages/Register/register";
import PrivateRoute from '../components/privateRoutes/indes';
import Topics from '../pages/Topics/topic';

export const routes = [
    {
        path: '/',
        element: <TransitionProvider><LayoutDefault /></TransitionProvider>,
        children: [
            {
                path: '/',
                element: <TransitionComponent><Home /></TransitionComponent>
            },
            {
                element: <PrivateRoute />,
                children: [
                    {
                        path: '/profile',
                        element: <TransitionComponent>ok</TransitionComponent>
                    }
                ]
            },
            {
                path: '/topics',
                element: <TransitionComponent><Topics /></TransitionComponent>
            }
        ]
    },
    {
        element: <TransitionProvider><FormLayout /></TransitionProvider>,
        children: [
            {   
                path: '/user/register',
                element: <TransitionComponent><Register /></TransitionComponent>
            },
            {   
                path: '/user/login',
                element: <TransitionComponent><Login /></TransitionComponent>
            }
        ]
    }
]