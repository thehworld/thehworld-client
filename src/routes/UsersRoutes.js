import {Navigate, useLocation} from "react-router-dom";


const UserRoutes = ({children}) => {
    const user = '';
    if(user){
        return <Navigate to="/login" state={{ from: location}} replace />
    }
    return children
};


export default UserRoutes;