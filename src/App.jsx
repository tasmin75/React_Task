import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CompanySetup from "./pages/CompanySetup/CompanySetup";
import Sidebar from "./components/sidebar/Sidebar";
import Customer from "./pages/customer/Customer";

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<CompanySetup />} />
        <Route path="/customer" element={<Customer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
