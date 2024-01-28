import {
	Autocomplete,
	AutocompleteItem,
	Button,
	Card,
	CardBody,
	CardHeader,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Spinner
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function getRandomInt(max: number) {
	return Math.floor(Math.random() * max);
}

const versions: Record<string, Array<string>> = {
	python: ["3.12", "3.11", "3.10", "3.9"],
	node: ["24", "23", "22", "21"],
	postgresql: ["16", "15", "14"],
};



export default function DownloadCard(props: { language: string }) {
	const [disabled, setDisabled] = useState(true);
	const [progressValue, setProgressValue] = useState(0);
	const [showProgress, setShowProgress] = useState(false);
	const [showManaged, setShowManaged] = useState(false);
	const [isFinished, setIsFinished] = useState(false);

	const router = useRouter();

	function onEditPress() {
		router.push("/dbedit");
	}

	useEffect(() => {
		if (props.language == "PostgreSQL") {
			setShowManaged(true);
			setShowProgress(false);
		}
	}, [props.language])

	useEffect(() => {
		const interval = setInterval(() => {
			setProgressValue((v) => (v >= 100 ? 100 : v + getRandomInt(20)));
		}, 500);
		setIsFinished(true);
		setShowProgress(false);
		return () => {
			clearInterval(interval);
		};
	}, []);
	return (
		<div>
			<Card className="h-72 min-w-64 max-w-64">
				<CardHeader className="flex flex-col gap-4">
					<Image
						className="mx-auto"
						src={`${props.language.toLowerCase()}.svg`}
						alt="Language Logo"
						width={`${props.language.toLowerCase() === "python" ? 80 : "node" ? 80 : 100}`}
						height={`${props.language.toLowerCase() === "python" ? 80 : "node" ? 80 : 100}`}
					/>
					<h1 className="text-xl font-bold">{props.language}</h1>
				</CardHeader>
				<CardBody className="flex flex-col gap-3">
					{showProgress ? (
						<Spinner />
					) : !showManaged ? (
						<>
							<Autocomplete
								onSelectionChange={() => setDisabled(false)}
								size="sm"
								label={`${props.language} Version`}
							>
								{versions[props.language.toLowerCase()].map((version) => (
									<AutocompleteItem key={version}>{version}</AutocompleteItem>
								))}
							</Autocomplete>
							<Button
								isDisabled={disabled}
								onPress={() => {
									setShowProgress(true);
									setTimeout(() => {
										setShowProgress(false);
										setShowManaged(true);
									}, 2000);
								}}
							>
								Download
							</Button>
						</>
					) : (
						<Dropdown>
							<DropdownTrigger>
								<Button>Manage</Button>
							</DropdownTrigger>
							<DropdownMenu>
								<DropdownItem onPress={onEditPress} key="edit">Edit</DropdownItem>
								<DropdownItem
									key="delete"
									className="text-danger"
									color="danger"
								>
									Delete
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					)}
				</CardBody>
			</Card>
		</div>
	);
}
