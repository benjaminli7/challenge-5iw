import React from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, Card, Typography } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

function WithdrawCard({ data }) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        width: 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent sx={{ padding: 2 }}>
        <Typography gutterBottom variant="h4" component="div" fontWeight="bold">
          {data.title}
        </Typography>
        <Typography
          variant="body1"
          color="text.primary"
          sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
        >
          <MonetizationOnIcon sx={{ color: "gold", marginRight: 1 }} />
          {data.coins} coins
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" sx={{ width: "100%", fontWeight: "bold" }}>
          {data.euro} €
        </Button>
      </CardActions>
    </Card>
  );
}

export default WithdrawCard;
