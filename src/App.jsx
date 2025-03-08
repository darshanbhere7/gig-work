import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import FinancialDashboard from "./pages/FinancialDashboard";
import RateCalculator from "./pages/RateCalculator";
import ClientManagement from "./pages/ClientManagement";
import SkillDevelopment from "./pages/SkillDevelopment";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DarkModeToggle from "./components/DarkModeToggle";
import './styles/DarkMode.css';

const App = () => {
  return (
    <>
      <Header />
      <DarkModeToggle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/financial-dashboard" element={<FinancialDashboard />} />
        <Route path="/rate-calculator" element={<RateCalculator />} />
        <Route path="/client-management" element={<ClientManagement />} />
        <Route path="/skill-development" element={<SkillDevelopment />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
