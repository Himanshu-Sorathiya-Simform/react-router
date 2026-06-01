import type { ReactNode } from "react";

type Listener = () => void;

interface RouterStore {
	getSnapshot: () => string;
	subscribe: (listener: Listener) => () => void;
	navigate: (to: string, replace?: boolean) => void;
}

interface Route {
	path: string;
	element: ReactNode;
	children?: Route[];
}

interface FlatRoute {
	absolutePath: string;
	elementStack: ReactNode[];
}

export type { FlatRoute, Listener, Route, RouterStore };
