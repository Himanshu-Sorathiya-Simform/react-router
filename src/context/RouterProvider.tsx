import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import { RenderRouteElement } from "../components/RenderRouteElement.js";
import { routerStore } from "../store/routerStore";
import type { Route, RouteElementType } from "../types/types.js";
import { flattenRoutes, getPath } from "../utils/routeUtils.js";
import { DepthProvider } from "./DepthProvider.js";

interface RouterProviderProps {
	routes: Route[];
}

interface RouterContext {
	currentPath: string;
	navigate: (to: string, replace?: boolean) => void;
	elementStack: RouteElementType[];
}

const RouterContext = createContext<RouterContext | null>(null);

function RouterProvider({ routes }: RouterProviderProps) {
	const rawCurrentPath = useSyncExternalStore(
		routerStore.subscribe,
		routerStore.getSnapshot,
	);
	const normalizedPath = getPath(rawCurrentPath);

	const compiledRoutes = useMemo(() => flattenRoutes(routes), [routes]);

	const activeRoute = compiledRoutes.find(
		(route) => route.absolutePath === normalizedPath,
	);

	const elementStack = activeRoute ? activeRoute.elementStack : [];

	const contextValue = useMemo(
		(): RouterContext => ({
			currentPath: normalizedPath,
			navigate: routerStore.navigate,
			elementStack,
		}),
		[normalizedPath, elementStack],
	);

	const rootElement: RouteElementType =
		elementStack.length > 0 ? elementStack[0] : <div>404 Not Found</div>;

	return (
		<RouterContext value={contextValue}>
			<DepthProvider value={0}>
				<RenderRouteElement
					element={rootElement}
					children={null}
				/>
			</DepthProvider>
		</RouterContext>
	);
}

function useRouter() {
	const context = useContext(RouterContext);

	if (!context) {
		throw new Error("useRouter must be used inside a <RouterProvider />");
	}

	return context;
}

export { RouterProvider, useRouter };
