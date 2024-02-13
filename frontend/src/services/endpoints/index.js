const ENDPOINTS = {
  users: {
    root: "api/users",
    login: "api/login",
    userId: (userId) => `api/users/${userId}`,
<<<<<<< HEAD
    userImg: (userId) => `api/users/${userId}/image`,
    schedules: (userId) => `api/player/${userId}/schedules`,
    players: "api/players"
=======
    resetPassword:  `api/users/reset-password`,
    changePassword: (token) => `api/users/change-password/${token}`
>>>>>>> feature/email2
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
    approveTeam: (teamId) => `api/teams/${teamId}/approve`
  },
  schedules: {
    root: "api/schedules",
    scheduleId: (scheduleId) => `api/schedules/${scheduleId}`,
  }
};

export default ENDPOINTS;
