import ProjectCard from "@/components/ProjectCard";

export default function Home() {
	return (
		<main className="h-screen w-screen bg-white dark:bg-[rgba(39,39,39,255)]">
			<div className="m-8 flex flex-wrap justify-center">
				<ProjectCard></ProjectCard>
			</div>
		</main>
	);
}
