import ProjectCard from "@/components/ProjectCard";
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";

export default function Home() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	return (
		<main className="flex h-screen w-screen flex-col justify-between bg-white dark:bg-[rgba(39,39,39,255)]">
			<div className="m-8 flex flex-wrap">
				<ProjectCard></ProjectCard>
			</div>
			<div className="flex justify-end p-4">
				<Button radius="full" color="primary">
					Add Project
				</Button>
				<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
					<ModalContent>{(onClose) => <></>}</ModalContent>
				</Modal>
			</div>
		</main>
	);
}
