import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import FormData from "./FormData";
import Result from "./Result";

const Input = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  if (!loading && data.length === 0)
    return (
      <div>
        <FormData setData={setData} setLoading={setLoading} />
      </div>
    );

  if (loading)
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Waiting for results...</span>
      </Spinner>
    );

  if (data.length > 0) return <Result data={data} />;
};

export default Input;
