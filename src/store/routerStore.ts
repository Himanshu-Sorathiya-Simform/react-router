type Listener = (path: string) => void;

function createRouterStore() {
	let listeners = new Set<Listener>();
	let currentPath = window.location.pathname;

	function getSnapshot() {
		return currentPath;
	}

	function subscribe(listener: Listener) {
		listeners.add(listener);

		return () => {
			listeners.delete(listener);
		};
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
