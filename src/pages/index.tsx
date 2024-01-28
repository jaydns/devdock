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
import { open } from '@tauri-apps/api/dialog';
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const gitRepos = [
	{ label: "jaydns/solcompute", value: "jaydnsSolcompute" },
	{ label: "rj17313/discord-tts-bot", value: "discordTtsBot" },
	{ label: "torvalds/linux", value: "linusLinux" },
];

export default function Home() {
	const [projects, setProjects] = useState<Project[]>([]);

	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const [selected, setSelected] = useState("");
	const [isLoadingProjects, setIsLoadingProjects] = useState(false);

	const [selectedKeys, setSelectedKeys] = useState<
		"all" | Set<string | number>
	>(new Set(["Select an IDE"]));
	const selectedValue = useMemo(
		() => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
		[selectedKeys],
	);

	const [selectedFolder, setSelectedFolder] = useState("Select a folder...");

	const handleModalClose = () => {
		onClose();
		resetModalState();
	};

	const resetModalState = () => {
		setSelected("");
		setSelectedFolder("Select a folder...")
	};

	function directorySelectOnClick() {
		open({
			directory: true,
			multiple: false,
		}).then((res) => {
			if (res !== null) {
				setSelectedFolder(res as string);
			}
		});
	}

	function localDirectoryProjectCreateOnClick(closeModal: () => void) {
		const localStorageProjectPaths = localStorage.getItem("projects");
		let projectPaths;

		if (!localStorageProjectPaths) {
			projectPaths = [];
		} else {
			projectPaths = JSON.parse(localStorageProjectPaths);
		}

		projectPaths.push(selectedFolder);

		localStorage.setItem("projects", JSON.stringify(projectPaths));

		closeModal()
		refreshProjectData()
	}

	async function refreshProjectData() {
		setIsLoadingProjects(true);
		const localStorageProjectPaths = localStorage.getItem("projects");
		let projectPaths;

		if (!localStorageProjectPaths) {
			setIsLoadingProjects(false);
			return;
		}

		projectPaths = JSON.parse(localStorageProjectPaths);

		const projects: Project[] = [];

		for (const path of projectPaths) {
			const project: Project = await getProjectDetails(path);
			projects.push(project);
		}

		setIsLoadingProjects(false);
		setProjects(projects);
	}

	useEffect(() => { refreshProjectData() }, []);

	return (
		<main className="flex h-screen w-screen flex-col justify-between bg-white dark:bg-black">
			<div className="absolute">
				<h1 className="text-4xl font-bold p-4">Welcome to <span className="bg-gradient-to-r from-blue-600 to-indigo-500 text-transparent bg-clip-text">DevDock!</span></h1>
			</div>
			<div className="m-4 flex flex-row flex-wrap gap-4 pt-14">
				{isLoadingProjects && (
					<div className="flex w-full">
						<Spinner color="primary" />
					</div>
				)}

				{(!isLoadingProjects && projects.length === 0) && (
					<div className="flex w-full pt-4">
						<p className="text-gray-500 dark:text-gray-400">
							No projects found. Add a project to get started!
						</p>
					</div>
				)}
				{projects.map((project) => (
					<ProjectCard
						name={project.name}
						description={project.description}
						language={project.mainLanguage}
						key={project.id}
						path={project.path}
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
					onOpenChange={handleModalClose}
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
														<Button
															variant="faded"
															radius="sm"
															size="md"
															className=""
															onClick={directorySelectOnClick}
														>
															{selectedFolder}
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
																	<DropdownItem key="Xcode">Xcode</DropdownItem>
																	<DropdownItem key="RustRover">
																		RustRover
																	</DropdownItem>
																</DropdownMenu>
															</Dropdown>

															<Button color="primary" onClick={() => localDirectoryProjectCreateOnClick(onClose)}>Create</Button>
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
																	<DropdownItem key="Xcode">Xcode</DropdownItem>
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
