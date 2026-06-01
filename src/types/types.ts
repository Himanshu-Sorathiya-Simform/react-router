import type { ElementType, ReactNode } from "react";

type Listener = () => void;

type RouteElementType = ReactNode | ElementType;

interface RouterStore {
	getSnapshot: () => string;
	subscribe: (listener: Listener) => () => void;
	navigate: (to: string, replace?: boolean) => void;
}

interface Route {
	path: string;
	element: RouteElementType;
	children?: Route[];
}

interface FlatRoute {
	absolutePath: string;
	elementStack: RouteElementType[];
}

export type { FlatRoute, Listener, Route, RouteElementType, RouterStore };
