import { type ReactNode, createContext, useMemo, useSyncExternalStore } from "react";
import { routerStore } from "./store/routerStore";

interface Route {
	path: string;
	element: ReactNode;
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

const RouterContext = createContext<RouterContextType | null>(null);

function RouterProvider({ routes, children }: RouterProviderProps) {
	const currentPath = useSyncExternalStore(
		routerStore.subscribe,
		routerStore.getSnapshot,
	);

	const activeRoute = routes.find((route) => route.path === currentPath);
	const activeElement =
		activeRoute ? activeRoute.element : <div>404 Not Found</div>;

	const value = useMemo(
		() => ({
			currentPath,
			navigate: routerStore.navigate,
			activeElement,
		}),
		[currentPath, activeElement],
	);

	return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export { RouterContext, RouterProvider };
