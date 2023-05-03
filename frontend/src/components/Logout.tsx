import { useEffect } from "react";
import { UseAppContext, defaultContext } from "../contexts/AppContext";
import Layout from "./Layout";

const Logout = () => {
  const { updateData } = UseAppContext();
  useEffect(() => {
    updateData(defaultContext);
  });
  return (
    <Layout>
      <h3>You're loged out.</h3>
    </Layout>
  );
};
export default Logout;
