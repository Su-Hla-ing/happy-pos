import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import Orders from "./components/Orders";

function App() {
  return (
    <div>
      <Layout>
        <Orders />
      </Layout>
    </div>
  );
}

export default App;
