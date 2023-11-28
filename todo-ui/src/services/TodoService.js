import axios from "axios";
import {getToken} from "./AuthService";

const BASE_URL = "http://localhost:8080/api/todos";

axios.interceptors.request.use(function(config) {
    config.headers['Authorization'] = getToken();
    return config;
}, function (error) {
    return Promise.reject(error);
})

export const getAllTodos = () => {
    return axios.get(BASE_URL);
} 

export const saveTodo = (todo) => {
    return axios.post(BASE_URL, todo);
}

export const getTodo = (id) => { return axios.get(BASE_URL + '/' + id) }

export const updateTodo = (id, todo) => {
    return axios.put(BASE_URL + '/' + id, todo)
}

export const deleteTodo = (id) => { return axios.delete(BASE_URL + '/' + id) }

export const completeTodo = (id) => { return axios.patch(BASE_URL + '/' + id + '/complete') }

export const uncompleteTodo = (id) => { return axios.patch(BASE_URL + '/' + id + '/uncomplete') }