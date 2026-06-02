import { DepthProvider, useDepth } from "../context/DepthProvider.js";
import { useRouter } from "../context/RouterProvider.js";
import { RenderRouteElement } from "./RenderRouteElement.js";

function Outlet() {
	const { elementStack } = useRouter();
	const currentDepth = useDepth();

	const nextDepth = currentDepth + 1;

	if (nextDepth >= elementStack.length) {
		return null;
	}

	const nextElement = elementStack[nextDepth];

	return (
		<>
			<DepthProvider value={nextDepth}>
				<RenderRouteElement
					element={nextElement}
					children={null}
				/>
			</DepthProvider>
		</>
	);
}

export { Outlet };
