const ENDPOINTS = {
  users: {
    root: "api/users",
    login: "api/login",
    userId: (userId) => `api/users/${userId}`,
  },
  games: {
      root: "api/games",
      gameId: (gameId) => `api/games/${gameId}`,
  },
  ranks: {
      root: "api/ranks",
      rankId: (rankId) => `api/ranks/${rankId}`,
  },
};

export default ENDPOINTS;
