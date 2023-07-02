import axios from "axios";


const API_AUTH    = "https://thehworld-v1.onrender.com"
const API_TESTING = "https://thehworld-v1.onrender.com/api/web";
const API_SAUTH = "https://localhost:8080";
const API_STAGING = "https://localhost:8080/api/web";


const API_USE = API_STAGING;
const API_AUTH_USE = API_SAUTH;


// User Authendication *************************************************************

export const userIsLoggedin = () => {
    axios.get(`${API_AUTH_USE}/check/user`,{ withCredentials: true }).then((res) => {
        console.log("User Details - ", res);
    }).catch((err) => {
        console.log(err);
    });
}


// **********************************************************************************


export const getAllCategories = () => {
    return axios.get(`${API_USE}/get/all/categories`)
        .then((res) => {
            console.log("Category - ", res);
            return res.data.category;
        }).catch((err) => {
            console.log(err);
        });
}


export const getAllProductsFromCategory = (cateId) => {
    return axios.get(`${API_USE}/get/all/products/category/${cateId}`)
        .then((res) => {
            return res.data.product
        }).catch((err) => {
            console.log("Error - ", err);
        });
}