import { ReactNode } from "react";

export default function Icon(props: {
	icon: ReactNode;
	active?: boolean;
	className?: string;
	children?: string;
}) {
	return (
		<div
			className={`${props.active && `bg-gray-100 bg-opacity-5`} flex h-8 rounded-md p-2 hover:cursor-pointer`}
		>
			<div className={`${props.className} flex flex-row items-center gap-2`}>
				{props.icon}
				{props.children}
			</div>
		</div>
	);
}
