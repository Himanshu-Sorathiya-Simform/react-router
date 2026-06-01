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

export { getMeta, getPath };
