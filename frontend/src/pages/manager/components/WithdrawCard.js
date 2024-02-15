import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Button, Card, Tooltip, Typography } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

function WithdrawCard({ data, teamCoins, handleOpenDialog, setWithdrawCoins }) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent sx={{ padding: 2 }}>
        <Typography
          variant="body1"
          sx={{
            display: "flex",
            justifyCenter: "center",
            alignItems: "center",
            fontWeight: "bold",
          }}
        >
          <MonetizationOnIcon sx={{ color: "gold", marginRight: 1 }} />
          {data.coins}
        </Typography>
      </CardContent>
      <CardActions>
        <Tooltip
          title={data.coins > teamCoins && "Your team don't have enough coins!"}
        >
          <span style={{ width: "100%" }}>
            <Button
              disabled={data.coins > teamCoins ? true : false}
              variant="contained"
              sx={{ width: "100%", fontWeight: "bold" }}
              onClick={() => {
                setWithdrawCoins(data.coins);
                handleOpenDialog()
              }}
            >
              {data.euro} €
            </Button>
          </span>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default WithdrawCard;
