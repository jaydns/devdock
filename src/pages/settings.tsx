import { Input, Button } from "@nextui-org/react";
import Image from "next/image";

export default function Settings() {
	return (
		<div className="flex h-screen w-screen flex-col items-center gap-6 bg-white pt-4 dark:bg-black">
			<h1 className="text-xl font-bold">Connected Accounts</h1>
			<div className="flex flex-row items-center gap-2">
				<Image
					src="github-mark-white.svg"
					alt="GitHub Logo"
					width={30}
					height={30}
				></Image>
				<h1>GitHub Connected: RJ17313</h1>
			</div>
			<Input className="w-64" label="Git Global Email" size="sm"></Input>
			<Input className="w-64" label="Git Global Name" size="sm"></Input>
			<Button color="success" variant="bordered">
				Save Changes
			</Button>
		</div>
	);
}
