import { TransitionProvider } from '../context/TransitionContext';
import TransitionComponent from '../components/transition';

import FormLayout from "../layouts/formLayout";
import LayoutDefault from "../layouts/layoutDefault";
import Home from "../pages/Home";
import Login from "../pages/login/login";
import Register from "../pages/Register/register";

export const routes = [
    {
        path: '/',
        element: <TransitionProvider><LayoutDefault /></TransitionProvider>,
        children: [
            {
                path: '/',
                element: <TransitionComponent><Home /></TransitionComponent>
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