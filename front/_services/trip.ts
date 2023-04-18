import { IAddTrip } from '@/components/form/MultistepForm';
import apiClient from '@/middleware/refreshAccessTokenAxiosInstance';

export default class TripServices {
	
	createTrip(form:IAddTrip ){
		return apiClient.post("/trips", form);
	}

	getAllTrip() {
		return apiClient.get('/trips');
	}

	async getTripById(id: any){
		return await apiClient.get('/trips/' + id);
	}

	updateTrip(id: string, form: any) {
		return apiClient.patch('/trips/' + id, form);
	}

	deleteTrip(id: string) {
		return apiClient.delete('/trips/' + id);
	}

}
