import NextAuth, {NextAuthOptions} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			// @ts-ignore
			clientId: process.env.GOOGLE_ID,
			// @ts-ignore
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],
	theme: {
		colorScheme: 'light',
	},
	callbacks: {
		async jwt({token}) {
			token.userRole = 'admin'
			return token
		},
	},
}

export default NextAuth(authOptions)
