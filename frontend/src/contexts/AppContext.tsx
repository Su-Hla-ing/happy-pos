import { createContext, useContext, useState, useEffect } from "react";
import {
  Addon,
  AddonCategory,
  Locations,
  Menu,
  MenuCategory,
  MenuLocations,
} from "../typings/types";
import { config } from "../config/config";

interface AppContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
  locations: Locations[];
  menuLocations: MenuLocations[];
  accessToken: string;
  updateData: (value: any) => void;
  fetchData: () => void;
}
export const defaultContext: AppContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  locations: [],
  menuLocations: [],
  accessToken: "",
  updateData: () => {},
  fetchData: () => {},
};

const AppContext = createContext(defaultContext);

export const UseAppContext = () => {
  const posData = useContext(AppContext);
  return posData;
};

const PosAppProvider = ({ children }: any) => {
  const [data, updateData] = useState(defaultContext);

  const fetchData = async () => {
    const response = await fetch(`${config.apiUrl}/data`, {
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    });
    const dataFromServer = await response.json();
    const {
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menuLocations,
    } = dataFromServer;
    updateData({
      ...data,
      menus: menus,
      menuCategories: menuCategories,
      addons: addons,
      addonCategories: addonCategories,
      locations: locations,
      menuLocations: menuLocations,
    });
    console.log("DataFromServer: ", dataFromServer);
  };
  useEffect(() => {
    if (data.accessToken) {
      fetchData();
    }
  }, [data.accessToken]);
  return (
    <AppContext.Provider value={{ ...data, updateData, fetchData }}>
      {children}
    </AppContext.Provider>
  );
};
export default PosAppProvider;
