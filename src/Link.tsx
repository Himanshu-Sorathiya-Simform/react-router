import type { ReactNode } from "react";
import { useNavigate } from "./hooks/useNavigate.ts";

interface LinkProps {
	to: string;
	children: ReactNode;
}

function Link({ to, children }: LinkProps) {
	const navigate = useNavigate();

	function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
		e.preventDefault();

		navigate(to);
	}

	return (
		<a
			href={to}
			onClick={handleClick}
		>
			{children}
		</a>
	);
}

export default Link;
