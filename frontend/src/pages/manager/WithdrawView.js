import { Typography } from "@material-ui/core";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Grid, Stack } from "@mui/material";
import WithdrawCard from "./components/WithdrawCard";

function WithdrawView({ team }) {
  const withdraws = [
    {
      coins: 50,
      euro: 5,
      img: "https://www.pngitem.com/pimgs/m/146-1468479_coin-png-coin-png-transparent-png.png",
    },
    {
      coins: 100,
      euro: 10,
      img: "https://www.example.com/coin100.png",
    },
    {
      coins: 200,
      euro: 20,
      img: "https://www.example.com/coin200.png",
    },
    {
      coins: 500,
      euro: 50,
      img: "https://www.example.com/coin500.png",
    },
  ];
  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h4" className="titleBorder">
          Withdraw your coins
        </Typography>
        <Typography variant="h5" align="center">
          Your team generated{" "}
          <MonetizationOnIcon sx={{ color: "gold", marginRight: 1 }} />
          {team.coins}
        </Typography>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {withdraws.map((withdraw, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <WithdrawCard data={withdraw} teamCoins={team.coins} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </>
  );
}

export default WithdrawView;
