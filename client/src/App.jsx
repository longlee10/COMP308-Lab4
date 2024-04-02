import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Input from "./components/Input";
import Predefined from "./components/Predefined";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view" element={<Predefined />} />
          <Route path="/input" element={<Input />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
