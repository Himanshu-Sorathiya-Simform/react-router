import { useContext } from "react";
import { RouterContext } from "./RouterProvider";

function Outlet() {
	const { element } = useContext(RouterContext);

	return <>{element}</>;
}

export { Outlet };
