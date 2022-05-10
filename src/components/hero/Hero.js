import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";
import {ThemeProvider} from "@mui/material/styles";
import theme from "../../Styles";

export default function Hero() {
  const navigate = useNavigate();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate("/home");
    } else {
      return;
    }
  });
  return (
    <ThemeProvider theme={theme}>
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "primary.light",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography textAlign="center" variant="h4" sx={{ color: "white" }}>
        Ready to enter a world of endless movies?
      </Typography>
      <Typography textAlign="center" variant="h5" sx={{ color: "white" }}>
        Get started today with MyMovie!
      </Typography>
      <Stack flexDirection="row" sx={{ mt: 2 }}>
        <Button
          component={Link}
          to="/signup"
          sx={{ mr: 1 }}
          variant="contained"
          color="primary"
        >
          Sign up
        </Button>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </Stack>
    </Box>
    </ThemeProvider>
  );
}
