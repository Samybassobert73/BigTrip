import React ,{useState}from 'react'
import { AiFillCar } from 'react-icons/ai';
import { MdDirectionsBike } from 'react-icons/md';
import {FaTrain, FaWalking} from 'react-icons/fa'
import { useSearch } from '@/context/searchContext';
type props = {
  
}
export default function TravelMode(props:props) {
    
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const {travelMode , setTravelMode } = useSearch()

    const travelModeList = [
       {
        mode: google.maps.TravelMode.DRIVING,
        icon: <AiFillCar/>,
       },
       {
        mode: google.maps.TravelMode.BICYCLING,
        icon: <MdDirectionsBike/>,
       },
       {
        mode:google.maps.TravelMode.TRANSIT,
        icon: <FaTrain/>,
       },
       {
        mode:google.maps.TravelMode.WALKING,
        icon: <FaWalking/>,
       },  
    ]

    function handleClick(mode:string, index:number){
        setActiveIndex(index)
        setTravelMode(mode)
    }
    
  return (
    <div className='mb-4 flex '>
        {travelModeList.map((tm, index) => {
            return(
                <div onClick={()=>{ handleClick(tm.mode, index)}} className={`${index === activeIndex && 'text-green-500' } bg-white p-4 mx-2 w-fit rounded-full hover:text-green-500 drop-shadow-lg`}>
                    {tm.icon}
                </div>
            )
        })}
    </div>
  )
}