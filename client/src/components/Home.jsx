import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link className="btn btn-primary" to={"/input"}>
        Add Training Data
      </Link>
    </div>
  );
};

export default Home;
