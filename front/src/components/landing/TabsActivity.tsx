import React from 'react'
import styles from './LandingHeader.module.css';
import {useSearch} from '@/context/searchContext';
import {useMaps} from '@/context/mapsContext';

export default function TabsActivity() {

	const {map} = useMaps()
	const {
		activityMode,
		setItineraireResult,
		setActivityMode,
		search,
		travelMode,
		searchActivity,
		searchRoute
	} = useSearch()

	const activityList = [
		{
			label: 'Activity',
			labelFr: 'Activités'
		},
		{
			label: 'Transport',
			labelFr: 'Transports'
		},
		{
			label: 'Logement',
			labelFr: 'Logements'
		},
	]

	function handleClick(mode: number) {
		setActivityMode(mode)
		if (mode == 0) {
			searchActivity(search?.waypoints[0].adresse, map, search.type)
		} else if (mode == 2) {
			searchActivity(search?.waypoints[0].adresse, map, 'lodging')
		} else {
			// @ts-ignore
			searchRoute(search, travelMode).then((result) => {
				setItineraireResult(result);
			}).catch((err: string) => {
				alert(err)
			})
		}
	}

	return (
		<div className={`${styles.containerTabNav} styles.containerTabNav cursor-pointer`}>
			{activityList.map((activity, index) => {
				return (
					<>
						<div onClick={() => {
							handleClick(index)
						}} className={`${index === activityMode && 'border-b-2 border-green-400'}`}>
							{activity.labelFr}
						</div>
						{
							index != 2 && <div className="h-[30px] w-[1px] bg-[#D7E2EE]"></div>
						}
					</>
				)
			})}
		</div>
	)
}
