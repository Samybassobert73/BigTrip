import React from 'react'
import { useSearch } from '@/context/searchContext'
import { useMaps } from '@/context/mapsContext'
import CardDirection from '../direction/CardDirection'
import { format, toDate } from 'date-fns'
export default function DirectionResult() {
    const {itineraireResult, search} = useSearch()
    console.log('ici',search.waypoints)
  return (
    <div className="contentHome containerResults flex flex-col">
        <span className="text-black text-[32px] font-semibold">Transport</span>
        <span>Retrouvez tous les transports à destination de {search.waypoints.map(wp => <span className='font-bold'>{wp.adresse}, </span>)} pour la dates du <span className='font-bold'>{format(toDate(search.date), 'MM/dd/yyyy')}</span> pour <span className='font-bold'>{search?.number} personne{search?.number > 1&& "s"}</span> </span>
        <div className="contentResults  mt-5 mb-5">   
        {itineraireResult?.routes[0].legs.map((leg) => {
                return(
                    <CardDirection directions={leg}/>
                )
            })
        }
        </div>
    </div>
  )
}
