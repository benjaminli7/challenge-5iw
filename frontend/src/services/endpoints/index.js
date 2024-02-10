const ENDPOINTS = {
  users: {
    root: "api/users",
    login: "api/login",
    userId: (userId) => `api/users/${userId}`,
    resetPassword: (userId) => `api/users/reset-password/${userId}`,
    updateUser: (userId) => `api/users/${userId}`
  },
  games: {
    root: "api/games",
    gameId: (gameId) => `api/games/${gameId}`,
    gameImg: (gameId) => `api/games/${gameId}/image`,
  },
  ranks: {
    root: "api/ranks",
    rankId: (rankId) => `api/ranks/${rankId}`,
  },
  teams: {
    root: "api/teams",
  }
};

export default ENDPOINTS;
