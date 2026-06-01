import type { FlatRoute, Route, RouteElementType } from "../types/types.js";

function flattenRoutes(
	userRoutes: Route[],
	parentPath = "",
	parentStack: RouteElementType[] = [],
): FlatRoute[] {
	let flatList: FlatRoute[] = [];

	for (const route of userRoutes) {
		const combinedPath = `${parentPath}/${route.path}`;
		const absolutePath = getPath(combinedPath);

		const currentStack: RouteElementType[] = [...parentStack, route.element];

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

function getPath(path: string) {
	const decoded = decodeURIComponent(path).trim();

	const basePath = decoded.split(/[?#]/)[0];

	const collapsedSlashes = basePath.replace(/\/+/g, "/");

	const pathWithoutTrailingSpace =
		collapsedSlashes.length !== 1 && collapsedSlashes.endsWith("/") ?
			collapsedSlashes.slice(0, -1)
		:	collapsedSlashes;

	const absolutePath =
		pathWithoutTrailingSpace.startsWith("/") ?
			pathWithoutTrailingSpace
		:	`/${pathWithoutTrailingSpace}`;

	return absolutePath;
}

function getMeta(path: string) {
	const decoded = decodeURIComponent(path).trim();

	const queryIndex = decoded.indexOf("?");
	const hashIndex = decoded.indexOf("#");
	const hasQuery = queryIndex !== -1;
	const hasHash = hashIndex !== -1;

	const metaIndex =
		hasQuery && hasHash ? Math.min(queryIndex, hashIndex)
		: hasQuery ? queryIndex
		: hasHash ? hashIndex
		: -1;

	const queryString =
		hasQuery ?
			hasHash && hashIndex > queryIndex ?
				decoded.slice(queryIndex, hashIndex)
			:	decoded.slice(queryIndex)
		:	"";

	const hashString = hasHash ? decoded.slice(hashIndex) : "";

	const fullMeta = metaIndex !== -1 ? decoded.slice(metaIndex) : "";

	return {
		query: queryString,
		hash: hashString,
		combined: fullMeta,
	};
}

export { flattenRoutes, getMeta, getPath };
