import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import Layout from "./Layout";
import { UseAppContext } from "../contexts/AppContext";
import { Locations } from "../typings/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const { locations } = UseAppContext();
  console.log("Locations...", locations);

  const [selectedLocation, setSelectedLocation] = useState<
    Locations | undefined
  >();
  console.log("selectedLocation.....", selectedLocation);

  useEffect(() => {
    if (locations.length) {
      const selectedLocationId = localStorage.getItem("selectedLocation");
      if (!selectedLocationId) {
        localStorage.setItem("selectedLocation", String(locations[0].id));
        setSelectedLocation(locations[0]);
      } else {
        const selectedlocations = locations.find(
          (location) => String(location.id) === selectedLocationId
        );
        // console.log("selectedlocations ", selectedlocations);
        setSelectedLocation(selectedlocations);
      }
    }
  }, [locations]);

  const handleOnChange = (e: SelectChangeEvent<number>) => {
    localStorage.setItem("selectedLocation", String(e.target.value));
    const filteredLocation = locations.find(
      (item) => item.id === e.target.value
    );
    // console.log("filteredLocation...", filteredLocation);
    setSelectedLocation(filteredLocation);
  };

  return (
    <Layout>
      <div
        style={{
          width: "400px",
          margin: "2rem auto",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Location</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedLocation ? selectedLocation.id : ""}
            label="Location"
            onChange={handleOnChange}
          >
            {locations.map((item) => {
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    </Layout>
  );
};
export default Setting;
