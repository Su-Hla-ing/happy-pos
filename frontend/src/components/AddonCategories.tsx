import { Box, TextField, Button } from "@mui/material";
import Layout from "./Layout";
import { UseAppContext } from "../contexts/AppContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddonCategories = () => {
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
        <Box
          sx={{
            mt: "2rem",
            display: "flex",
            columnGap: "1.5rem",
          }}
        >
          <TextField label="Name" variant="outlined" />
        </Box>
        <Box sx={{ mt: "2rem" }}>
          <Button variant="contained">Addon categories</Button>
        </Box>
      </div>
    </Layout>
  );
};
export default AddonCategories;
