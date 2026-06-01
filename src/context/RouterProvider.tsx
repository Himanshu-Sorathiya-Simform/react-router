import {
	type ReactNode,
	cloneElement,
	createContext,
	isValidElement,
	useContext,
	useMemo,
	useSyncExternalStore,
} from "react";
import { routerStore } from "../store/routerStore";
import type { Route, RouteElementType } from "../types/types.js";
import { flattenRoutes, getPath } from "../utils/routeUtils.js";

interface RouterProviderProps {
	routes: Route[];
	children: ReactNode;
}

interface RouterContext {
	currentPath: string;
	navigate: (to: string, replace?: boolean) => void;
	activeElement: RouteElementType;
}

const RouterContext = createContext<RouterContext | null>(null);

function RouterProvider({ routes, children }: RouterProviderProps) {
	const rawCurrentPath = useSyncExternalStore(
		routerStore.subscribe,
		routerStore.getSnapshot,
	);
	const normalizedPath = getPath(rawCurrentPath);

	const compiledRoutes = useMemo(() => flattenRoutes(routes), [routes]);

	const activeRoute = compiledRoutes.find(
		(route) => route.absolutePath === normalizedPath,
	);
	const activeElement =
		activeRoute ?
			activeRoute.elementStack.reduceRight<ReactNode>(
				(childComponent, parentLayout) => {
					if (isValidElement(parentLayout)) {
						return cloneElement(parentLayout, {} as any, childComponent);
					}

					if (typeof parentLayout === "function") {
						const Component = parentLayout as React.ComponentType<any>;

						return <Component>{childComponent}</Component>;
					}

					return (
						<>
							{parentLayout}
							{childComponent}
						</>
					);
				},
				null,
			)
		:	<div>404 Not Found</div>;

	const contextValue = useMemo(
		(): RouterContext => ({
			currentPath: normalizedPath,
			navigate: routerStore.navigate,
			activeElement,
		}),
		[normalizedPath, activeElement],
	);

	return (
		<RouterContext.Provider value={contextValue}>
			{children}
		</RouterContext.Provider>
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
