import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/react";
import Circle from "./Circle";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const contextMenuItems = [
	{
		key: "edit",
		label: "Edit Project",
	},
	{
		key: "stats",
		label: "View Stats",
	},
	{
		key: "delete",
		label: "Delete Project",
	},
];

export default function ProjectCard(props: {
	name: string;
	description: string;
	language: string;
	avatar?: string;
}) {
	return (
		<Card isPressable isHoverable className="min-w-48 max-w-80 duration-[5ms]">
			<CardHeader>
				<div>
					<h1>{props.name}</h1>
				</div>
			</CardHeader>
			<CardBody>
				<div>
					<h1>{props.description}</h1>
				</div>
			</CardBody>
			<CardFooter className="flex flex-row justify-between">
				<div className="flex flex-row items-center gap-1">
					<Circle language={props.language} />
					<h1>{props.language}</h1>
				</div>
				<div className="flex flex-row ">
					<Dropdown>
						<DropdownTrigger>
							<Button isIconOnly size="sm" variant="bordered">
								<ChevronDownIcon className="h-5 w-5" />
							</Button>
						</DropdownTrigger>
						<DropdownMenu items={contextMenuItems}>
							{contextMenuItems.map((menuItem) => (
								<DropdownItem
									key={menuItem.key}
									color={menuItem.key === "delete" ? "danger" : "default"}
									className={
										menuItem.key === "delete" ? "text-danger" : "default"
									}
								>
									{menuItem.label}
								</DropdownItem>
							))}
						</DropdownMenu>
					</Dropdown>
				</div>
			</CardFooter>
		</Card>
	);
}
