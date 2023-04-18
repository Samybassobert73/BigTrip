import {AuthProvider} from '@/context/JWTAuthContext'
import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import React from 'react';
import {SessionProvider} from 'next-auth/react';
import type {Session} from 'next-auth'
import {MapsProvider} from '../context/mapsContext'
import {SearchProvider} from '../context/searchContext'
import {LoadScript} from '@react-google-maps/api'

export default function App({Component, pageProps: {session, ...pageProps}}: AppProps<{ session: Session }>) {
	return (
		<SessionProvider session={session}>
			<LoadScript googleMapsApiKey={''} libraries={['places']}>
				<AuthProvider>
					<SearchProvider>
						<MapsProvider>
							<Component {...pageProps} />
						</MapsProvider>
					</SearchProvider>
				</AuthProvider>
			</LoadScript>
		</SessionProvider>
	)
}
