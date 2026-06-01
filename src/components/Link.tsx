import type { AnchorHTMLAttributes, ReactNode } from "react";
import { useNavigate } from "../hooks/useNavigate";

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	to: string;
	children: ReactNode;
}

function Link({ to, children, target, onClick, ...props }: LinkProps) {
	const navigate = useNavigate();

	function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
		if (onClick) onClick(e);

		if (
			e.defaultPrevented
			|| e.button !== 0
			|| target === "_blank"
			|| e.metaKey
			|| e.ctrlKey
			|| e.shiftKey
			|| e.altKey
		) {
			return;
		}

		e.preventDefault();
		navigate(to);
	}

	return (
		<a
			href={to}
			target={target}
			{...props}
			onClick={handleClick}
		>
			{children}
		</a>
	);
}

export { Link };
