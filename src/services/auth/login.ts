import { ENDPOINTS } from "@/lib/endpoint";
import { loginSchema } from "@/lib/schema/auth/login.schema";
import { z } from "zod";

export const login = (
	data: z.infer<typeof loginSchema>,
	sessionKey: string | null,
	xsrfToken: string | null
) => {
	const headers = new Headers({
		method: "POST",
		Cookie: `laravel_session=${sessionKey}`,
		"Content-Type": "application/json",
	});

	if (xsrfToken) {
		headers.append("X-XSRF-TOKEN", xsrfToken);
	}

	return fetch(ENDPOINTS.LOGIN, {
		headers,
		body: JSON.stringify({}),
	});
};
