import { createContext, useContext, useState } from "react";
import { Addon, AddonCategory, Menu, MenuCategory } from "../typings/types";

interface AppContextType {
  menus: Menu[];
  menuCategories: MenuCategory[];
  addons: Addon[];
  addonCategories: AddonCategory[];
}
const defaultContext: AppContextType = {
  menus: [],
  menuCategories: [],
  addons: [],
  addonCategories: [],
};

const AppContext = createContext(defaultContext);

export const UseAppContext = () => {
  const posData = useContext(AppContext);
  return posData;
};

const PosAppProvider = ({ children }: any) => {
  const [data, setData] = useState(defaultContext);
  return (
    <AppContext.Provider value={{ ...data }}>{children}</AppContext.Provider>
  );
};
export default PosAppProvider;
