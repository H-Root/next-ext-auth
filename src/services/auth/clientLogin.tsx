import { ENDPOINTS } from "@/lib/endpoint";
import { loginSchema } from "@/lib/schema/auth/login.schema";
import { z } from "zod";

export const clientLogin = (values: z.infer<typeof loginSchema>) => {
	const form = new FormData();
	form.set("email", values.email as string);
	form.set("password", values.password as string);

	return fetch(`${ENDPOINTS.LOGIN}`, {
		headers: {
			Accept: "application/json",
		},
		method: "POST",
		body: form,
	});
};
