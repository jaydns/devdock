import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from "@nextui-org/react";
import { invoke } from "@tauri-apps/api/tauri";
import { useRouter } from "next/router";
import Circle from "./Circle";

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
	path: string;
	description: string;
	language: string;
	avatar?: string;
}) {
	const router = useRouter()

	async function onPress() {
		await invoke("open_code_editor", { path: props.path, editor: "code" });
	}

	async function onDropdownPress(key: string) {
		switch (key) {
			case "edit":
				// route to /edit page
				router.push("/edit")
				break;
			case "stats":
				router.push("/chart")
				break;
			case "delete":
				console.log("bruh")
				const projectPathsText = localStorage.getItem("projects");
				if (!projectPathsText) return;
				const projectPaths = JSON.parse(projectPathsText);
				const newProjectPaths = projectPaths.filter(
					(path: string) => path !== props.path,
				);
				localStorage.setItem("projects", JSON.stringify(newProjectPaths));
				window.location.reload(); // fucking refreshProjectData is in index.tsx god fuck this shit
				break;
		}
	}

	return (
		<Card onPress={onPress} isPressable isHoverable className="min-w-48 max-w-80 duration-[5ms]">
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
									onPress={() => onDropdownPress(menuItem.key)}
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
