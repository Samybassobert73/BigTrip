import React from 'react'
import { AiFillCar, AiFillPlusCircle } from 'react-icons/ai';
import Image from 'next/image';
import { useSearch } from '@/context/searchContext';
import { MdDirectionsBike } from 'react-icons/md';
import { FaTrain, FaWalking } from 'react-icons/fa';
type props = {
	directions: any;
}
export default function CardDirection({directions} :props) {

    const {travelMode, search} = useSearch()

console.log(directions)
  return (
    <div className='w-full mb-8 p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
         <div className='flex justify-between my-8'>
            <div className='font-bold px-4'> {directions?.steps[0].transit?.line.agencies[0].name}</div>
            <div className='text-gray-500'>
                <div>{directions?.duration.text}</div>
                <div> {directions?.distance.text}</div>
            </div>
        </div>

        <div className='grid grid-cols-3 text-center my-14 gap-4'>
            <div>
                {/* <span className='text-xl font-bold'>{direction?.routes[0].legs[0].departure_time?.text} </span> */}
                <span className='text-gray-500'>{directions?.start_address}</span>
            </div>
            <div className=' text-3xl flex justify-center items-center'>
                <div className='relative'>
                    <div className="absolute -top-1 left-0 rounded-full h-[10px] w-[10px] bg-[#000]"></div>
                    <div className="h-[2px] w-[50px] bg-[#000]"></div>
                </div>
                <div className='px-4'>
                    { travelMode == 'DRIVING' &&  <AiFillCar/>}
                    { travelMode == 'BICYCLING' &&  <MdDirectionsBike/>}
                    { travelMode == 'TRANSIT' &&  <FaTrain/>}
                    { travelMode == 'WALKING' &&  <FaWalking/>}
                </div>
                <div className='relative'>
                    <div className="h-[2px] w-[50px] bg-[#000]"></div>
                    <div className="absolute -top-1 right-0  rounded-full h-[10px] w-[10px] bg-[#000]"></div>
                </div>
            </div>
            <div>
                {/* <span className='text-xl font-bold'>{direction?.routes[0].legs[0].arrival_time?.text} </span> */}
                <span className='text-gray-500'>{directions?.end_address}</span>
            </div>
        </div>



        <a href="#" className="flex justify-center items-center w-full py-2 mt-auto px-4 bg-primary text-white rounded-xl hover:bg-hover-primary focus:outline-none focus:bg-hover-primary ease-in-out duration-500 hover:scale-105">
            Ajouter au trip
            <AiFillPlusCircle className="ml-2"/>
        </a>
    </div>
  )
}
