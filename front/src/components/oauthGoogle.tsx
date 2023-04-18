import Link from 'next/link'
import {signIn, signOut, useSession} from 'next-auth/react'
import styles from './header.module.css'
import React from 'react';

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function OauthGoogle() {
	const {data: session, status} = useSession()
	const loading = status === 'loading'

	return (
		<header>
			<noscript>
				<style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
			</noscript>
			<div className={styles.signedInStatus}>
				<p>
					{!session && (
						<>
							<a href={`/api/auth/signin`}
							   onClick={(e) => {
								   e.preventDefault()
								   signIn()
							   }}
							   className="bg-white border-2 py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 hover:bg-primary text-[#002D74]">
								<svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
									 width="25px">
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
							</a>
						</>
					)}
					{session?.user && (
						<>
							{session.user.image && (
								<span
									style={{backgroundImage: `url('${session.user.image}')`}}
									className={styles.avatar}
								/>
							)}
							<span className={styles.signedInText}>
                <small>Connecté avec</small>
                <br/>
                <strong className={styles.signedInText}>{session.user.email ?? session.user.name}</strong>
              </span>
							<a
								href={`/api/auth/signout`}
								className={styles.button}
								onClick={(e) => {
									e.preventDefault()
									signOut()
								}}
							>
								Se déconnecter
							</a>
						</>
					)}
				</p>
			</div>
		</header>
	)
}
