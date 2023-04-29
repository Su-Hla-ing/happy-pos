import { Box, Button, Chip, Stack, TextField } from "@mui/material";
import { UseAppContext } from "../contexts/AppContext";
import Layout from "./Layout";
import { useState } from "react";
import { Menu } from "../typings/types";
import { config } from "../config/config";

const Menus = () => {
  const { fetchData, menus } = UseAppContext();
  // console.log("Menus: ", menus);

  const [menu, setMenu] = useState<Menu | null>(null);
  // console.log(menu);

  const createMenu = async () => {
    if (menu?.name.length === 0 || menu?.price === 0) {
      return;
    }
    const response = await fetch(`${config.apiUrl}/menus`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(menu),
    });
    fetchData();
  };

  const handleDelete = async (menuId?: number) => {
    if (!menuId) return;
    const response = await fetch(`${config.apiUrl}/menus/${menuId}`, {
      method: "DELETE",
    });
    fetchData();
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
        <Box
          sx={{
            mt: "2rem",
            display: "flex",
            columnGap: "1.5rem",
          }}
        >
          <TextField
            label="Name"
            onChange={(e) =>
              setMenu({
                name: e.target.value,
                price: menu?.price ? menu.price : 0,
              })
            }
            variant="outlined"
          />
          <TextField
            label="Price"
            variant="outlined"
            onChange={(e) =>
              setMenu({
                name: menu?.name ? menu.name : "",
                price: parseInt(e.target.value, 10),
              })
            }
            type="number"
          />
        </Box>
        <Box sx={{ mt: "2rem", mb: "1.8rem" }}>
          <Button variant="contained" onClick={createMenu}>
            Create
          </Button>
        </Box>

        <Stack direction="column" spacing={3}>
          {menus.map((item) => {
            return (
              <Chip
                key={item.id}
                label={item.name}
                onDelete={() => handleDelete(item.id)}
              />
            );
          })}
        </Stack>
      </div>
    </Layout>
  );
};
export default Menus;
