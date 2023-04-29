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
  fetchData: () => void;
}
const defaultContext: AppContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
  locations: [],
  menuLocations: [],
  fetchData: () => {},
};

const AppContext = createContext(defaultContext);

export const UseAppContext = () => {
  const posData = useContext(AppContext);
  return posData;
};

const PosAppProvider = ({ children }: any) => {
  const [data, setData] = useState(defaultContext);
  const fetchData = async () => {
    const response = await fetch(`${config.apiUrl}/data`);
    const dataFromServer = await response.json();
    setData(dataFromServer);
    console.log("DataFromServer: ", dataFromServer);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AppContext.Provider value={{ ...data, fetchData }}>
      {children}
    </AppContext.Provider>
  );
};
export default PosAppProvider;
