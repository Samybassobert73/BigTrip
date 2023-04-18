import React,{ createContext, useContext, useEffect,  useState} from "react";
import { Marker } from '@react-google-maps/api';
const searchContext = React.createContext({} as searchContext );

export function useSearch(){
  return useContext(searchContext)
}

type props = {
  children: React.ReactNode
}

type searchContext = {
  search:any,
  setSearch:React.Dispatch<React.SetStateAction<any>>,
  searchActivity:(address:string|undefined,map:any, type:string)=>void,
  placeResult:any,
  searchRoute:(data:any, travelMode:any)=>google.maps.DirectionsResult
  activityMode: number,
  setActivityMode: React.Dispatch<React.SetStateAction<number>>,
  itineraireResult: any
  setItineraireResult: React.Dispatch<any>
  travelMode: string,
  setTravelMode: React.Dispatch<React.SetStateAction<string>>,
}

export function SearchProvider ({ children }:props){
    const [search, setSearch] = useState<any>(null)
    const [placeResult, setPlaceResult] = useState<any>()
    const [itineraireResult, setItineraireResult] = useState<any>(null)
    const [activityMode, setActivityMode] = useState<number>(0)
    const [travelMode, setTravelMode] = useState<string>("DRIVING")
    //function
    
    async function searchRoute(data:any, travelMode:any) {  
       
      if (travelMode == undefined){
          alert("choose a TravelMode")
          return
      }
      //mettre en form les waypoint pour les envoyer
      let wp = data.waypoints.map((wp:any, index:any)=>{
          if(index == 0 || index == data.waypoints.length - 1){ 
             return ;
          }
          else{
              return ({
                  location: wp.adresse,
                  stopover: true,
              })
          }
      })
      //enlever les waypoints undefined
      let filteredWp = wp.filter((item:any) => {
          return item != undefined
      })

      const DirectionsService = new google.maps.DirectionsService()
      const result = await DirectionsService.route({
              origin: data.waypoints[0]?.adresse,
              waypoints: filteredWp ,
              destination: data.waypoints[data.waypoints.length - 1]?.adresse,
              travelMode: travelMode
          })
      return result
    }

    async function searchActivity(address:string|undefined,map:any, type:string) {
      const geocoder = new google.maps.Geocoder();
      const {results} = await geocoder.geocode({ address }, (results, status) => {
        if (status === "OK") {         
          const location = results![0].geometry.location;
          return location
        } else {
          console.error(`Geocoding failed: ${status}`);
        }
      });    
      const request = {
        location: results[0].geometry.location,
        radius: 5000, // in meters, adjust as necessary
        type: type
      };
     
      const service = new google.maps.places.PlacesService(map); // replace `map` with your `GoogleMap` instance
      service.nearbySearch(request, (results, status) => {
        if (status === 'OK') {
          setPlaceResult(results);
        } else {
          alert("error : " + status)
          console.error(status);
        }
      });
    }


    return (
        // @ts-ignore
      <searchContext.Provider value={{travelMode, setTravelMode, search, setSearch, searchActivity, placeResult, searchRoute, activityMode, setActivityMode, itineraireResult, setItineraireResult,}}>
        {children}
      </searchContext.Provider>
    );
  };