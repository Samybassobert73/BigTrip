import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default class HousingServices {
	
	createHousing(form: any){
		return axios.post(baseURL + "/housings", form);
	}
	
	getAllHousing() {
		return axios.get(baseURL + "/housings");
	}
	
	getHousingById(id: string) {
		return axios.get(baseURL + "/housings/" + id);
	}
	
	updateHousing(id: string, form: any) {
		return axios.patch(baseURL + "/housings/" + id, form);
	}
	
	deleteHousing(id: string) {
		return axios.delete(baseURL + "/housings/" + id);
	}
	
}
