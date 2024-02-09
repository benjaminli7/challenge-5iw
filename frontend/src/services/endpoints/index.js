const ENDPOINTS = {
  users: {
    root: "api/users",
    login: "api/login",
    userId: (userId) => `api/users/${userId}`,
    resetPassword: (userId) => `api/users/reset-password/${userId}`,
    updateUser: (userId) => `api/users/${userId}`
  },
};

export default ENDPOINTS;
