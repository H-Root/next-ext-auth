"use client";

import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Register from "./Register";
import Login from "./Login";
import { Button } from "../ui/button";

export default function AuthModal() {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button onClick={() => setOpen(true)} className="cursor-pointer">
					Login
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Login/Signup to use full features</DialogTitle>
				</DialogHeader>
				<Tabs defaultValue="account" className="w-full">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="login">Login</TabsTrigger>
						<TabsTrigger value="register">Register</TabsTrigger>
					</TabsList>
					<TabsContent value="login">
						<Login />
					</TabsContent>
					<TabsContent value="register">
						<Register />
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
}
