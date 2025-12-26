import { lazy, type JSX } from "react";
import { Route } from "react-router-dom";

type Route = {
    path: string;
    element: React.LazyExoticComponent<() => JSX.Element>;
    nested?: Route[];
};

const routes: Route[] = [
    {
        path: "",
        element: lazy(() => import("./../pages/HomeTemplate")),
        nested: [

        ],
    },
    {
        path: "/auth",
        element: lazy(() => import("../pages/HomeTemplate/Auth")),
    },
    {
        path: "/admin",
        element: lazy(() => import("../pages/AdminTemplate")),
    },
    {
        path: "/cinema",
        element: lazy(() => import("../pages/HomeTemplate/Cinema")),
    },
    {
        path: "/movies",
        element: lazy(() => import("../pages/HomeTemplate/Movie")),
    },
    {
        path: "/ticket",
        element: lazy(() => import("../pages/HomeTemplate/Ticket")),
    },
]

export default routes;