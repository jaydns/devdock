import { ReactNode } from "react";
import ActiveLine from "./ActiveLine";

export default function Icon(props: {
	icon: ReactNode;
	active?: boolean;
	className?: string;
}) {
	return (
		<div
			className={`${props.active ? "" : "duration-75 hover:-translate-y-2 hover:scale-105"} hover:cursor-pointer`}
		>
			<div className={`${props.className}`}>{props.icon}</div>
			{props.active && <ActiveLine></ActiveLine>}
		</div>
	);
}
