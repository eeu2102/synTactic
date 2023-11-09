import React from "react";
import Header from "./Header";
import "./App.css";
import HomePage from "./HomePage";
import Dashboard from "./Dashboard";
import Problems from "./Problems";
import Welcome from "./Welcome";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => (
  <div>
    <Header />
    <Routes>
      {/* <Route path="/home" element={<HomePage />} /> */}
      <Route path="/home" element={<Welcome />} />
      <Route path="/problems" element={<Problems />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </div>
);

export default App;
