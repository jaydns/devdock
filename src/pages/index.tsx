import ProjectCard from "@/components/ProjectCard";
import { getProjectDetails } from "@/project";
import { Project } from "@/types";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
	Autocomplete,
	AutocompleteItem,
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Radio,
	RadioGroup,
	Spinner,
	useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const gitRepos = [
	{ label: "jaydns/solcompute", value: "jaydnsSolcompute" },
	{ label: "rj17313/discord-tts-bot", value: "discordTtsBot" },
	{ label: "torvalds/linux", value: "linusLinux" },
];

export default function Home() {
	const [projects, setProjects] = useState<Project[]>([]);

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selected, setSelected] = useState("");

	const [selectedKeys, setSelectedKeys] = useState<
		"all" | Set<string | number>
	>(new Set(["Select an IDE"]));
	const selectedValue = useMemo(
		() => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
		[selectedKeys],
	);

	useEffect(() => {
		async function getData() {
			const projectPaths = [
				"/Users/jayden/Developer/solcompute",
				"safas",
				"",
				"",
			];

			const projects: Project[] = [];

			for (const path of projectPaths) {
				const project: Project = await getProjectDetails(path);
				projects.push(project);
			}

			setProjects(projects);
		}

		getData();
	}, []);

	return (
		<main className="flex h-screen w-screen flex-col justify-between bg-white dark:bg-black">
			<div className="m-4 flex flex-row flex-wrap gap-4">
				{projects.length === 0 && (
					<div className="flex w-full">
						<Spinner color="primary" />
					</div>
				)}
				{projects.map((project) => (
					<ProjectCard
						name={project.name}
						description={project.description}
						language={project.mainLanguage}
						key={project.id}
						avatar={project.avatar}
					/>
				))}
			</div>
			<div className="flex justify-end p-4">
				<Button
					radius="full"
					size="lg"
					color="primary"
					variant="flat"
					isIconOnly
					onPress={onOpen}
				>
					<PlusIcon className="h-6 w-6" />
				</Button>
				<Modal
					isDismissable={false}
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					className="pb-4"
				>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader>Add Project</ModalHeader>
								<ModalBody>
									<RadioGroup
										value={selected}
										onValueChange={setSelected}
										label="Choose type of project"
									>
										<Radio value="localFile">Local File</Radio>
										<Radio value="remoteRepository">Remote Repository</Radio>
									</RadioGroup>

									{(() => {
										switch (selected) {
											case "localFile": {
												return (
													<div className="flex flex-col gap-4">
														<Button variant="faded" radius="sm" size="md">
															Select a directory...
														</Button>
														<div className="flex flex-col gap-4">
															<Dropdown>
																<DropdownTrigger>
																	<Button
																		variant="bordered"
																		className="min-w-24"
																	>
																		{selectedValue}
																	</Button>
																</DropdownTrigger>
																<DropdownMenu
																	variant="faded"
																	disallowEmptySelection
																	selectionMode="single"
																	selectedKeys={selectedKeys}
																	onSelectionChange={setSelectedKeys}
																>
																	<DropdownItem key="Visual Studio Code">
																		Visual Studio Code
																	</DropdownItem>
																	<DropdownItem key="Visual Studio">
																		Visual Studio
																	</DropdownItem>
																	<DropdownItem key="xCode">xCode</DropdownItem>
																	<DropdownItem key="RustRover">
																		RustRover
																	</DropdownItem>
																</DropdownMenu>
															</Dropdown>

															<Button color="primary">Create</Button>
														</div>
													</div>
												);
											}
											case "remoteRepository": {
												return (
													<div className="flex flex-col gap-4">
														<Autocomplete
															className="h-12"
															label="Select a Repository"
														>
															{gitRepos.map((gitRepo) => (
																<AutocompleteItem
																	startContent={
																		<Image
																			alt="GitHub logo"
																			src={"github-mark-white.svg"}
																			width={20}
																			height={20}
																		></Image>
																	}
																	key={gitRepo.value}
																	value={gitRepo.value}
																>
																	{gitRepo.label}
																</AutocompleteItem>
															))}
														</Autocomplete>

														<div className="flex flex-col">
															<Dropdown>
																<DropdownTrigger>
																	<Button
																		variant="bordered"
																		className="min-w-24"
																	>
																		{selectedValue}
																	</Button>
																</DropdownTrigger>
																<DropdownMenu
																	variant="faded"
																	disallowEmptySelection
																	selectionMode="single"
																	selectedKeys={selectedKeys}
																	onSelectionChange={setSelectedKeys}
																>
																	<DropdownItem key="Visual Studio Code">
																		Visual Studio Code
																	</DropdownItem>
																	<DropdownItem key="Visual Studio">
																		Visual Studio
																	</DropdownItem>
																	<DropdownItem key="xCode">xCode</DropdownItem>
																	<DropdownItem key="RustRover">
																		RustRover
																	</DropdownItem>
																</DropdownMenu>
															</Dropdown>
														</div>
														<Button color="primary">Create</Button>
													</div>
												);
											}
											default: {
												return <></>;
											}
										}
									})()}
								</ModalBody>
							</>
						)}
					</ModalContent>
				</Modal>
			</div>
		</main>
	);
}
