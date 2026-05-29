import { useContext } from "react";
import { RouterContext } from "./RouterProvider.tsx";

function Outlet() {
	const { element } = useContext(RouterContext);

	return <>{element}</>;
}

export default Outlet;
