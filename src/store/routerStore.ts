type Listener = () => void;

function createRouterStore() {
	let listeners = new Set<Listener>();

	function getSnapshot() {
		return (
			window.location.pathname + window.location.search + window.location.hash
		);
	}

	function notify() {
		listeners.forEach((listener) => listener());
	}

	function subscribe(listener: Listener) {
		listeners.add(listener);

		if (listeners.size === 1) {
			window.addEventListener("popstate", notify);
			window.addEventListener("hashchange", notify);
		}

		return () => {
			listeners.delete(listener);

			if (listeners.size === 0) {
				window.removeEventListener("popstate", notify);
				window.removeEventListener("hashchange", notify);
			}
		};
	}

	function navigate(to: string, replace = false) {
		if (getSnapshot() === to) return;

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
