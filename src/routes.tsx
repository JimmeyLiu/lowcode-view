import { Navigate } from "react-router-dom";
// import Index from "./pages/Index";
import PageRender from './lce/PageRender'
import home from './lce/pages/home.json';
import index from './lce/pages/index.json';
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