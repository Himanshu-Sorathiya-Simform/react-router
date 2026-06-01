import { useContext } from "react";
import { RouterContext } from "./RouterProvider";

function Outlet() {
	const context = useContext(RouterContext);

	if (!context) {
		throw new Error("<Outlet /> must be used inside a <RouterProvider />");
	}

	return <>{context.activeElement}</>;
}

export { Outlet };
