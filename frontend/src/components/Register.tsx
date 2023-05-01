import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { config } from "../config/config";

const Register = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const registerSubmit = async () => {
    const vaildUserInfo =
      user.name.length && user.email.length > 0 && user.password.length > 0;
    if (!vaildUserInfo) return setOpen(true);
    const response = await fetch(`${config.apiUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });
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
            id="name"
            label="Name"
            variant="outlined"
            type="text"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Box>
        <Box sx={{ mt: "2rem", mb: "1.8rem", textAlign: "center" }}>
          <Button variant="contained" onClick={registerSubmit}>
            Register
          </Button>
          <Typography sx={{ fontSize: "15px", color: "#273E54", mt: "1rem" }}>
            Already have an account?
            <Link style={{ fontSize: "18px", marginLeft: "8px" }} to="/login">
              Login
            </Link>
          </Typography>
        </Box>
      </div>
    </Layout>
  );
};
export default Register;
