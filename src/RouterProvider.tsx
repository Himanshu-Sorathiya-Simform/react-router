import { type ReactNode, createContext, useSyncExternalStore } from "react";
import { routerStore } from "./store/routerStore";

interface Route {
	path: string;
	element: ReactNode;
}

interface RouterProviderProps {
	routes: Route[];
	children: ReactNode;
}

interface RouterContext {
	currentPath: string;
	navigate: (to: string, replace?: boolean) => void;
	routes: Route[];
	element: ReactNode;
}

const RouterContext = createContext<RouterContext>({
	currentPath: "",
	navigate: (to: string, replace) => {},
	routes: [],
	element: null,
});

function RouterProvider({ routes, children }: RouterProviderProps) {
	const currentPath = useSyncExternalStore(
		routerStore.subscribe,
		routerStore.getSnapshot,
	);

	const activeRoute = routes.find((route) => route.path === currentPath);
	const element = activeRoute ? activeRoute.element : <div>404 Not Found</div>;

	const value = {
		currentPath,
		navigate: routerStore.navigate,
		routes,
		element,
	};

	return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export { RouterContext, RouterProvider };
