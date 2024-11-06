import LayoutDefault from "../layouts/layoutDefault";
import Home from "../pages/Home";

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
    }
]