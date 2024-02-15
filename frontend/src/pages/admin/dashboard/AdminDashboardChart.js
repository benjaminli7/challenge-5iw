import React from "react";
import { LineChart, axisClasses } from "@mui/x-charts";
import { Typography } from "@material-ui/core";

function AdminDashboardChart({
  currentMonthVerifiedPlayers,
  theme,
  lastMonthVerifiedPlayers,
}) {
  console.log(currentMonthVerifiedPlayers);
  console.log(lastMonthVerifiedPlayers);
  const playerData = Object.values(currentMonthVerifiedPlayers);
  const playerMinusOneMonthData = Object.values(lastMonthVerifiedPlayers);

  console.log(playerData);
  console.log(playerMinusOneMonthData);

  const max = Math.max(...playerData, ...playerMinusOneMonthData);
  return (
    <div style={{ width: "100%", flexGrow: 1, overflow: "hidden" }}>
      <Typography variant="h6" gutterBottom color="primary" bold>
        In {new Date().toLocaleString("en-us", { month: "long" })} we had{" "}
        {playerData.length} new players
      </Typography>
      <LineChart
        height={400}
        margin={{
          top: 16,
          right: 20,
          left: 70,
          bottom: 30,
        }}
        xAxis={[
          {
            scaleType: "point",
            tickNumber: 2,
            data: [
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
            ],
          },
        ]}
        yAxis={[
          {
            id: "dataCurrentMonth",
            type: "linear",
            scaleType: "linear",
            label: "Current Month",
            color: theme.palette.primary.main,
            max: max,
          },
          {
            id: "dataMinusOneMonth",
            type: "linear",
            scaleType: "linear",
            label: "Minus One Month",
            max: max,
            //color red
          },
        ]}
        series={[
          {
            yAxisKey: "dataCurrentMonth",
            label: "Current Month",
            // dataKey: "amount",
            stroke: theme.palette.primary.main,
            data: playerData,
            showMark: false,
            color: theme.palette.primary.light,
          },
          {
            yAxisKey: "dataMinusOneMonth",
            // dataKey: "amount",
            label: "Last Month",
            stroke: theme.palette.secondary.main,
            data: playerMinusOneMonthData,
            showMark: false,
            // Color red
            color: theme.palette.secondary.light,
          },
        ]}
        sx={{
          [`.${axisClasses.root} line`]: {
            stroke: theme.palette.text.secondary,
          },
          [`.${axisClasses.root} text`]: {
            fill: theme.palette.text.secondary,
          },
          [`& .${axisClasses.left} .${axisClasses.label}`]: {
            transform: "translateX(-25px)",
          },
        }}
      />
    </div>
  );
}

export default AdminDashboardChart;
