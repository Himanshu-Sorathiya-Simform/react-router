import { type ReactNode, createContext, useContext } from "react";

interface DepthProviderProps {
	value: number;
	children: ReactNode;
}

type DepthContext = number | null;

const DepthContext = createContext<DepthContext>(null);

function DepthProvider({ value, children }: DepthProviderProps) {
	return <DepthContext value={value}>{children}</DepthContext>;
}

function useDepth() {
	const context = useContext(DepthContext);

	if (context === null) {
		throw new Error("useDepth must be used inside a <DepthProvider />");
	}

	return context;
}

export { DepthProvider, useDepth };
