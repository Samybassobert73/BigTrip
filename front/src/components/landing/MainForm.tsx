import React, {useState, useEffect} from 'react'
import styles from '../input/InputCustom.module.css';
//react hook form
import {useForm, useFieldArray, Controller} from 'react-hook-form';
//yup schema
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
//google maps
import {Autocomplete} from '@react-google-maps/api';
//icon
import {FaMapMarkerAlt} from 'react-icons/fa'
//context
import {useMaps} from '@/context/mapsContext';
import {useSearch} from '@/context/searchContext'
//components
import InputComponent from '../input/InputCustom'
import SelectComponent from '../input/SelectCustom'
//data
import activities from '@/data/googlePlaces';
import {min} from 'date-fns';
//schema yup verification du formulaire
const schema = yup.object({
	waypoints: yup.array().of(
		yup.object().shape({
			adresse: yup.string().required().min(3)
		})
	),
	date: yup.date().required(),
	number: yup.number().required().min(1),
	type: yup.string()
});
type FormData = yup.InferType<typeof schema>;
export default function MainForm() {
	// context
	const {map, scrollRef, userAdress} = useMaps()
	const {setSearch, searchRoute, setItineraireResult, activityMode, searchActivity, travelMode} = useSearch()
	const defautDate = new Date();
	const date = defautDate.setDate(defautDate.getDate());
	const defaultValue = new Date(date).toISOString().split('T')[0] // yyyy-mm-dd
	//react hook form
	const {control, register, handleSubmit, formState: {errors, isSubmitting, isValid}} = useForm<FormData>({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues: {
			waypoints: [{adresse: userAdress}]
		}
	});

	//react hook form dynamic fields
	const {fields, append, prepend, remove, swap, move, insert} = useFieldArray({
		control, // control props comes from useForm (optional: if you are using FormContext)
		name: 'waypoints', // unique name for your Field Array
	});


	const onSubmit = async (data: FormData) => {
		setSearch(data)
		executeScroll(scrollRef);
		let destination = data?.waypoints?.slice(-1)[0].adresse
		if (activityMode == 0) {
			await searchActivity(destination, map, data.type)
		} else if (activityMode == 2) {
			await searchActivity(destination, map, 'lodging')
		} else {
			await searchRoute(data, travelMode).then((result) => {
				setItineraireResult(result);
			}).catch((err) => {
				alert(err)
			})
		}

	}

	const executeScroll = (scrollRef) => scrollRef.current.scrollIntoView({behavior: 'smooth'})

	return (

		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
			<div className="flex items-center">
				{/* waypoints */}
				<div className="flex grow basis-1/2">
					{fields.map((field, index) => (
						< >
							<Controller render={({
											 field: {onChange, value, name,},
											 fieldState: {invalid, isTouched, isDirty, error},
										 }) => (

									<InputComponent
										value={value}
										onValueChange={onChange}
										typeInput="text"
										labelName="Destination"
										placeholder=""
										error={error}
									/>
								)}
								name={`waypoints.${index}.adresse`}
								control={control}
							/>
							{index != 0 &&
                                <span
                                    className="flex px-3 py-2 cursor-pointer self-end items-center w-fit bg-green-200 border rounded-lg"
                                    onClick={() => {
										remove(field.id)
									}}>
                                            -
                                        </span>
							}

						</>
					))}
				</div>

				<>

                        <span
							className="flex basis-1/8 px-3 cursor-pointer py-2 mx-2 self-end items-center w-fit h-fit bg-green-200 border rounded-lg"
							onClick={() => {
								append({adresse: ''})
							}}>
                        +
                        </span>
				</>


				{/* date */}
				<div className="basis-1/4">
					<Controller
						render={({
									 field: {onChange, value, name,},
									 fieldState: {invalid, isTouched, isDirty, error},
								 }) => (
							<InputComponent
								value={value ? value : defaultValue}
								onValueChange={onChange}
								typeInput="date"
								labelName={name}
								placeholder=""
								error={error}/>
						)}
						name="date"
						control={control}
					/>
				</div>
				{/* number */}
				<div className="basis-1/4">
					<Controller
						render={({
									 field: {onChange, value, name,},
									 fieldState: {invalid, isTouched, isDirty, error},
								 }) => (
							<InputComponent
								value={value ? value : 1}
								onValueChange={onChange}
								typeInput="number"
								labelName={name}
								placeholder=""
								error={error}/>
						)}
						name="number"
						control={control}
					/>
				</div>
				{/* type */}
				{activityMode == 0 &&
                    <div className="basis-1/4">
                        <Controller
                            render={({
										 field: {onChange, value, name,},
										 fieldState: {invalid, isTouched, isDirty, error},
									 }) => (
								<SelectComponent
									value={value}
									onChange={onChange}
									data={activities}
									labelName={name}

									error={error}/>
							)}
                            name="type"
                            control={control}
                        />
                    </div>
				}
			</div>
			<div className=" mt-4 grid justify-items-end">
				{/* submit */}
				<button
					type="submit"
					className={` flex px-3 py-2 items-center w-fit ${isValid ? 'bg-green-200' : 'bg-gray-200'} border rounded-lg`}
				>
					<FaMapMarkerAlt className="text-black mr-2"/>
					Voir les destinations
				</button>
			</div>
		</form>

	)
}
