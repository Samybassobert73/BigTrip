import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default class TravelServices {
	
	createTravel(form: any){
		return axios.post(baseURL + "/travel", form);
	}
	
	getAllTravel() {
		return axios.get(baseURL + "/travel");
	}
	
	getTravelById(id: string) {
		return axios.get(baseURL + "/travel/" + id);
	}
	
	updateTravel(id: string, form: any) {
		return axios.patch(baseURL + "/travel/" + id, form);
	}
	
	deleteTravel(id: string) {
		return axios.delete(baseURL + "/travel/" + id);
	}
	
}
