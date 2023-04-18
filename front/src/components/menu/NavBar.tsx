import React from 'react';
import styles from './Navbar.module.css';
import {FaHome} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../assets/images/logo.png';
import {useSession} from 'next-auth/react';

const NavBar = () => {
	const {data: session} = useSession()
	return (
		<nav className={`${styles.customNav} px-2 sm:px-4 py-2.5`}>
			<div className="flex flex-wrap items-center justify-between">
				<div className="hidden w-full md:block md:w-auto" id="navbar-default">
					<ul className="flex flex-col
												 p-4 mt-4
												 md:flex-row
												 md:space-x-8
												 md:mt-0
												 md:text-sm
												 md:font-medium"
					>
						<li className="flex items-center">
							<FaHome className="mr-2 font text-lg text-white"/>
							<Link className="block py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0" href={'/'}>
								Accueil
							</Link>
						</li>
					</ul>
				</div>
				<Link href="/" className="mt-5 rounded-full flex items-center absolute left-1/2 -translate-x-1/2">
					<Image src={logo}
						   width="150"
						   height="150"
						   alt="logo home page"
					/>
				</Link>
				{!session || !localStorage.getItem('token') && (
					<div className="hidden sm:block">
						<Link href={'login'}>
							<button type="button" className="py-2.5
													 px-5
													 mr-2
													 mb-2
													 text-sm
													 border-2
													 border-white
													 font-medium
													 rounded-lg
													 hover:border-white
													 hover:border-2
													 hover:bg-white
													 hover:bg-transparent
													 hover:text-black
													 text-white
													 focus:outline-none
													 focus:z-10
													 focus:ring-4
													 focus:ring-gray-200
													 dark:focus:ring-gray-700
													 dark:text-gray-400
													 dark:hover:text-white
													 dark:hover:bg-gray-700">Connexion
							</button>
						</Link>
						<Link href={'register'}>
							<button type="button" className="text-black
													 bg-white
													 border-2
													 border-white
													 hover:bg-transparent
													 hover:border-2
													 hover:border-white
													 hover:text-white
													 focus:ring-4
													 focus:ring-blue-300
													 font-medium
													 rounded-lg
													 text-sm
													 px-5
													 py-2.5
													 mr-2
													 mb-2
													 dark:hover:bg-transparent
													 dark:hover:border-white
													 focus:outline-none
													 dark:focus:ring-blue-800">Inscription
							</button>
						</Link>
					</div>
				)}
				{session || localStorage.getItem('token') && (
					<Link href={'login'}>
						<button type="button" className="py-2.5
													 px-5
													 mr-2
													 mb-2
													 text-sm
													 border-2
													 border-white
													 font-medium
													 rounded-lg
													 hover:border-white
													 hover:border-2
													 hover:bg-white
													 hover:bg-transparent
													 hover:text-black
													 text-white
													 focus:outline-none
													 focus:z-10
													 focus:ring-4
													 focus:ring-gray-200
													 dark:focus:ring-gray-700
													 dark:text-gray-400
													 dark:hover:text-white
													 dark:hover:bg-gray-700
													 ease-in-out duration-500
													 ">Déconnexion
						</button>
					</Link>
				)}
				<button data-collapse-toggle="navbar-default" type="button"
						className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
						aria-controls="navbar-default" aria-expanded="false">
					<span className="sr-only">Open main menu</span>
					<svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
						 xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd"
							  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
							  clip-rule="evenodd"></path>
					</svg>
				</button>
			</div>
		</nav>
	);
};

export default NavBar;
