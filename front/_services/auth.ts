import axios from 'axios';
import jwtDecode from "jwt-decode";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default class AuthServices {

    jwtDecode(token: string) {
        return jwtDecode(token)
    }
	login(user: { password: string; email: string }) {
    return axios.post(baseURL+"/auth", user)
  }
}
