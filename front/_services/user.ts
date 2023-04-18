import axios from 'axios';
import apiClient from "@/middleware/refreshAccessTokenAxiosInstance";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default class UserServices {

    // @ts-ignore
    headers = {
        'Content-Type': 'application/json',
        'Bearer': localStorage.getItem('token')
    }
    createUser(form: any){
        return axios.post(baseURL + "/users", form);
    }

    getAllUsers() {
        return axios.get(baseURL + "/users");
    }

    getUserById(id: number) {
        return axios.get(baseURL + "/users/" + id);
    }

    updateUser(id: string, form: any) {
        return apiClient.put(baseURL + "/users/" + id, form);
    }

    deleteUser(id: string) {
        return axios.delete(baseURL + "/users/" + id);
    }
    
}
