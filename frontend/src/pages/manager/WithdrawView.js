import React from "react";
import { Grid } from "@mui/material";
import WithdrawCard from "./components/WithdrawCard";
import { Typography } from "@material-ui/core";

function WithdrawView({ team }) {
  const withdraws = [
    {
      coins: 50,
      title: "The rat",
      euro: 5,
      img: "https://www.pngitem.com/pimgs/m/146-1468479_coin-png-coin-png-transparent-png.png",
    },
    {
      coins: 100,
      title: "Ok let's talk",
      euro: 10,
      img: "https://www.example.com/coin100.png",
    },
    {
      coins: 200,
      title: "Well well well",
      euro: 20,
      img: "https://www.example.com/coin200.png",
    },
    {
      coins: 500,
      title: "Serious shit",
      euro: 50,
      img: "https://www.example.com/coin500.png",
    },
  ];
  console.log(team);
  return (
    <>
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: "bold",
        }}
      >
        You'r balance is {team.coins} coins
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        gap={5}
      >
        {withdraws.map((withdraw, index) => (
          <Grid item key={index}>
            <WithdrawCard data={withdraw} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default WithdrawView;
