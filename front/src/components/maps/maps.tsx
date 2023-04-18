import React , {useState, useCallback, useEffect} from 'react'
import { GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { useMaps } from '@/context/mapsContext';
import { useSearch } from '@/context/searchContext';


 function Maps() {
  const [mapMarkers, setMapMarkers] = useState<any>()
    // context
    const {map, setMap, userGeolocation, getUserGeolocation} = useMaps()
    const { search, placeResult, activityMode, itineraireResult} = useSearch()


    //map Style
    const containerStyle = {
        width: '100%',
        height: '700px',
    };

    //chargement de de google map
    const onLoad = useCallback(function callback(map:any) {
      const bounds = new window.google.maps.LatLngBounds(userGeolocation);
      map.fitBounds(bounds);
      setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map:any) {
      setMap(null)
    }, [])

    useEffect(()=>{
      if(placeResult){
        setMarkers(placeResult)
      }
    },[search,placeResult, itineraireResult])

    function setMarkers(places:any) {
      setMapMarkers([]);
      const bounds = new google.maps.LatLngBounds();
        let markers = places.map(place => {
        let location = place.geometry.location;
        bounds.extend(location);
        let infoWindow = new google.maps.InfoWindow({
          content: place.name
        });

        return <Marker key={place.id} position={location} />;
      });
      setMapMarkers(markers);
      map?.fitBounds(bounds);
    }

  return  (
    <div className="mt-2 mb-2">
        <GoogleMap
        mapContainerClassName={'border rounded-lg'}
        mapContainerStyle={containerStyle}
        center={userGeolocation}
        zoom={8}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
            streetViewControl: false,
            mapTypeControl:false,
            fullscreenControl:false,
        }}
        >
             { (activityMode == 0 || activityMode == 2) ? mapMarkers : itineraireResult && <DirectionsRenderer directions={itineraireResult}/>}

        </GoogleMap>
    </div>
)
}

export default React.memo(Maps)
