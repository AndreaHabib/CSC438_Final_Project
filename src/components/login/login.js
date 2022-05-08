import { useState, React, Fragment } from "react";
import {
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { loginInWithGoogle } from "../../firebase-config";
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

function Login() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth();
  const [loading, setLoading] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsAuthenticated(true);
      navigate("/home");
    } else {
      setIsAuthenticated(false);
    }
  });

  // sample code from firebase-config.js
  // useEffect(() => {
  //   updateUserInfo("QWFhKYtjK6UuqsRFt5YwrbtbShh2", {
  //     favoriteMovies: [12312],
  //     favoriteTvShows: [1231],
  //   });
  // getUserInfo("QWFhKYtjK6UuqsRFt5YwrbtbShh2").then((data) => {
  //   console.log(data);
  // });
  // resetUserInfo("QWFhKYtjK6UuqsRFt5YwrbtbShh2");
  // deleteFavoriteTvShow("QWFhKYtjK6UuqsRFt5YwrbtbShh2", 1231);
  // getUserInfo("QWFhKYtjK6UuqsRFt5YwrbtbShh2").then((data) => {
  //   console.log(data);
  // });
  // }, []);
  const handleEmail = (event) => {
    setInputs({ ...inputs, email: event.target.value });
  };

  const handlePass = (event) => {
    setInputs({ ...inputs, password: event.target.value });
  };

  const authenticate = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, inputs.email, inputs.password)
      // eslint-disable-next-line
      .then((userCredential) => {
        setErrors({});
        setIsAuthenticated(true);
      })
      .catch((error) => {
        // Handle Errors here.
        setIsAuthenticated(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrors({
          errorCode: errorCode,
          errorMessage: errorMessage,
        });
      });
    setLoading(false);

    if (isAuthenticated) {
      navigate("/home");
    }
  };

  return (
    <Fragment>
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
    </Fragment>
  );
}

export default Login;
