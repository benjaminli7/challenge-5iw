import React, { useState, useEffect } from "react";
import { Typography, useTheme } from "@material-ui/core";
import AdminDashboardChart from "./dashboard/AdminDashboardChart";
import AdminDashboardPie from "./dashboard/AdminDashboardPie";
import useFetch from "@/hooks/useFetch";
import ENDPOINTS from "@/services/endpoints";
import { Grid } from "@mui/material";

function AdminDashboardView() {
  const theme = useTheme();
  const [playerData, setPlayerData] = useState([]);
  const [playerMinusOneMonthData, setPlayerMinusOneMonthData] = useState([]);
  const { data: players, isLoading: isLoadingTeams } = useFetch(
    "players",
    `${ENDPOINTS.users.players}`
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
        return { time: index + 1, amount: count }; // Days start from 1
      });
      const minusOneMonthChartData = minusOneMonthData.map((count, index) => {
        return { time: index + 1, amount: count }; // Days start from 1
      });

      setPlayerData(chartData);
      setPlayerMinusOneMonthData(minusOneMonthChartData);
    }
  }, [players]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <AdminDashboardChart
            playerData={playerData}
            theme={theme}
            playerMinusOneMonthData={playerMinusOneMonthData}
          />
        </Grid>
        <Grid item xs={4}>
          <AdminDashboardPie />
        </Grid>
        <Grid item xs={12}>
          {/* <AdminDashboardChart
            playerData={playerData}
            theme={theme}
            playerMinusOneMonthData={playerMinusOneMonthData}
          /> */}
        </Grid>
      </Grid>
    </>
  );
}

export default AdminDashboardView;
