import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Typography } from "@material-ui/core";

export default function AdminDashboardPie() {
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
              { id: 0, value: 10, label: "series A" },
              { id: 1, value: 15, label: "series B" },
              { id: 2, value: 20, label: "series C" },
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
