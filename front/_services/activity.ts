import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default class ActivityServices {
	
	createActivity(form: any){
		return axios.post(baseURL + "/activities", form);
	}
	
	getAllActivities() {
		return axios.get(baseURL + "/activities");
	}
	
	getActivityById(id: string) {
		return axios.get(baseURL + "/activities/" + id);
	}
	
	updateActivity(id: string, form: any) {
		return axios.patch(baseURL + "/activities/" + id, form);
	}
	
	deleteActivity(id: string) {
		return axios.delete(baseURL + "/activities/" + id);
	}
	
}
