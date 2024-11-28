import { TransitionProvider } from '../context/TransitionContext';
import TransitionComponent from '../components/transition';

import FormLayout from "../components/layouts/formLayout";
import LayoutDefault from "../components/layouts/layoutDefault";

import Home from "../pages/Home";
import Login from "../pages/login/login";
import Register from "../pages/Register/register";
import PrivateRoute from '../components/privateRoutes';
import Topics from '../pages/Topics/topic';
import Question from '../pages/Questions/question';
import Answer from '../pages/answer/answer';
import Profile from '../pages/profile';
import ForgotPassword from '../pages/password';
import ChangePassword from '../pages/password/changePassword';
import TopicsAdmin from '../pages/admin/topics';
import Friend from '../pages/chat/friend';
import User from '../pages/chat/user';

export const routes = [
    {
        path: '/',
        element: <TransitionProvider><LayoutDefault /></TransitionProvider>,
        elementError: <></>,
        children: [
            {
                path: '/',
                element: <TransitionComponent><Home /></TransitionComponent>
            },
            {
                element: <PrivateRoute />,
                children: [
                    {
                        path: '/user/profile',
                        element: <TransitionComponent><Profile /></TransitionComponent>
                    },
                    {
                        path: '/user/findFriend',
                        element: <TransitionComponent><User /></TransitionComponent>
                    },
                    {
                        path: '/user/friends',
                        element: <TransitionComponent><Friend /></TransitionComponent>
                    },
                    {
                        path: '/questions/:id',
                        element: <TransitionComponent><Question/></TransitionComponent>
                    },
                    {
                        path: '/answers/check/:id',
                        element: <TransitionComponent><Answer/></TransitionComponent>
                    },
                    {
                        path: '/admin/topics',
                        element: <TransitionComponent><TopicsAdmin /></TransitionComponent>
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
            },
            { 
                path: '/user/forgot-password',
                element: <TransitionComponent><ForgotPassword /></TransitionComponent>
            },
            {   
                path: '/user/change-password',
                element: <TransitionComponent><ChangePassword /></TransitionComponent>
            },
        ]
    }
]