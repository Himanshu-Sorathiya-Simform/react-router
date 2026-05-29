import type { LinkHTMLAttributes, ReactNode } from "react";
import { useNavigate } from "./hooks/useNavigate";

interface LinkProps extends LinkHTMLAttributes<HTMLAnchorElement> {
	to: string;
	children: ReactNode;
}

function Link({ to, children, ...props }: LinkProps) {
	const navigate = useNavigate();

	function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
		e.preventDefault();

		navigate(to);
	}

	return (
		<a
			href={to}
			{...props}
			onClick={handleClick}
		>
			{children}
		</a>
	);
}

export { Link };
