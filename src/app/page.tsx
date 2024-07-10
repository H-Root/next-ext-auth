import { ModeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import AuthModal from "@/components/auth/AuthModal";
import SignOut from "@/components/auth/SignOut";
import FetchProducts from "@/components/pages/home/FetchProducts";
import { auth } from "@/lib/helper/auth";

export default async function Home() {
	const session = await getServerSession(authOptions);
	const data = await auth();

	console.log(session, "session on server");
	console.log(data, "session on server helper");

	return (
		<main className="container mt-10 flex flex-col gap-5">
			<div className="flex items-center gap-5 justify-between">
				<Button className="w-fit">
					Hello {data ? data.user.name : "World"}... Again!
				</Button>
				<ModeToggle />
			</div>
			{session ? <SignOut /> : <AuthModal />}
			<FetchProducts />
		</main>
	);
}
