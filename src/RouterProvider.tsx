import {
	type ReactNode,
	cloneElement,
	createContext,
	isValidElement,
	useMemo,
	useSyncExternalStore,
} from "react";
import { routerStore } from "./store/routerStore";
import { getPath } from "./utils/routeUtils.js";

interface Route {
	path: string;
	element: ReactNode;
	children?: Route[];
}

interface RouterProviderProps {
	routes: Route[];
	children: ReactNode;
}

interface RouterContextType {
	currentPath: string;
	navigate: (to: string, replace?: boolean) => void;
	activeElement: ReactNode;
}

interface FlatRoute {
	absolutePath: string;
	elementStack: ReactNode[];
}

const RouterContext = createContext<RouterContextType | null>(null);

function flattenRoutes(
	userRoutes: Route[],
	parentPath = "",
	parentStack: ReactNode[] = [],
): FlatRoute[] {
	let flatList: FlatRoute[] = [];

	for (const route of userRoutes) {
		const combinedPath = `${parentPath}/${route.path}`;
		const absolutePath = getPath(combinedPath);

		const currentStack = [...parentStack, route.element];

		flatList.push({
			absolutePath,
			elementStack: [...parentStack, route.element],
		});

		if (route.children && route.children.length > 0) {
			const flatChildren = flattenRoutes(
				route.children,
				absolutePath,
				currentStack,
			);
			flatList = flatList.concat(flatChildren);
		}
	}

	return flatList;
}

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
			activeRoute.elementStack.reduceRight((childComponent, parentLayout) => {
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
			})
		:	<div>404 Not Found</div>;

	const value = useMemo(
		(): RouterContextType => ({
			currentPath: normalizedPath,
			navigate: routerStore.navigate,
			activeElement,
		}),
		[normalizedPath, activeElement],
	);

	return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export { RouterContext, RouterProvider };
