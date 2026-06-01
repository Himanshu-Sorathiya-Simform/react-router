import { useRouter } from "../context/RouterProvider";

function useNavigate() {
	const { navigate } = useRouter();

	return navigate;
}

export { useNavigate };
