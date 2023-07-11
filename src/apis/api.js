import axios from "axios";


const API_AUTH = "https://thehworld-v1.onrender.com"
const API_TESTING = "https://thehworld-v1.onrender.com/api/web";
const API_SAUTH = "http://localhost:8080";
const API_STAGING = "http://localhost:8080/api/web";


const API_USE = API_STAGING;
const API_AUTH_USE = API_SAUTH;



// ? User Auth


export const userSignup = (user) => {
    return axios.post(`${API_USE}/user/auth/google`, { user }).then((res) => {
        if (res)
            return res;
    }).catch((error) => {
        console.log("Error - ", error);
    })
}

export const userIsAuth = (token) => {
    return axios.get(`${API_USE}/user/data`, {
        headers: {
            token: token
        }
    }).then((res) => {
        return res
    }).catch((err) => {
        console.log(err);
    });
}


// ?

// User Authendication *************************************************************

export const userIsLoggedin = () => {
    axios.get(`${API_AUTH_USE}/check/user`, { withCredentials: true }).then((res) => {
        console.log("User Details - ", res);
    }).catch((err) => {
        console.log(err);
    });
}




// **********************************************************************************


export const getAllCategories = () => {
    return axios.get(`${API_USE}/get/all/categories`, { withCredentials: true })
        .then((res) => {
            console.log("Category - ", res);
            return res.data.category;
        }).catch((err) => {
            console.log(err);
        });
}


export const getAllProductsFromCategory = (cateId) => {
    return axios.get(`${API_USE}/get/all/products/category/${cateId}`, { withCredentials: true })
        .then((res) => {
            return res.data.product
        }).catch((err) => {
            console.log("Error - ", err);
        });
}