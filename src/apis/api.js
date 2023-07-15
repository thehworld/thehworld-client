import axios from "axios";


const API_AUTH = "https://thehworld-v1.onrender.com"
const API_TESTING = "https://thehworld-service-commerce.onrender.com/api/web";
const API_SAUTH = "http://localhost:8080";
const API_STAGING = "http://localhost:8080/api/web";


const API_USE = API_TESTING;
const API_AUTH_USE = API_SAUTH;


// ? User Details

export const getUserDetails = (userToken) => {
    return axios.get(`${API_USE}/user/data`, {
        headers: {
            token: userToken
        }
    }).then((res) => {
        return res
    }).catch((error) => {

    });
}

// ? User Cart

export const userCartAddRemove = (product, opt, token) => {
    return axios.post(`${API_USE}/user/add/cart`, { product, opt }, {
        headers: {
            token: token
        }
    }).then((res) => {
        return res
    }).catch((err) => {
        console.log("Error - ", err);
    });
}

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

// ???????????????????????????????????????????????

// ?? Order
export const userOrderProductFromCart = (data, token) => {
    return axios.post(`${API_USE}/create/order`, data, {
        headers: {
            token: token
        }
    }).then((res) => {
        return res
    }).catch((err) => {
        console.log("Error - ", err);
    });
}


// **********************************************************************************

// ?? Product

export const getAProductDetail = (productId) => {
    return axios(`${API_USE}/get/a/product/${productId}`).then((res) => {
        return res;
    }).catch((err) => {
        console.log("Error - ", err);
    });
}




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