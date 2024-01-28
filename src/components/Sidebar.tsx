import {
	Cog6ToothIcon,
	FolderIcon,
	WrenchIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import Icon from "./Icon";

export default function Sidebar() {
	const router = useRouter();
	return (
		<div className="flex w-64 flex-col justify-between border-r-black bg-transparent bg-fixed p-2">
			<div className="flex flex-col gap-2">
				<Link href="/">
					<Icon
						active={router.pathname == "/"}
						icon={<FolderIcon className="h-5 w-5 stroke-primary" />}
					>
						Projects
					</Icon>
				</Link>
				<Link href="/download">
					<Icon
						active={router.pathname == "/download"}
						icon={<WrenchIcon className="h-5 w-5 stroke-primary" />}
					>
						Tools
					</Icon>
				</Link>
				{/* <Link href="/generate">
					<Icon
						active={router.pathname == "/generate"}
						icon={<SparklesIcon className="h-5 w-5 stroke-primary" />}
					>
						Generate
					</Icon>
				</Link> */}
			</div>
			<div className="">
				<Link href="/settings">
					<Icon
						active={router.pathname == "/settings"}
						icon={<Cog6ToothIcon className="h-5 w-5 stroke-primary" />}
					>
						Settings
					</Icon>
				</Link>
			</div>
		</div>
	);
}
