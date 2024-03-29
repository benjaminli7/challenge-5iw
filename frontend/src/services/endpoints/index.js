const ENDPOINTS = {
  users: {
    root: "api/users",
    login: "api/login",
    userId: (userId) => `api/users/${userId}`,
    userImg: (userId) => `api/users/${userId}/image`,
    schedules: (userId) => `api/player/${userId}/schedules`,
    players: "api/players",
    client: (clientId) => `api/clients/${clientId}`,
    resetPassword: `api/users/reset-password`,
    changePassword: (token) => `api/users/change-password/${token}`,
    validation: (token) => `api/users/validation/${token}`,
    player: (playerId) => `api/players/${playerId}`,
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
    approveTeam: (teamId) => `api/teams/${teamId}/approve`,
    withdrawCoins: (teamId) => `api/teams/${teamId}/withdraw`,
  },
  schedules: {
    root: "api/schedules",
    scheduleId: (scheduleId) => `api/schedules/${scheduleId}`,
  },
  bookings: {
    root: "api/bookings",
    bookingId: (bookingId) => `api/bookings/${bookingId}`,
    add: "api/bookings/new",
    cancel: (bookingId) => `api/bookings/${bookingId}/cancel`,
  },
  stats: {
    root: "api/stats",
  },
  offers: {
    root: "api/offers",
    offerId: (offerId) => `api/offers/${offerId}`,
  },
  payments: {
    root: "api/payments/create-session",
  },
  confirm_payment: {
    root: "api/payments/handle-payment-success",
  },
  reviews: {
    root: "api/reviews",
  },
};

export default ENDPOINTS;
