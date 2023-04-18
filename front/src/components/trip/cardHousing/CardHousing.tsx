import React from 'react';
import bgHome from '@/assets/images/bg-home.jpg';
import Image from 'next/image';
import styles from './CardHousing.module.css';
import {AiFillPlusCircle} from 'react-icons/ai';

import StarRating from './StarRating';
type props = {
	place: any;
}
const CardHousing = ({place} :props) => {
	return (
		<>
			<div className="relative h-[340px]  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
				<a href="#">
					<Image src={place?.photos&& place.photos[0].getUrl() ? place?.photos[0].getUrl() : bgHome}
						className={`absolute w-full object-cover rounded-[7px] ${styles.imageCustom}`}
						layout="responsive"
						alt="Picture home page"
						width="2400"
						height="1080"
						placeholder="blur"
						blurDataURL={place?.photos && place.photos[0].getUrl() }
					/>
				</a>
				<div className={`${styles.contentCard} relative p-5`}>
					<div className="infoHousing flex flex-col mt-[55px]">
						<div >
							<h5 className="my-2 text-xl font-medium tracking-tight text-white">
								{place.name}
							</h5>
						</div>
						<div className="flex justify-between">
							<StarRating numStars={place.rating} />
						</div>
						<a href="#"
							className="flex justify-center items-center w-full py-2 mt-auto px-4 bg-primary text-white rounded-xl hover:bg-hover-primary focus:outline-none focus:bg-hover-primary ease-in-out duration-500 hover:scale-105">
							Ajouter au trip
							<AiFillPlusCircle className="ml-2"/>
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default CardHousing;
