import { useCustomMutation } from "@/hooks/useCustomMutation";
import useFetch from "@/hooks/useFetch";
import ENDPOINTS from "@/services/endpoints";

export function useUsers() {
  const {
    data: users,
    isError,
    error,
    isLoading,
  } = useFetch("users", ENDPOINTS.users.root);

  const loginMutation = useCustomMutation(
    ENDPOINTS.users.login,
    "post",
    "users"
  );

  const registerMutation = useCustomMutation(
    ENDPOINTS.users.root,
    "post",
    "users"
  );

  return {
    users,
    isError,
    error,
    isLoading,
    loginMutation,
    registerMutation,
  };
}
