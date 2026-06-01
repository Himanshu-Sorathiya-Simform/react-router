import { useRouter } from "../context/RouterProvider.js";

function Outlet() {
	const { activeElement } = useRouter();

	return <>{activeElement}</>;
}

export { Outlet };
