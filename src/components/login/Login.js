import { useState, React, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, login, loginInWithGoogle } from "../../firebase-config";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import {
  FormControl,
  TextField,
  FormGroup,
  Alert,
  CircularProgress,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../Styles";

function Login() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsAuthenticated(true);
      navigate("/home");
    } else {
      setIsAuthenticated(false);
    }
  });

  const handleEmail = (event) => {
    setInputs({ ...inputs, email: event.target.value });
  };

  const handlePass = (event) => {
    setInputs({ ...inputs, password: event.target.value });
  };

  const authenticate = async () => {
    setLoading(true);
    await login(inputs.email, inputs.password)
      .then((user) => {
        setErrors({});
        if (user) {
          setIsAuthenticated(true);
        }
      })
      .catch((error) => {
        setErrors({
          errorMessage: error.message,
          errorCode: error.code,
        });
      });
    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              MyMovie
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      {isAuthenticated === false ? (
        <Box sx={{ padding: "80px" }} component="form">
          <FormGroup className="form">
            <FormControl variant="standard" sx={{ width: "100%", m: 0.5 }}>
              <TextField
                autoComplete="email"
                variant="filled"
                type="email"
                required
                onChange={handleEmail}
                id="email"
                label="Email"
                aria-describedby="enter email"
              />
            </FormControl>
            <FormControl variant="standard" sx={{ width: "100%", m: 0.5 }}>
              <TextField
                autoComplete="current-password"
                variant="filled"
                required
                type="password"
                onChange={handlePass}
                id="password"
                label="Password"
                aria-describedby="enter password"
              />
            </FormControl>
            {loading ? <CircularProgress /> : undefined}
            <Button variant="contained" onClick={authenticate}>
              Login
            </Button>
            <Button
              sx={{ mt: 2 }}
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={loginInWithGoogle}
            >
              Sign in with Google
            </Button>
            {Object.keys(errors).length > 0 ? (
              <Alert sx={{ mt: 2 }} severity="error">
                Incorrect Email or Password!
              </Alert>
            ) : undefined}
          </FormGroup>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography textAlign="center" sx={{ mt: 2 }} variant="body1">
              Don't have an account?
            </Typography>
            <Button
              sx={{ margin: "0 auto" }}
              variant="contained"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
          </Box>
        </Box>
      ) : undefined}
    </ThemeProvider>
  );
}

export default Login;
