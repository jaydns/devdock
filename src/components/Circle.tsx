export default function Circle(props: {
	language: string;
	className?: string;
}) {
	const languageColorVariants: Record<string, string> = {
		Python: "bg-[#3572a5]",
		JavaScript: "bg-[#f1e05a]",
		TypeScript: "bg-[#3178c6]",
		Rust: "bg-[#dea584]",
		Zig: "bg-[#ec915c]"
	};
	return (
		<div
			className={`h-3 w-3 rounded-full ${languageColorVariants[props.language]
				} ${props.className}`}
		></div>
	);
}
