import { JWT, Session, User } from "next-auth/next"

declare module "next-auth" {
  interface Session {
    token: string
    user: {
      id: string;
			email: string;
			name: string;
    }
  }
  interface User {
    token: string
		id: string;
		email: string;
		name: string;
  }
}
