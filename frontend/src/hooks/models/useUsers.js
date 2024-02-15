import { useCustomMutation } from "@/hooks/useCustomMutation";
import ENDPOINTS from "@/services/endpoints";

<<<<<<< HEAD
export function useUsers(userId) {


=======
export function useUsers(userId, token) {
>>>>>>> dev
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

  const resetPasswordMutation = useCustomMutation(
    ENDPOINTS.users.resetPassword,
    "post",
    ["token"]
  );

  const changePasswordMutation = useCustomMutation(
    ENDPOINTS.users.changePassword(token),
    "post",
    ["token"]
  );

  return {
    loginMutation,
    registerMutation,
    updateUserMutation,
    deleteUserMutation,
    resetPasswordMutation,
    changePasswordMutation,
  };
}
