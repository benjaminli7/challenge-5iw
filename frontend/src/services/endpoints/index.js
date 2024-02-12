const ENDPOINTS = {
  users: {
    root: "api/users",
    login: "api/login",
    userId: (userId) => `api/users/${userId}`,
    schedules: (userId) => `api/player/${userId}/schedules`,
    players: "api/players"
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
    approveTeam: (teamId) => `api/teams/${teamId}/approve`
  },
  schedules: {
    root: "api/schedules",
    scheduleId: (scheduleId) => `api/schedules/${scheduleId}`,
  }
};

export default ENDPOINTS;
