import { Box, Button, Chip, TextField } from "@mui/material";
import Layout from "./Layout";
import { useContext, useState } from "react";
import { config } from "../config/config";
import { Menu, MenuCategory } from "../typings/types";
import { Link } from "react-router-dom";
import { UseAppContext } from "../contexts/AppContext";

const MenuCategories = () => {
  const { menuCategories, fetchData, accessToken } = UseAppContext();
  const selectedLocationId = localStorage.getItem("selectedLocation");
  const [menuCategory, setMenuCategory] = useState<MenuCategory>({
    name: "",
  });

  const createMenuCategory = async () => {
    if (!menuCategory.name) return console.log("Please enter menu name");
    const response = await fetch(`${config.apiUrl}/menu-categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(menuCategory),
    });
    fetchData();
  };

  const deleteMenuCategory = async (menuCategoryId: number) => {
    const response = await fetch(
      `${config.apiUrl}/menu-categories/${menuCategoryId}`,
      {
        method: "DELETE",
      }
    );
    fetchData();
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 300,
          m: "0 auto",
        }}
      >
        <h3 style={{ textAlign: "center" }}>Create a new menu categories</h3>
        <TextField
          label="Name"
          variant="outlined"
          sx={{ mb: 2 }}
          onChange={(evt) => setMenuCategory({ name: evt.target.value })}
        />
        <Button variant="contained" onClick={createMenuCategory}>
          Create
        </Button>
        <Box sx={{ mt: 5 }}>
          {menuCategories.map((menuCategory) => (
            <Link key={menuCategory.id} to={`/menus/${menuCategory.id}`}>
              <Chip
                label={menuCategory.name}
                sx={{ mr: 1, mb: 2, cursor: "pointer" }}
                onDelete={() =>
                  menuCategory.id && deleteMenuCategory(menuCategory.id)
                }
              />
            </Link>
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default MenuCategories;
