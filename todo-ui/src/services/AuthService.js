import axios from "axios";

const BASE_URL = "http://localhost:8080/api/auth";

export const registerAPICall = (registerObj) => {
    return axios.post(BASE_URL + '/register', registerObj);
}

export const loginAPICall = (usernameOrEmail, password) => {
    return axios.post(BASE_URL + '/login', {usernameOrEmail, password});
}

export const storeToken = (token) => localStorage.setItem("token", token);

export const getoken = () => localStorage.getItem("token");

export const saveLoggedUser = (username) => {
    sessionStorage.setItem("authenticatedUser", username);
}

export const isUserLoggedIn = () => {
    const username = sessionStorage.getItem("authenticatedUser");
    if (username != null ) {
        return true
    } else {
        return false
    }
}

export const getLoggedInUser = () => {
    const username = sessionStorage.getItem("authenticatedUser");
    return username;
}

export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}