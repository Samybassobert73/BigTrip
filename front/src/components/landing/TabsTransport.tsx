import React, {useState} from 'react'
import {AiFillCar} from 'react-icons/ai';
import {MdDirectionsBike} from 'react-icons/md';
import {FaTrain, FaWalking} from 'react-icons/fa'
import {useSearch} from '@/context/searchContext';
import styles from './LandingHeader.module.css';

type props = {}
export default function TabsTransport(props: props) {

	const {travelMode, setTravelMode} = useSearch()

	const travelModeList = [
		{
			mode: 'DRIVING',
			label: 'Voiture'
		},
		{
			mode: 'BICYCLING',
			label: 'Vélo'
		},
		{
			mode: 'TRANSIT',
			label: 'Transport en commun'
		},
		{
			mode: 'WALKING',
			label: 'Marche'
		},
	]

	function handleClick(mode: string) {
		setTravelMode(mode)
	}

	return (
		<>
			<span className="text-black text-[32px] font-semibold">Type de transport</span>
			<div className={`${styles.containerTabNav} styles.containerTabNav cursor-pointer`}>

				{travelModeList.map((item, index) => {
					return (
						<>
							<div onClick={() => {
								handleClick(item.mode)
							}} className={`${item.mode === travelMode && 'border-b-2 border-green-400'}`}>
								{item.label}
							</div>
							{
								index != (travelModeList.length - 1) &&
                                <div className="h-[30px] w-[1px] bg-[#D7E2EE]"></div>
							}
						</>
					)
				})}
			</div>
		</>
	)
}
