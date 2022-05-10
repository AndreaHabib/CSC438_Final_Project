import React, { useState, Fragment } from "react";
import { auth } from "../../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, Link } from "react-router-dom";
import {ThemeProvider} from "@mui/material/styles";
import theme from "../../Styles";

export default function NavBar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      navigate("/login");
    }
  });

  const logout = async () => {
    await signOut(auth);
  };
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyMovie
          </Typography>
          {isAuthenticated ? (
            <Fragment>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  navigate("/home");
                }}
              >
                Home
              </Button>


            </Fragment>
          ) : (
            <Button component={Link} to="/" color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>
  );
}
