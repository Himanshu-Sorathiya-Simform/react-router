import { type ElementType, type ReactNode, isValidElement } from "react";
import type { RouteElementType } from "../types/types.js";

interface RenderRouteElementProps {
	element: RouteElementType;
	children: ReactNode;
}

function RenderRouteElement({ element, children }: RenderRouteElementProps) {
	if (!element) return <>{children}</>;

	if (isValidElement(element)) {
		return element;
	}

	if (typeof element === "function" || typeof element === "object") {
		const Component = element as ElementType;

		return <Component>{children}</Component>;
	}

	return (
		<>
			{element}
			{children}
		</>
	);
}

export { RenderRouteElement };
