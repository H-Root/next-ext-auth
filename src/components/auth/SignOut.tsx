"use client";

import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

const SignOut = () => {
	return <Button onClick={() => signOut()}>Sign out</Button>;
};

export default SignOut;
