import React, { useState, Fragment } from "react";
import { auth } from "../../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { MenuItem, Container } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorElNav, setAnchorEl] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNavMenu = (location) => {
    setAnchorEl(null);
    navigate(location);
  };

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
    <AppBar position="static" sx={{ zIndex: "100", mb: 3 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MyMovie
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={() => handleCloseNavMenu("/home")}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleCloseNavMenu("/favorites")}>
                <Typography textAlign="center">Favorites</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleCloseNavMenu("/trailers")}>
                <Typography textAlign="center">Trailers</Typography>
              </MenuItem>
              {isAuthenticated ? (
                <MenuItem onClick={logout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={() => handleCloseNavMenu("/login")}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MyMovie
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => handleCloseNavMenu("/home")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
            <Button
              onClick={() => handleCloseNavMenu("/trailers")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Trailers
            </Button>
            <Button
              onClick={() => handleCloseNavMenu("/favorites")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Favorites
            </Button>
            {isAuthenticated ? (
              <Button
                onClick={logout}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => handleCloseNavMenu("/login")}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
