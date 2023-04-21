import { Box, Button, TextField } from "@mui/material";
import { UseAppContext } from "../contexts/AppContext";
import Layout from "./Layout";

const Menus = () => {
  const posData = UseAppContext();
  console.log(posData);
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
          <TextField label="Price" variant="outlined" type="number" />
        </Box>
        <Box sx={{ mt: "2rem" }}>
          <Button variant="contained">Create</Button>
        </Box>
      </div>
    </Layout>
  );
};
export default Menus;
