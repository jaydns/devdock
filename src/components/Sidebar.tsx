import {
	FolderIcon,
	WrenchIcon,
	SparklesIcon,
	Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import ActiveLine from "./ActiveLine";
import Icon from "./Icon";
import Link from "next/link";

export default function Sidebar() {
	return (
		<div className="flex h-screen w-fit flex-col justify-between border bg-transparent p-4 dark:border-black">
			<div className="flex flex-col gap-4">
				<Link href="#">
					<Icon active icon={<FolderIcon className="h-10 w-10 " />}></Icon>
				</Link>
				<Link href="#">
					<Icon icon={<SparklesIcon className="h-10 w-10 " />}></Icon>
				</Link>
				<Link href="#">
					<Icon icon={<WrenchIcon className="h-10 w-10 " />}></Icon>
				</Link>
			</div>
			<div className="h-10 w-10">
				<Link href="#">
					<Icon icon={<Cog6ToothIcon className="h-10 w-10 " />}></Icon>
				</Link>
			</div>
		</div>
	);
}
