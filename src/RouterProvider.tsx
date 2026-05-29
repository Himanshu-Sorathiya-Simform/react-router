import { type ReactNode, createContext, useSyncExternalStore } from "react";
import { routerStore } from "./store/routerStore.ts";

interface Route {
	path: string;
	element: ReactNode;
}

interface RouterProviderProps {
	routes: Route[];
	children: ReactNode;
}

const RouterContext = createContext(null);

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
	};

	return (
		<RouterContext.Provider value={value}>
			{element}
			{children}
		</RouterContext.Provider>
	);
}

export default RouterProvider;
export { RouterContext };
