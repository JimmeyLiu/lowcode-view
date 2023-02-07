import { Navigate } from "react-router-dom";
// import Index from "./pages/Index";
import PageRender from './PageRender'
import home from './config/pages/home.json';
import index from './config/pages/index.json';
const routes = [
    {
        path: "/index",
        element: <PageRender schema={index} />
    },
    {
        path: "/home",
        element: <PageRender schema={home} />
    },
    {
        path: "/",
        element: <Navigate to="/home" />
    }
    
]


export default routes;