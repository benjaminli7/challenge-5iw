import { useCustomMutation } from "@/hooks/useCustomMutation";
import ENDPOINTS from "@/services/endpoints";

export function useUsers(userId, token) {
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

  const emailValidationMutation = useCustomMutation(
    ENDPOINTS.users.validation(token),
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
    emailValidationMutation
  };
}
