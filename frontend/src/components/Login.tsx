import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import Layout from "./Layout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { config } from "../config/config";
import { UseAppContext } from "../contexts/AppContext";

const Login = () => {
  const navigate = useNavigate();
  const { updateData, ...data } = UseAppContext();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });

  const loginSubmit = async () => {
    const vaildUserInfo = user.email.length > 0 && user.password.length > 0;
    if (!vaildUserInfo) return setOpen(true);
    try {
      const response = await fetch(`${config.apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const responseData = await response.json();
        updateData({ ...data, accessToken: responseData.accessToken });
        return navigate("/");
      }
      setOpen(true);
    } catch (error) {
      console.log("err: ", error);
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "0 auto",
        }}
      >
        <div>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Please fill your email and password!
            </Alert>
          </Snackbar>
        </div>

        <Box
          sx={{
            width: "400px",
            mt: "2rem",
            display: "flex",
            flexDirection: "column",
            columnGap: "1.5rem",
            rowGap: "1.5rem",
          }}
        >
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                loginSubmit();
              }
            }}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                loginSubmit();
              }
            }}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Box>
        <Box sx={{ mt: "2rem", mb: "1.8rem", textAlign: "center" }}>
          <Button variant="contained" onClick={loginSubmit}>
            login
          </Button>
          <Typography sx={{ fontSize: "15px", color: "#273E54", mt: "1rem" }}>
            Don't have an account?{" "}
            <Link
              style={{ fontSize: "18px", marginLeft: "8px" }}
              to="/register"
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </div>
    </Layout>
  );
};
export default Login;
