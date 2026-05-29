import { useContext } from "react";
import { RouterContext } from "../RouterProvider.tsx";

function useNavigate() {
	const context = useContext(RouterContext);

	if (!context) throw new Error("useNavigate must be used within RouterProvider");

	return context.navigate;
}

export { useNavigate };
