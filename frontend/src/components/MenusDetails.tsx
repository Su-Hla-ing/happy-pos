import { useParams } from "react-router-dom";
import { UseAppContext } from "../contexts/AppContext";
import Layout from "./Layout";
import { Menu } from "../typings/types";
import { Box, Button, TextField } from "@mui/material";
import { config } from "../config/config";
import { useEffect, useState } from "react";

const MenusDetails = () => {
  const { menus, menuLocations } = UseAppContext();
  console.log("data", menus);
  const { menuId } = useParams();

  let menuItem: Menu | undefined;
  if (menuId) {
    menuItem = menus.find((item) => item.id === parseInt(menuId, 10));

    if (menuItem) {
      const menuLocation = menuLocations.find(
        (item) => item.menu_id === menuItem?.id
      );

      if (menuLocation) {
        menuItem.isAvailable = menuLocation.is_available;
      }
    }
  }

  const [newMenu, setNewMenu] = useState({ name: "", price: 0 });

  useEffect(() => {
    if (menuItem) {
      console.log("menuItem ", menuItem);
      setNewMenu({ name: menuItem.name, price: menuItem.price });
    }
  }, [menuItem]);

  const UpdateMenu = async () => {
    const response = await fetch(`${config.apiUrl}/menus/${menuItem?.id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newMenu),
    });
    console.log(await response.json());
  };

  return (
    <Layout>
      <Box>
        {menuItem ? (
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
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                defaultValue={menuItem.name}
                onChange={(evt) => {
                  setNewMenu({ ...newMenu, name: evt.target.value });
                }}
              />
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                type="number"
                defaultValue={menuItem.price}
                onChange={(evt) => {
                  setNewMenu({
                    ...newMenu,
                    price: parseInt(evt.target.value, 10),
                  });
                }}
              />
            </Box>
            <Box sx={{ mt: "2rem", mb: "1.8rem" }}>
              <Button variant="contained" onClick={UpdateMenu}>
                Update Menu
              </Button>
            </Box>
          </div>
        ) : (
          <h1>page not found</h1>
        )}
      </Box>
    </Layout>
  );
};
export default MenusDetails;
