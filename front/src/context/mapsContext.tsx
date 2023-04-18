import React,{ createContext, useContext,useEffect, useState} from "react";
import {  useJsApiLoader } from '@react-google-maps/api';

const mapsContext = React.createContext({} as mapsContext );

export function useMaps(){
  return useContext(mapsContext)
}

type props = {
  children: React.ReactNode
}

type mapsContext = {
  
  userGeolocation: {lat: number, lng:number},
  getUserGeolocation: () => void,
  scrollRef:any,
  setScrollRef:any,
  geolocationToAdress:(latitude:number,longitude:number,callback:(adress:string)=>void )=>void,
  userAdress:string,
  setUserAdress:React.Dispatch<React.SetStateAction<string>> ,
  map:any,
  setMap:any
}

type geolocation = {
  lat: number,
  lng: number
}

export function MapsProvider ({ children }:props){

    //user geolcation
    const [userGeolocation, setUserGeolocation] = useState<geolocation>( {lat: 48.856614 ,lng: 2.3522219} )
    //user Adress
    const [userAdress, setUserAdress] = useState<string>("paris") 
    //ref of the map
    const [scrollRef, setScrollRef] = useState()
    //instance of the map 
    const [map, setMap] = useState(null)

    //get the user geolocation
    function getUserGeolocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
           let userPosition = {
              lat: latitude,
              lng: longitude
            }
            setUserGeolocation(userPosition)
          });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }

    //transform geolocation(lat, lng) to adress string
    async function geolocationToAdress(latitude:number, longitude:number, callback:(adress:string)=>void) {
      const geocoder = new google.maps.Geocoder();
      const latlng =  new google.maps.LatLng(latitude, longitude);
      geocoder.geocode({ location: latlng }, function(results, status) {
        if (status === "OK" && results![0]) {
          callback(results![0].formatted_address);
        } else {
          console.warn("Geocode failed", status);   
        }
      });
    }

    //change user geolocation to adress when user geolocation change
    useEffect(()=>{
        geolocationToAdress(userGeolocation.lat, userGeolocation.lng, function(address:string){
          setUserAdress(address)
        })
    },[userGeolocation])
  
    return (
      <mapsContext.Provider value={{map, setMap, userGeolocation, getUserGeolocation, scrollRef, setScrollRef, geolocationToAdress, userAdress, setUserAdress }}>
        {children}
      </mapsContext.Provider>
    );
  };