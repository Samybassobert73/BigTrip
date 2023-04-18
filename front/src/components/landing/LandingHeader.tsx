import React , { useRef }from 'react';
import styles from './LandingHeader.module.css';
import {FaMapMarkerAlt} from 'react-icons/fa';
import TabsActivity from './TabsActivity';
import TabsTransport from './TabsTransport';
import MainForm from './MainForm'
import {useMaps} from '@/context/mapsContext'
import {useSearch} from '@/context/searchContext'

const LandingHeader = () => {
	const {userAdress} = useMaps()
	const {activityMode} = useSearch()

	return (
		<>
			<div className={styles.containerSearch}>
				<div className="flex justify-between">
					<div className="flex">
						<FaMapMarkerAlt className="text-xl text-black mr-2"/>
						<span className="text-black">Destination</span>
					</div>
					<span>Votre adresse : {userAdress}</span>
				</div>
				<MainForm/>
			</div>
			<TabsActivity/>
			{activityMode == 1 && <TabsTransport/>}
		</>
	);
};

export default LandingHeader;
