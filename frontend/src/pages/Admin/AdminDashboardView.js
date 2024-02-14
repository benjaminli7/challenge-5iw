import React, { useState, useEffect } from "react";
import { Typography, useTheme } from "@material-ui/core";
import AdminDashboardChart from "./dashboard/AdminDashboardChart";
import AdminDashboardPie from "./dashboard/AdminDashboardPie";
import AdminDashboardCard from "./dashboard/AdminDashboardCard";
import useFetch from "@/hooks/useFetch";
import ENDPOINTS from "@/services/endpoints";
import { Grid } from "@mui/material";

function AdminDashboardView() {
  const theme = useTheme();
  const [playerData, setPlayerData] = useState([]);
  const [playerMinusOneMonthData, setPlayerMinusOneMonthData] = useState([]);
  const [playersCardStats, setPlayersCardStats] = useState({});
  const [bookingsCardStats, setBookingsCardStats] = useState({});
  const [usersMonhtlyStats, setUsersMonhtlyStats] = useState({});
  const [coinsCardStats, setCoinsCardStats] = useState({});
  const [transactionsCardStats, setTransactionsCardStats] = useState({});
  const [teamCardStats, setTeamCardStats] = useState({});
  const [teamCoinsCardStats, setTeamCoinsCardStats] = useState({});

  const currentMonthFirstDay = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  ).toISOString();

  const lastMonthFirstDay = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 1,
    1
  ).toISOString();

  const { data: players, isLoading: isLoadingPlayers } = useFetch(
    "players",
    `${ENDPOINTS.users.players}`
  );

  const { data: bookings, isLoading: isLoadingBookings } = useFetch(
    "bookings",
    `${ENDPOINTS.bookings.root}?createdAt[after]=${currentMonthFirstDay}`
  );

  const { data: users, isLoading: isLoadingUsers } = useFetch(
    "users",
    `${ENDPOINTS.users.root}?isVerified=true&createdAt[after]=${currentMonthFirstDay}`
  );

  const { data: teams, isLoading: isLoadingTeams } = useFetch(
    "teams",
    `${ENDPOINTS.teams.root}`
  );

  useEffect(() => {
    if (players) {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const dailyData = Array(daysInMonth).fill(0);
      const minusOneMonth = new Date(currentYear, currentMonth, 0).getDate();
      const minusOneMonthData = Array(minusOneMonth).fill(0);

      players.forEach((player) => {
        const playerCreatedAt = new Date(player.createdAt);
        if (
          playerCreatedAt.getMonth() === currentMonth &&
          playerCreatedAt.getFullYear() === currentYear
        ) {
          const day = playerCreatedAt.getDate();
          dailyData[day - 1]++;
        } //else if month -1
        else if (
          playerCreatedAt.getMonth() === currentMonth - 1 &&
          playerCreatedAt.getFullYear() === currentYear
        ) {
          const day = playerCreatedAt.getDate();
          minusOneMonthData[day - 1]++;
        }
      });

      const chartData = dailyData.map((count, index) => {
        return { time: index + 1, amount: count };
      });
      const minusOneMonthChartData = minusOneMonthData.map((count, index) => {
        return { time: index + 1, amount: count };
      });

      setPlayerData(chartData);
      setPlayerMinusOneMonthData(minusOneMonthChartData);

      setPlayersCardStats({
        title: "Total Players",
        amount: players.length,
        details: "Total players in the system",
      });
      setTeamCardStats({
        title: "Total Teams",
        amount: 10,
        details: "Total teams in the system",
      });
    }
    if (users) {
      setUsersMonhtlyStats({
        title: "Total Users",
        amount: users.length,
        details: "Total users created and verified this month",
      });
    }

    if (bookings) {
      setBookingsCardStats({
        title: "Total Bookings",
        amount: bookings.length,
        details: "Total bookings created this month",
      });
    }
    if (teams) {
      const mostEarnedTeam = teams.reduce((prev, current) =>
        prev.coins > current.coins ? prev : current
      );
      setTeamCoinsCardStats({
        title: "Most Earned Team",
        amount: mostEarnedTeam.coins,
        details: `${mostEarnedTeam.name} is the most rentable team`,
      });
    }
  }, [players, users, bookings, teams]);

  const customStyles = {
    boxShadow: "0 0 10px 0 rgba(100, 100, 100, 0.2)",
    padding: "20px",
    borderRadius: "5px",
    marginTop: "20px",
  };
  const fakeStats = {
    title: "Total Players",
    amount: 100,
    details: "Total players in the system",
  };
  return (
    <>
      <Grid container spacing={3}>
        {/* CHARTS PART */}
        <Grid item xs={8} sx={customStyles}>
          <AdminDashboardChart
            playerData={playerData}
            theme={theme}
            playerMinusOneMonthData={playerMinusOneMonthData}
          />
        </Grid>
        <Grid item xs={4} sx={{ ...customStyles }}>
          <AdminDashboardPie />
        </Grid>
        {/* CARDS PART */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom color="primary">
            Stats
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <AdminDashboardCard stats={playersCardStats} />
        </Grid>
        <Grid item xs={3}>
          <AdminDashboardCard stats={teamCardStats} />
        </Grid>
        <Grid item xs={3}>
          <AdminDashboardCard stats={usersMonhtlyStats} />
        </Grid>
        <Grid item xs={3}>
          <AdminDashboardCard stats={bookingsCardStats} />
        </Grid>
        <Grid item xs={3}>
          <AdminDashboardCard stats={teamCoinsCardStats} />
        </Grid>
      </Grid>
    </>
  );
}

export default AdminDashboardView;
