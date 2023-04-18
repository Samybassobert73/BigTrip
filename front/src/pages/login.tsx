import Image from 'next/image';
import React, {useEffect, useState} from 'react'
import Link from 'next/link';
import Head from 'next/head';
import {useRouter} from 'next/router';
import AuthServices from '../../_services/auth';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {useAuth} from '@/context/JWTAuthContext';
import {yupResolver} from '@hookform/resolvers/yup';
import OauthGoogle from '@/components/oauthGoogle';

const Login = () => {

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.required('L\'adresse email est obligatoire')
			.email('Adresse e-mail non valide'),
		password: Yup.string()
			.min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
	});

	const formOptions = {resolver: yupResolver(validationSchema)};
	const {register, handleSubmit, reset, formState} = useForm(formOptions);
	const {errors}: any = formState;

	const authServices = new AuthServices();
	const auth = useAuth()

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
		authServices.login(data).then(async (response: any) => {
			localStorage.setItem('token', response.data.token);
			if (response.request.status === 200) {
				reset({something: ''});
				auth.updateAccessToken(response.data.token)
				auth.updateRefreshToken(response.data.refreshToken)
				await router.push('/')
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
		}, 1000000);
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
			<div>
				{slides.map((slide, index) => (
					<div
						key={index}
						className={`h-full w-full absolute image transition-opacity duration-3000  ${index === currentIndex ? 'opacity-100' : 'opacity-0'
						}`}
					>
						<Image
							className="w-full h-full object-cover"
							src={slide.url}
							alt={`Slide ${index}`}
							width="1920"
							height="1080"
						/>
					</div>
				))}
			</div>
			<div className="max-h-screen z-10 relative">
				<div className="">
					<div className="flex items-center justify-center h-screen">
						<div className="w-4/5 lg:w-1/2 bg-white md:max-w-md lg:max-w-full md:mx-auto flex flex-col p-12 rounded-3xl">
							<div className="hidden md:block absolute top-3 left-3 mb-5">
								<Image src="/assets/Logo.png" width="260" height="200" alt="" className="mb-5"/>
							</div>
							<div className="">
								<h1 className="text-3xl font-BigShoulders font-medium mb-4">Se connecter</h1>
								<h2 className="text-lg font-Montserrat mb-4">Connectez-vous pour accéder à votre compte</h2>
								<form className="space-y-8 font-Montserrat" onSubmit={handleSubmit(onSubmit)}>
									<div className="">
										<label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
											Email
										</label>
										<input
											{...register('email')}
											value="user@epitech.eu"
											className={`form-control ${errors.email ? 'border-red' : ''} "appearance-none w-full text-gray-700 border border-gray-400 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-800"`}
											placeholder="Entrez votre email"
											type="text"
										/>
										<div className="text-red">{errors.email?.message}</div>
									</div>
									<div className="">
										<label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
											Mot de passe
										</label>
										<input
											value="password"
											{...register('password')}
											className={`form-control ${errors.password ? 'border-red' : ''} "appearance-none w-full text-gray-700 border border-gray-400 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-800"`}
											placeholder="Entrez votre mot de passe"
											type="password"
										/>
										<div className="text-red">{errors.password?.message}</div>
									</div>
									<div className="w-full flex justify-between">
										<label className="inline-flex items-center">
											<input type="checkbox" className="form-checkbox"/>
											<span className="ml-2">Se souvenir de moi</span>
										</label>
										<button className="text-red">Mot de passe oublié</button>
									</div>
									<div className="w-full">
										<button
											className=" w-full py-2 px-4 bg-primary text-white rounded-xl hover:bg-hover-primary focus:outline-none focus:bg-hover-primary ease-in-out duration-500 hover:scale-105"
										>
											Connexion
										</button>
									</div>
									<div className="">
										<div className="register-text">
											<div className="flex justify-center p-3 flex-col">
												<div className="m-auto">Vous n'avez pas de compte?
													<span className="text-red">
															<button className="ml-2"><Link
																href="/register">S'enregistrer </Link></button>
													</span>
												</div>
												<div className="mt-6 grid grid-cols-3 items-center text-gray-400">
													<hr className="border-gray-400"/>
													<p className="text-center text-sm">Ou connectez-vous avec</p>
													<hr className="border-gray-400"/>
												</div>
												<OauthGoogle/>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login
