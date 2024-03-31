import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

const Result = ({ data }) => {
  const apiURL = "api/predict";
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(apiURL, data);
        setResponse(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [data]);

  if (loading || !response[0])
    return (
      <div>
        <Spinner animation="border" role="status">
          <span className="sr-only">Waiting for results...</span>
        </Spinner>
      </div>
    );

  return (
    <div>
      <h1>Prediction Results</h1>
      <table className="App-table">
        <thead>
          <tr>
            <th colSpan={3} className="App-th">
              Test Results
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="App-td">{response[0][0]}</td>
            <td className="App-td">{response[0][1]}</td>
            <td className="App-td">{response[0][2]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Result;
