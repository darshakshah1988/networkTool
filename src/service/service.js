import axios from "axios";
import { API_URL } from "src/API_URL";

export const login = async (payload) =>{
    try {
        const response = await axios.post(`${API_URL}/login`, payload);
        return response;
    } catch (error) {
        return error.response.data.message;
    }
}
export const register = async (payload) =>{
    try {
        const response = await axios.post(`${API_URL}/register`, payload);
        return response;
    } catch (error) {
        return error.response.data.message;
    }
}
export const getCurrentUser = async () =>{
    try {
        const response = await axios.get(`${API_URL}/me`);
        return response;
    } catch (error) {
        return error.response.data.message;
    }
}
export const logout = async () =>{
    try {
        const response = await axios.get(`${API_URL}/logout`);
        return response;
    } catch (error) {
        return error.response.data.message;
    }
}