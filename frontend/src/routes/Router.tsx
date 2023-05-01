import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Menus from "../components/Menus";
import MenuCategories from "../components/MenuCategories";
import Addons from "../components/Addons";
import AddonCategories from "../components/AddonCategories";
import Setting from "../components/Setting";
import MenusDetails from "../components/MenusDetails";
import Login from "../components/Login";
import Register from "../components/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/menus/:menuId",
    element: <MenusDetails />,
  },
  {
    path: "/menus",
    element: <Menus />,
  },
  {
    path: "/menu-categories",
    element: <MenuCategories />,
  },
  {
    path: "/addons",
    element: <Addons />,
  },
  {
    path: "/addon-categories",
    element: <AddonCategories />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/settings",
    element: <Setting />,
  },
]);
export default router;
