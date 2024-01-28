import DownloadCard from "@/components/DownloadCard";

export default function Download() {
	return (
		<main className="h-screen w-screen bg-white p-4 dark:bg-black">
			<div className="flex flex-col items-center justify-center gap-8">
				<div className="flex flex-col gap-4">
					<h1 className="text-center text-2xl font-bold">Toolchains</h1>
					<div className="flex flex-row gap-4">
						<DownloadCard language="Node"></DownloadCard>
						<DownloadCard language="Python"></DownloadCard>
					</div>
				</div>
				<h1 className="text-center text-2xl font-bold">Databases</h1>
				<div className="flex flex-row gap-4">
					<DownloadCard language="PostgreSQL"></DownloadCard>
				</div>
			</div>
		</main>
	);
}
