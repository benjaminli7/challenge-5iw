const ENDPOINTS = {
  users: {
    root: "api/users",
    login: "api/login",
    userId: (userId) => `api/users/${userId}`,
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
    teamId: (teamId) => `api/teams/${teamId}`,
    manager: (managerId) => `api/users/${managerId}/team`,
    addPlayer: (teamId) => `api/teams/${teamId}/players`,
  },
  offers: {
    root: "api/offers",
    offerId: (offerId) => `api/offers/${offerId}`,
  },
    payments: {
        root: "api/payments/create-session",
    },
};

export default ENDPOINTS;
