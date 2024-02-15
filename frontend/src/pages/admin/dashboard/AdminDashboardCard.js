import * as React from "react";
import { Typography, Box } from "@mui/material";

export default function AdminDashboardCard({ stats }) {
  return (
    <Box textAlign="center">
      <Typography variant="h6" className="text-blue-500 bold" gutterBottom bold>
        {stats.title}
      </Typography>
      <Typography component="p" variant="h4">
        {stats.amount}
      </Typography>
      <Typography color="text.secondary">{stats.details}</Typography>
    </Box>
  );
}
