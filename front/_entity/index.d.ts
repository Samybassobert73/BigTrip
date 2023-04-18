declare module 'AppTypes' {
	export interface User {
		firstname: string
		lastname: string;
		email: string;
		phone: string;
		password: string;
	}
	
	export interface Activity {
		url: string;
		startAt: Date;
		endAt: Date;
		lattitude: number;
		longitude: number;
		trip: Trip;
	}
	
	export interface Housing {
		url: string;
		startAt: Date;
		endAt: Date;
		lattitude: number;
		longitude: number;
		trip: Trip;
	}
	
	export interface Travel {
		url: string;
		startAt: Date;
		endAt: Date;
		lattitude: number;
		longitude: number;
		trip: Trip;
	}
	
	export interface PayementKind {
		name: String;
		type: String;
	}
	
	export interface Trip {
		name: string;
		startAt: Date;
		endAt: Date;
		user: User;
		tripHousing: Array<Housing>;
		tripTravel: Array<Travel>;
		tripActivity: Array<Activity>;
	}
	
}
