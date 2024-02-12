const ENDPOINTS = {
  users: {
    root: "api/users",
    login: "api/login",
    userId: (userId) => `api/users/${userId}`,
    userImg: (userId) => `api/users/${userId}/image`,
  },
  games: {
    root: "api/games",
    gameId: (gameId) => `api/games/${gameId}`,
    gameImg: (gameId) => `api/games/${gameId}/image`,
  },
  ranks: {
    root: "api/ranks",
    rankId: (rankId) => `api/ranks/${rankId}`,
    rankImg: (rankId) => `api/ranks/${rankId}/image`,
  },
  teams: {
    root: "api/teams",
    teamId: (teamId) => `api/teams/${teamId}`,
    manager: (managerId) => `api/users/${managerId}/team`,
    addPlayer: (teamId) => `api/teams/${teamId}/players`,
    teamImg: (teamId) => `api/teams/${teamId}/image`,
  },
};

export default ENDPOINTS;
