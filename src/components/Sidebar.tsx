import {
	FolderIcon,
	WrenchIcon,
	SparklesIcon,
	Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import Icon from "./Icon";
import Link from "next/link";

export default function Sidebar() {
	return (
		<div className="flex w-64 flex-col justify-between border-r-black bg-transparent bg-fixed p-2">
			<div className="flex flex-col gap-2">
				<Link href="#">
					<Icon active icon={<FolderIcon className="stroke-primary h-5 w-5" />}>
						Projects
					</Icon>
				</Link>
				<Link href="#">
					<Icon icon={<WrenchIcon className="stroke-primary h-5 w-5" />}>
						Download
					</Icon>
				</Link>
				<Link href="#">
					<Icon icon={<SparklesIcon className="stroke-primary h-5 w-5" />}>
						Generate
					</Icon>
				</Link>
			</div>
			<div className="">
				<Link href="#">
					<Icon icon={<Cog6ToothIcon className="stroke-primary h-5 w-5" />}>
						Settings
					</Icon>
				</Link>
			</div>
		</div>
	);
}
