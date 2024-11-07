import FormLayout from "../layouts/formLayout";
import LayoutDefault from "../layouts/layoutDefault";
import Home from "../pages/Home";
import Login from "../pages/login/login";
import Register from "../pages/Register/register";

export const routes = [
    {
        path: '/',
        element: <LayoutDefault />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    },
    {
        element: <FormLayout />,
        children: [
            {   
                path: '/user/register',
                element: <Register />
            },
            {   
                path: '/user/login',
                element: <Login />
            }
        ]
    }
]