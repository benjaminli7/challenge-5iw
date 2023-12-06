const ENDPOINTS = {
  users: {
    root: "api/users",
    login: "api/login",
    changePassword: "api/changePassword",
    userId: (userId) => `api/users/${userId}`,
  },
};

export default ENDPOINTS;
