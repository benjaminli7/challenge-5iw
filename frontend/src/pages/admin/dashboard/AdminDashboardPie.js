import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@material-ui/core";

export default function AdminDashboardPie({ ratings }) {
  const values = Object.values(ratings);
  return (
    // box align center in height and width
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography variant="h6" gutterBottom color="primary" bold>
        Review notes
      </Typography>
      <PieChart
        slotProps={{
          legend: {
            direction: "column",
            position: { vertical: "top", horizontal: "left" },

            itemMarkWidth: 20,
            itemMarkHeight: 2,
            markGap: 5,
            itemGap: 10,
          },
        }}
        series={[
          {
            data: [
              { id: 0, value: values[0], label: "1" },
              { id: 1, value: values[1], label: "2" },
              { id: 2, value: values[2], label: "3" },
              { id: 3, value: values[3], label: "4" },
              { id: 4, value: values[4], label: "5" },
            ],
          },
        ]}
        width={600}
        height={400}
        center={{ x: "50%", y: "50%" }}
      />
    </Box>
  );
}
