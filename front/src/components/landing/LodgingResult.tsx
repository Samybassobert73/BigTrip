import React, { useEffect } from 'react'
import CardHousing from '../trip/cardHousing/CardHousing'
import { useSearch } from '@/context/searchContext'
import { useMaps } from '@/context/mapsContext'
export default function LodgingResult() {
  const {userAdress, map} = useMaps()
  const {placeResult,searchActivity, activityMode} = useSearch()
  useEffect(() => {
    searchActivity(userAdress ,map, "lodging") 
  }, [userAdress])

  
  return (
    <div className="contentHome containerResults">
        <span className="text-black text-[32px] font-semibold">{activityMode == 0 ?"Activité": "Logement"}</span>
        <div className="contentResults grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5 mb-5">
           {placeResult?.splice(0,8).map((place) => {
            return(
                <CardHousing place={place}/>
            )
           })} 
        </div>
    </div>
  )
}
