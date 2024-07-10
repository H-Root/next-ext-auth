import { getCsrfCookies } from "@/services/auth/getCsrfCookie";
import { login } from "@/services/auth/login";
import NextAuth, { ISODateString, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Email and Password",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "Your Email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const res = await getCsrfCookies();

				const setCookieHeader = res.headers.get("set-cookie");
				// console.log("setCookieHeader", setCookieHeader)
				// you'll find your_site_session key in this console log

				const cookies = setCookieHeader?.split(", ");
				// console.log(cookies)
				let sessionKey = null;
				let xsrfToken = null;

				for (const cookie of cookies!) {
					if (cookie.startsWith("laravel_session=")) {
						sessionKey = cookie.split("=")[1];
					} else if (cookie.startsWith("XSRF-TOKEN=")) {
						xsrfToken = cookie.split("=")[1];
					}

					if (sessionKey && xsrfToken) {
						break;
					}
				}

				try {
					const response = await login(
						{
							email: credentials?.email || null,
							password: credentials?.password || null,
						},
						sessionKey,
						xsrfToken
					);

					if (response.ok) {
						const res = await response.json();
						return res.data;
					} else {
						console.log("HTTP error! Status:", response.status);
						// Handle non-successful response here, return an appropriate JSON response.
						return { error: "Authentication failed" };
					}
				} catch (error) {
					console.log("Error", error);
				}

				return null;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, trigger }) {
			if (trigger === "signIn" || trigger === "signUp") {
				token.token = user.token.split("|")[1];
				token.id = user.id;
			} else {
				// console.log("other case", token);
			}
			return token;
		},
		async session({ session, token }) {
			session.token = token.token as string;
			session.user = {
				email: token.email as string,
				 id: token.id as string,
				 name: token.name as string,
			};
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };