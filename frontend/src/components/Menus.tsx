import { Box, Button, Chip, Stack, TextField } from "@mui/material";
import { UseAppContext } from "../contexts/AppContext";
import Layout from "./Layout";
import { useState } from "react";
import { Menu } from "../typings/types";
import { config } from "../config/config";
import { Link } from "react-router-dom";

const Menus = () => {
  const query = new URLSearchParams(window.location.search);
  const locationId = query.get("locationId") as unknown as string;
  console.log("locationId is...", locationId);

  const { fetchData, menus, menuLocations } = UseAppContext();
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

  const ValidMenuLocation = menuLocations
    .filter((item) => String(item.location_id) === locationId)
    .map((item) => item.menu_id);
  console.log("ValidMenuLocation", ValidMenuLocation);

  const filteredMenu = menus.filter((menu) =>
    ValidMenuLocation.includes(menu.id as number)
  );
  console.log("menuLocation", filteredMenu);

  return (
    <Layout>
      {locationId < "3" ? (
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
            {filteredMenu.map((item) => {
              return (
                <Link key={item.id} to={`/menus/${item.id}`}>
                  <Chip
                    label={item.name}
                    sx={{ cursor: "pointer" }}
                    onDelete={() => handleDelete(item.id)}
                  />
                </Link>
              );
            })}
          </Stack>
        </div>
      ) : (
        <Box>
          <h1>Missing locationId</h1>
        </Box>
      )}
    </Layout>
  );
};
export default Menus;
