import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link className="btn btn-primary" to={"/view"}>
        View Testing Data
      </Link>
      <br />
      <Link className="btn btn-primary" to={"/input"}>
        Enter New Data
      </Link>
    </div>
  );
};

export default Home;
