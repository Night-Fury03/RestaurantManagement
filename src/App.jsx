import { BrowserRouter as Router, Routes, Route } from "react-router";
import Layout from "./components/shared/Layout";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Tables from "./components/Tables";
import Orders from "./components/Orders";
import History from "./components/History";
import Setting from "./components/Setting";
import { ConfigProvider } from "antd";
import Login from "./components/Login";
import { useState } from "react";
import { Context } from "./components/shared/Context";
const theme = {
  token: {
    colorPrimary: "#EA7C69",
    borderRadius: 8,
    colorText: "#333333",
    colorErrorBg: "#1e1e2d",
  },
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));
  const values = { setIsLoggedIn, isAdmin, setIsAdmin };

  return isLoggedIn ? (
    <Context.Provider value={values}>
      <ConfigProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="Products" element={<Products />} />
              <Route path="Tables" element={<Tables />} />
              <Route path="Orders" element={<Orders />} />
              <Route path="History" element={<History />} />
              <Route path="Settings" element={<Setting />} />
            </Route>
          </Routes>
        </Router>
      </ConfigProvider>
    </Context.Provider>
  ) : (
    <Context.Provider value={values}>
      <Login />
    </Context.Provider>
  );
}

export default App;
