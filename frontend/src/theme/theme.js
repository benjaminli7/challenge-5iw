import { createTheme } from "@mui/material/styles";
import palette from "@/theme/palette";

const theme = createTheme({
  palette,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default theme;
