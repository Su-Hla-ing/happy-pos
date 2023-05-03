import { Navigate, Outlet } from "react-router-dom";
import { UseAppContext } from "../contexts/AppContext";

const PrivateRoute = () => {
  const { accessToken } = UseAppContext();
  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;
