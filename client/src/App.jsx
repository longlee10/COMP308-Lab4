import React, { useState } from "react";
import "./App.css";
import Result from "./components/Result";
import Home from "./components/Home";
import Input from "./components/Input";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  const [data, setData] = useState({});

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result data={data} />} />
          <Route path="/input" element={<Input setData={setData} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
