import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { UseAppContext } from "../contexts/AppContext";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const Menus = () => {
  const selectedLocation = localStorage.getItem("selectedLocation");
  const { menus, menuLocations } = UseAppContext();
  // console.log("Menus: ", menus);

  // const handleDelete = async (menuId?: number) => {
  //   if (!menuId) return;
  //   const response = await fetch(`${config.apiUrl}/menus/${menuId}`, {
  //     method: "DELETE",
  //   });
  //   fetchData();
  // };

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
        <Stack direction="row" spacing={3}>
          <Link to="/menus/create-menu">
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
          </Link>
          {filteredMenu.map((item) => {
            return (
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
                      Lizards are a widespread group of squamate reptiles, with
                      over 6,000 species, ranging across all continents except
                      Antarctica
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </Stack>
      </div>
    </Layout>
  );
};
export default Menus;
