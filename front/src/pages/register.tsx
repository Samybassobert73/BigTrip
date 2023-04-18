import Image from 'next/image';
import Link from 'next/link';
import React, {useEffect, useState} from 'react'
import Head from 'next/head';
import {useRouter} from 'next/router';
import UserServices from '../../_services/user';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Register = () => {

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.required('L\'adresse email est obligatoire')
			.email('Adresse e-mail non valide'),
		phone: Yup.string()
			.required('Le numéro de téléphone est obligatoire')
			.min(10, 'Numéro de téléhpone non valide'),
		password: Yup.string()
			.min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
		firstname: Yup.string()
			.required('Le prénom est obligatoire'),
		lastname: Yup.string()
			.required('Le nom est obligatoire')
	});

	const formOptions = {resolver: yupResolver(validationSchema)};
	const {register, handleSubmit, reset, formState} = useForm(formOptions);
	const {errors}: any = formState;

	const userServices = new UserServices();

	const slides = [
		{
			url: '/assets/Trip_Photo.jpg',
		},
		{
			url: '/assets/Trip_Photo2.jpg',
		},
		{
			url: '/assets/Trip_Photo3.jpg',
		},
	];

	const router = useRouter();

	const onSubmit = async (data: any) => {
		userServices.createUser(data).then(async (response) => {
			if (response.request.status === 201) {
				reset({something: ''});
				await router.push('/login')
			}
		}).catch(error => {
			console.log(error.response.data['hydra:description'])
		});
	}

	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex === slides.length - 1 ? 0 : prevIndex + 1
			);
		}, 2300);
		return () => clearInterval(intervalId);
	}, []);

	return (
		<>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Text:wght@100;200;300;400;500;600;700;800;900&display=swap"
					rel="stylesheet"/>
				<link
					href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Text:wght@100;200;300;400;500;600;700;800;900&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
					rel="stylesheet"/>
			</Head>
			<div className="bg-white max-h-screen">
				<div className="container mx-auto">
					<div className="flex w-full">
						<div className="w-1/2">
							{slides.map((slide, index) => (
								<div
									key={index}
									className={`absolute top-0 left-0 w-1/2 h-1/2 transition-opacity duration-1000 m-7 ml-32 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
									}`}
								>
									<Image
										className="w-3/5 rounded-3xl"
										src={slide.url}
										alt={`Slide ${index}`}
										width="1920"
										height="1080"
									/>
								</div>
							))}
						</div>
						<div className="w-full lg:w-1/2">
							<div>
								<Image src="/assets/Logo.png" width="200" height="140" alt=""/>
							</div>
							<div>
								<h2 className="text-3xl font-BigShoulders font-bold mb-4">Enregistrement</h2>
								<p className="font-Montserrat mb-5">Enregistrez-vous pour pouvoir accéder à votre compte</p>
							</div>
							<form className="font-Montserrat" onSubmit={handleSubmit(onSubmit)}>
								<div className="grid grid-cols-2 gap-6">
									<div>
										<label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Prénom</label>
										<input
											{...register('firstname')}
											className={`form-control ${errors.firstname ? 'border-red' : ''} "appearance-none w-full text-gray-700 border border-gray-400 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-800"`}
											placeholder="Entrez votre prénom"
											type="text"
										/>
										<div className="text-red">{errors.firstname?.message}</div>
									</div>
									<div>
										<label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Nom de
											famille</label>
										<input
											{...register('lastname')}
											className={`form-control ${errors.lastname ? 'border-red' : ''} "appearance-none w-full text-gray-700 border border-gray-400 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-800"`}
											type="text"
											placeholder="Entrez votre nom de famille"
										/>
										<div className="text-red">{errors.lastname?.message}</div>
									</div>
								</div>
								<div className="grid grid-cols-2 gap-6 mt-3">
									<div>
										<label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Email</label>
										<input
											{...register('email')}
											className={`form-control ${errors.email ? 'border-red' : ''} "appearance-none w-full text-gray-700 border border-gray-400 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-800"`}
											type="text"
											placeholder="Renseignez votre email"
										/>
										<div className="text-red">{errors.email?.message}</div>
									</div>
									<div>
										<label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Tel</label>
										<input
											{...register('phone')}
											className={`form-control ${errors.phone ? 'border-red' : ''} "appearance-none w-full text-gray-700 border border-gray-400 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-800"`}
											type="text"
											placeholder="Entrez votre téléphone"
										/>
										<div className="text-red">{errors.phone?.message}</div>
									</div>
								</div>
								<div className="mt-3">
									<label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Mot de passe</label>
									<input
										{...register('password')}
										className={`form-control ${errors.password ? 'border-red' : ''} "appearance-none w-full text-gray-700 border border-gray-400 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-800"`}
										type="text"
										placeholder="Entrez votre mot de passe"
									/>
									<div className="text-red">{errors.password?.message}</div>
								</div>
								<label className="inline-flex items-center mt-4 mb-4">
									<input type="checkbox" className="form-checkbox"/>
									<span className="ml-2">J'accepte les conditions générales de vente</span>
								</label>
								<div className="w-full">
									<button
										className=" w-full py-2 px-4 bg-primary text-white rounded-xl hover:bg-hover-primary focus:outline-none focus:bg-hover-primary ease-in-out duration-500 hover:scale-105">
										Inscription
									</button>
								</div>
								<div className="m-4">
									<div className="register-text">
										<div className="flex justify-center p-3 flex-col">
											<div className="m-auto">Vous avez déjà un compte?
												<span className="text-red">
                                                    <button className="ml-2">
														<Link href="/login">Connectez-vous</Link>
													</button>
                                                </span>
											</div>
											<div className="mt-6 grid grid-cols-3 items-center text-gray-400">
												<hr className="border-gray-400"/>
												<p className="text-center text-sm">Ou connectez-vous avec</p>
												<hr className="border-gray-400"/>
											</div>
											<button
												className="bg-white border-2 py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-primary text-[#002D74]">
												<svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
													<path fill="#FFC107"
																d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
													<path fill="#FF3D00"
																d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
													<path fill="#4CAF50"
																d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
													<path fill="#1976D2"
																d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
												</svg>
												Google
											</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Register
