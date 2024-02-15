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
  const { data: stats, isLoading: isLoadingStats } = useFetch(
    "stats",
    ENDPOINTS.stats.root
  );
  if (isLoadingStats) {
    return <Typography>Loading stats...</Typography>;
  }

  const customStyles = {
    boxShadow: "0 0 10px 0 rgba(100, 100, 100, 0.2)",
    padding: "20px",
    borderRadius: "5px",
    marginTop: "20px",
  };
  console.log(stats);
  return (
    <>
      <Grid container spacing={3}>
        {/* CHARTS PART */}
        <Grid item xs={8} sx={customStyles}>
          <AdminDashboardChart
            currentMonthVerifiedPlayers={stats.currentMonthVerifiedPlayers}
            theme={theme}
            lastMonthVerifiedPlayers={stats.lastMonthVerifiedPlayers}
          />
        </Grid>
        <Grid item xs={4} sx={{ ...customStyles }}>
          <AdminDashboardPie ratings={stats.ratings} />
        </Grid>
        {/* CARDS PART */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom color="primary">
            Stats
          </Typography>
        </Grid>
        {Object.values(stats.cards).map(
          (stat, index) =>
            stat && (
              <Grid item xs={3} key={index}>
                <AdminDashboardCard stats={stat} />
              </Grid>
            )
        )}
      </Grid>
    </>
  );
}

export default AdminDashboardView;
