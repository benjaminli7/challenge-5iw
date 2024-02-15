import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    fontSize: "3rem",
    marginBottom: theme.spacing(3),
    "@media (max-width:600px)": {
      fontSize: "1.5rem",
    },
  },
  image: {
    maxWidth: "100%",
    height: "auto",
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h1"
            className={`${classes.title} text-3xl md:text-4xl lg:text-5xl`}
          >
            Welcome to Game Elevate, the boosting reservation website.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img
            src="/jeuxvideo.jpg"
            alt="Jeux vidéo"
            className={classes.image}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
