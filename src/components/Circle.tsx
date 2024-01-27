export default function Circle(props: {
	language: string;
	className?: string;
}) {
	const languageColorVariants: Record<string, string> = {
		Python: "bg-[#3572a5]",
		JavaScript: "bg-[#3078c6]",
		TypeScript: "bg-[#3178c6]",
	};
	return (
		<div
			className={`h-3 w-3 rounded-full ${
				languageColorVariants[props.language]
			} ${props.className}`}
		></div>
	);
}
