import Cookies from "js-cookie";
import {Navigate, useLocation} from "react-router-dom";


const UserRoutes = ({children}) => {
    
    if(!Cookies.get("TID")){
        return <Navigate to="/login-register" replace />
    }
    return children
};


export default UserRoutes;