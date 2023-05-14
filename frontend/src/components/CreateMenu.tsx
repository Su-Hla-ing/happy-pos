import { Box, TextField, Button } from "@mui/material";
import { Menu } from "../typings/types";
import { useState } from "react";
import { UseAppContext } from "../contexts/AppContext";
import { config } from "../config/config";
import FileDropZone from "./FileDropZone";
import Layout from "./Layout";

const CreateMenu = () => {
  const { fetchData } = UseAppContext();
  // console.log("Menus: ", menus);

  const [menu, setMenu] = useState<Menu | null>(null);
  // console.log(menu);

  const [menuImage, setMenuImage] = useState<File>();
  console.log("menuImage....", menuImage);

  const onFileSelected = (files: File[]) => {
    setMenuImage(files[0]);
  };

  const createMenu = async () => {
    if (menu?.name.length === 0 || menu?.price === 0) {
      return;
    }
    const formData = new FormData();
    formData.append("menu", JSON.stringify(menu));
    formData.append("files", menuImage as Blob);

    const response = await fetch(`${config.apiUrl}/menus`, {
      method: "POST",
      body: formData,
    });

    console.log(response);
  };
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "1.8rem auto",
        }}
      >
        <TextField
          label="Name"
          sx={{ width: "300px", mb: 3 }}
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
          sx={{ width: "300px", mb: 3 }}
          variant="outlined"
          onChange={(e) =>
            setMenu({
              name: menu?.name ? menu.name : "",
              price: parseInt(e.target.value, 10),
            })
          }
          type="number"
        />
        <FileDropZone onFileSelected={onFileSelected} />
        <Box sx={{ mt: "1.5rem", mb: "1.8rem" }}>
          <Button variant="contained" onClick={createMenu}>
            Create
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};
export default CreateMenu;
