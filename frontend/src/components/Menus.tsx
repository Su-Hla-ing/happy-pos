import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { UseAppContext } from "../contexts/AppContext";
import Layout from "./Layout";
import { useState, useEffect } from "react";
import { Menu } from "../typings/types";
import { config } from "../config/config";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const Menus = () => {
  const selectedLocation = localStorage.getItem("selectedLocation");
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
    .filter((item) => String(item.location_id) === selectedLocation)
    .map((item) => item.menu_id);
  console.log("ValidMenuLocation", ValidMenuLocation);

  const filteredMenu = menus.filter((menu) =>
    ValidMenuLocation.includes(menu.id as number)
  );
  console.log("menuLocation", filteredMenu);

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "1.8rem auto",
        }}
      >
        {/* <Box
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
        </Box> */}

        <Stack direction="row" spacing={3}>
          <Box
            sx={{
              width: "300px",
              height: "300px",
              border: "2px dotted lightgray",
              borderRadius: 2,
              mr: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            <AddIcon fontSize="large" />
            <Typography>Add new menu</Typography>
          </Box>
          {filteredMenu.map((item) => {
            return (
              <>
                <Link
                  key={item.id}
                  to={`/menus/${item.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card sx={{ width: "300px", height: "300px" }}>
                    <CardMedia
                      sx={{ height: 140 }}
                      image="https://bit.ly/3MfJNFg"
                      title="mote hinn khar"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles,
                        with over 6,000 species, ranging across all continents
                        except Antarctica
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </>
            );
          })}
        </Stack>
      </div>
    </Layout>
  );
};
export default Menus;
