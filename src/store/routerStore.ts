function createRouterStore() {
	let listeners = [];
	let currentPath = window.location.pathname;

	function getSnapshot() {
		return currentPath;
	}

	function subscribe(listener) {
		listeners.push(listener);

		return () => (listeners = listeners.filter((l) => l !== listener));
	}

	function notify() {
		currentPath = window.location.pathname;

		listeners.forEach((l) => l(currentPath));
	}

	window.addEventListener("popstate", notify);

	function navigate(to: string, replace = false) {
		if (replace) {
			window.history.replaceState({}, "", to);
		} else {
			window.history.pushState({}, "", to);
		}

		notify();
	}

	return {
		getSnapshot,
		subscribe,
		navigate,
	};
}

const routerStore = createRouterStore();

export { createRouterStore, routerStore };
