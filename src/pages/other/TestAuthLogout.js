import axios from "axios";
import { useEffect, useState } from "react";



const TestAuthLogout = () => {
    
    const [user, setUser] = useState('');
    useEffect(() => {
        axios.get('https://thehworld-ecom-staging.onrender.com/auth/google/logout',{ withCredentials: true }).then((res) => {
            console.log("User Details - ", res);
        }).catch((err) => {
            console.log(err);
        });
    },[])
    return(
        <div>
            <h2>
                The User logout Details
            </h2>

        </div>
    )
}

export default TestAuthLogout;