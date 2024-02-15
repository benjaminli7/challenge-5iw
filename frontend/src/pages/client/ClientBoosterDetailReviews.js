import React from "react";
import { Paper, Stack, Avatar, Typography } from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";

function ClientBoosterDetailReviews({ player }) {
  console.log(player);
  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Reviews
      </Typography>
      <Stack direction="column" spacing={2}>
        {player.schedules.map((schedule, index) =>
          schedule.review ? (
            <Paper key={index} elevation={2} sx={{ p: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar />
                <Stack direction="column">
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    {schedule.client.username}
                  </Typography>

                  <Typography variant="subtitle">
                    {schedule.review.comment}
                  </Typography>
                  <Typography variant="subtitle">
                    {schedule.review.rating
                      ? Array.from(Array(schedule.review.rating)).map(
                          (star, index) => (
                            <StarRateIcon
                              key={index}
                              style={{ color: "gold" }}
                            />
                          )
                        )
                      : null}
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
          ) : null
        )}
      </Stack>
    </>
  );
}

export default ClientBoosterDetailReviews;
