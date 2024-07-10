"use client";
import React, { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { loginSchema } from "@/lib/schema/auth/login.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { clientLogin } from "@/services/auth/clientLogin";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";

export default function Login() {
	const [loading, setLoading] = useState<boolean>(false);

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleSubmit = (values: z.infer<typeof loginSchema>) => {
		setLoading(true);

		clientLogin(values)
			.then((res) => {
				const response = res;
				setLoading(false);
				if (response?.status == 200) {
					signIn("credentials", {
						email: values.email,
						password: values.password,
						redirect: true,
						callbackUrl: "/",
					});
				} else if (response?.status == 401) {
					// toast.error(response?.message, { theme: "colored" });
				}
			})
			.catch((err) => {
				setLoading(false);
			});
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Login</CardTitle>
				<CardDescription>Welcome back!</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-2"
					>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="email@you.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder="********" type="password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="mt-4">
							<Button className="w-full" disabled={loading}>
								{loading ? "Processing.." : "Register"}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
