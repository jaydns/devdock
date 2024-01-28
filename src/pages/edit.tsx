import { Card, Input, Spacer, Textarea, Button } from "@nextui-org/react";

export default function EditProject() {
	return (
		<div className="mx-auto flex h-screen w-screen flex-col items-center bg-white dark:bg-black">
			<div className="mx-auto mt-4 flex flex-col items-center gap-4">
				<h1 className="text-center">Project Name</h1>
				<Input size="sm" label="New Project Title"></Input>
			</div>
			<div className="mx-auto mt-6 flex flex-col items-center gap-4">
				<Textarea label="Description" placeholder="New Description"></Textarea>
			</div>
			<Button variant="faded" radius="sm" size="md" className="mt-6">
				Select New Directory
			</Button>
		</div>
	);
}
