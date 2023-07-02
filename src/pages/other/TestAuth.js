import axios from "axios";
import { useEffect, useState } from "react";



const TestAuth = () => {
    
    const [user, setUser] = useState('');
    useEffect(() => {
        axios.get('https://thehworld-ecom-staging.onrender.com/check/user',{ withCredentials: true }).then((res) => {
            console.log("User Details - ", res);
        }).catch((err) => {
            console.log(err);
        });
    },[])
    return(
        <div>
            <h2>
                The User Login Details
            </h2>

        </div>
    )
}

export default TestAuth;