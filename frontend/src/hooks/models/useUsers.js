import { useCustomMutation } from "@/hooks/useCustomMutation";
import ENDPOINTS from "@/services/endpoints";

export function useUsers(userId) {
  // const {
  //   data: users,
  //   isError,
  //   error,
  //   isLoading,
  // } = useFetch("users", ENDPOINTS.users.root);

  // const {
  //   data: user,
  //   isError: isErrorUser,
  //   error: errorUser,
  //   isLoading: isLoadingUser,
  // } = useFetch("user", ENDPOINTS.users.userId(userId));

  const loginMutation = useCustomMutation(ENDPOINTS.users.login, "post", [
    "users",
  ]);

  const registerMutation = useCustomMutation(ENDPOINTS.users.root, "post", [
    "users",
  ]);

  const updateUserMutation = useCustomMutation(
    ENDPOINTS.users.userId(userId),
    "patch",
    ["users", "team"]
  );

  const deleteUserMutation = useCustomMutation(
    ENDPOINTS.users.userId(userId),
    "delete",
    ["users", "team"]
  );

  return {
    loginMutation,
    registerMutation,
    updateUserMutation,
    deleteUserMutation,
  };
}
