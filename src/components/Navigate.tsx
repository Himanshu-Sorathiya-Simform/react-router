import { useEffect } from "react";
import { useNavigate } from "../hooks/useNavigate.js";

interface NavigateProps {
	to: string;
	replace?: boolean;
}

function Navigate({ to, replace = true }: NavigateProps) {
	const navigate = useNavigate();

	useEffect(() => {
		navigate(to, replace);
	}, [navigate, to, replace]);

	return null;
}

export { Navigate };
