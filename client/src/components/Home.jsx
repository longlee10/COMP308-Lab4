import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="mb-3">Welcome to plant prediction center!</h2>

      <Link className="btn btn-primary mb-3" to={"/view"}>
        View Testing Data
      </Link>

      <Link className="btn btn-primary" to={"/input"}>
        Enter New Data
      </Link>
    </div>
  );
};

export default Home;
