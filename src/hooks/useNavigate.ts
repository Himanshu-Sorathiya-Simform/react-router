import { useRouter } from "../context/RouterProvider";

interface UseNavigateReturn {
	(to: string, replace?: boolean): void;
}

function useNavigate(): UseNavigateReturn {
	const { navigate } = useRouter();

	return navigate;
}

export { type UseNavigateReturn, useNavigate };
