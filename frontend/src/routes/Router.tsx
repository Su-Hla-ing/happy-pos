import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Menus from "../components/Menus";
import MenuCategories from "../components/MenuCategories";
import AddonCategories from "../components/AddonCategories";
import Setting from "../components/Setting";
import MenusDetails from "../components/MenusDetails";
import Login from "../components/Login";
import Register from "../components/Register";
import PrivateRoute from "./PrivateRoute";
import Addons from "../components/Addons";
import Logout from "../components/Logout";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/menus/:menuId",
//     element: <MenusDetails />,
//   },
//   {
//     path: "/menus",
//     element: <Menus />,
//   },
//   {
//     path: "/menu-categories",
//     element: <MenuCategories />,
//   },
//   {
//     path: "/addons",
//     element: <Addons />,
//   },
//   {
//     path: "/addon-categories",
//     element: <AddonCategories />,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/settings",
//     element: <Setting />,
//   },
// ]);

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/orders" Component={App}></Route>
          <Route path="/" Component={App}></Route>
          <Route path="/menus" Component={Menus}></Route>
          <Route path="/menus/:menuId" Component={MenusDetails}></Route>
          <Route path="/addons" Component={Addons}></Route>
          <Route path="/addon-categories" Component={AddonCategories}></Route>
          <Route path="/menu-categories" Component={MenuCategories}></Route>
          <Route path="/settings" Component={Setting}></Route>
        </Route>
        <Route path="/login" Component={Login}></Route>
        <Route path="/logout" Component={Logout}></Route>
        <Route path="/register" Component={Register}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
