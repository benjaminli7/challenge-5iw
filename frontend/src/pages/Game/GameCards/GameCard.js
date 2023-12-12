import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const GameCard = ({ game }) => {
  return (
    <Card
      sx={{
        maxWidth: 900,
        backgroundColor: game.color,
        margin: 2,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.1)",
        },
        height: 300,
        width: "100%",
        borderRadius: "15px",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          alt={game.name}
          style={{ objectFit: "cover", height: "200px" }}
          image={
            (game.fileUrl && process.env.REACT_APP_API_URL + game.fileUrl) ||
            "/reptile.jpg"
          }
        />

        <CardContent height={100}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: "white",
              fontFamily: "Keania One, cursive",
              fontSize: "2rem",
              textTransform: "uppercase",
            }}
          >
            {game.name}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "white",
              fontSize: "18px",
              fontFamily: "Montserrat, sans-serif",
              opacity: 0.87,
              marginTop: 0,
              fontWeight: 500,
            }}
          >
            {"Lets Play ! "}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default GameCard;
