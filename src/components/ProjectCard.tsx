import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import Circle from "./Circle";

export default function ProjectCard() {
	return (
		<Card
			isPressable
			isHoverable
			className="min-w-48 max-w-80 duration-[5ms] hover:-translate-y-2 hover:scale-[1.03]"
		>
			<CardHeader>
				<div>
					<h1>SolCompute</h1>
				</div>
			</CardHeader>
			<CardBody>
				<div>
					<h1>SolCompute - our winning submission to ChargerHacks 2023</h1>
				</div>
			</CardBody>
			<CardFooter>
				<div className="flex flex-row items-center gap-1">
					<Circle language="JavaScript" />
					<h1>JavaScript</h1>
				</div>
			</CardFooter>
		</Card>
	);
}
