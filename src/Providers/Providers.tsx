"use client";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster"
import React from "react";

const Providers = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<SessionProvider>{children}</SessionProvider>
			<Toaster />
		</ThemeProvider>
	);
};

export default Providers;
