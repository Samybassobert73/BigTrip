import React, {useEffect, useState} from 'react';
import bgHome from '@/assets/images/bg-home.jpg';
import Image from 'next/image';

const RowTripDetails = (props: any) => {
	const trip = props.trip;

	function getLabelFromScore(score: number) {
		if (score >= 0 && score <= 3) {
			return 'Mauvais';
		} else if (score >= 4 && score <= 7) {
			return 'Moyen';
		} else if (score >= 8 && score <= 10) {
			return 'Top';
		} else {
			return 'Note invalide';
		}
	}

	useEffect(() => {
	}, []);

	return (
		<>
			{trip && trip.map((data: any) => (
				<div key={data.id}>
					<div className="flex content-stretch mt-5 w-full">
						<div className="flex items-center space-x-auto w-full">
							<Image className="w-[140px] h-[140px] rounded-xl"
								   alt={'image activity'}
								   src={data?.photo}
								   width="2400"
								   height="1080"
								   blurDataURL={data?.photo}
							/>
							<div className="pl-3">
								<div className="text-neutral-900 font-medium">
									{data.name}
								</div>
								<div className="mt-5 text-neutral-900 font-semibold leading-tight">
									$240/night
								</div>
							</div>
						</div>
						<div className="w-40 flex-col justify-center flex pt-4 pb-3 px-4 rounded-xl bg-emerald-200">
							<div className="flex justify-center text-neutral-900 font-bold text-3xl">
								{data.rating}
							</div>
							{/*<div className="flex justify-center text-neutral-900 font-bold text-3xl">*/}
							{/*	*******/}
							{/*</div>*/}
							<div className="flex justify-center flex-col">
								<div className="flex justify-center text-neutral-900 font-bold text-3xl">
									{getLabelFromScore(data.rating)}
								</div>
							</div>
						</div>
					</div>
				</div>
			))
			}
		</>
	);
};

export default RowTripDetails;
