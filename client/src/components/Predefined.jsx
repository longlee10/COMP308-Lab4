import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import DefinitionOfValues from "./DefinitionOfValues";
import determineSpecies from "../determineSpecies";

function Predefined() {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "api/run";

  const fetchData = async () => {
    try {
      const result = await axios.get(apiUrl);
      console.log("result.data:", result.data);
      setData(result.data);
      setShowLoading(false);
    } catch (error) {
      console.log("error in fetchData:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {showLoading === false ? (
        <div>
          {showLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}

          {/* Table for Test Results */}
          <h2>Prediction Results</h2>
          <table className="App-table mb-5">
            <thead>
              <tr>
                <th className="App-th">Test 1</th>
                <th className="App-th">Test 2</th>
                <th className="App-th">Test 3</th>
                <th className="App-th">Species</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="App-td">
                  {data[0] &&
                    data[0].map((value, index) => <p key={index}>{value}</p>)}
                </td>
                <td className="App-td">
                  {data[1] &&
                    data[1].map((value, index) => <p key={index}>{value}</p>)}
                </td>
                <td className="App-td">
                  {data[2] &&
                    data[2].map((value, index) => <p key={index}>{value}</p>)}
                </td>
                <td className="App-td">
                  {data[0] && data[1] && data[2] && (
                    <div>
                      <p>
                        {determineSpecies([data[0][0], data[1][0], data[2][0]])}
                      </p>
                      <p>
                        {determineSpecies([data[0][1], data[1][1], data[2][1]])}
                      </p>
                      <p>
                        {determineSpecies([data[0][2], data[1][2], data[2][2]])}
                      </p>
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Table for Species Values */}
          <DefinitionOfValues />

          <Link className="btn btn-primary mt-3" to="/input">
            Enter new data
          </Link>
        </div>
      ) : (
        <div>
          {showLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Waiting for results...</span>
            </Spinner>
          )}
        </div>
      )}
    </div>
  );
}

export default Predefined;
