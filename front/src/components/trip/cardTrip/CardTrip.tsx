import React, {useEffect} from 'react';
import bgHome from '@/assets/images/bg-home.jpg';
import Image from 'next/image';
import styles from './CardTrip.module.css';
import {BiSearchAlt2} from 'react-icons/bi';
import {useRouter} from 'next/router';
import TripService from '../../../../_services/trip';
import Link from 'next/link';

const CardTrip = (props: any) => {
	const trip = props.trip;
	return (
		<>
			<div
				className="relative h-[200px] sm:h-[240px] md:h-[290px] lg:h-[450px] xl:h-[600px] 2xl:h-[700px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
				<a href="#">
					<Image src={trip?.photo}
						   className={`absolute w-full object-cover rounded-[7px] ${styles.imageCustom}`}
						   layout="responsive"
						   alt="Picture home page"
						   width="2400"
						   height="1080"
					/>
				</a>
				<div className={`${styles.contentCard} relative p-5`}>
					<div className="m-auto w-[60%] text-center">
						<div>
							<h5 className="text-[50px] tracking-tight text-white text-shadow font-bold mb-3">
								{trip.name}
							</h5>
							<p className="mb-3 text-sm text-white font-bold dark:text-white-200">Description du trip</p>
						</div>
						<div className="flex w-full justify-center">
							<Link href={`/trip/${trip.id}`}
								  className="w-full py-2 px-4 bg-primary text-white rounded-xl hover:bg-hover-primary focus:outline-none focus:bg-hover-primary ease-in-out duration-500 hover:scale-105">
								Voir le trip
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default CardTrip;
