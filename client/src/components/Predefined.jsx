import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

function Predefined() {
  const [data, setData] = useState([]);
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

  // Function to determine species based on values
  const determineSpecies = (values) => {
    const threshold = 0.5; // You can adjust this threshold based on your specific scenario
    if (
      values[0] >= threshold &&
      values[1] < threshold &&
      values[2] < threshold
    ) {
      return "setosa";
    } else if (
      values[0] < threshold &&
      values[1] >= threshold &&
      values[2] < threshold
    ) {
      return "virginica";
    } else if (
      values[0] < threshold &&
      values[1] < threshold &&
      values[2] >= threshold
    ) {
      return "versicolor";
    } else {
      return "Unknown"; // Add a default case or handle other scenarios as needed
    }
  };

  if (showLoading) {
    return (
      <div>
        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Waiting for results...</span>
          </Spinner>
        )}
      </div>
    );
  }

  return (
    <div>
      <h1>Prediction Results</h1>
      {data.length > 0 ? (
        <div>
          {/* Table for Test Results */}
          <table className="App-table">
            <thead>
              <tr>
                <th className="App-th">Test 1</th>
                <th className="App-th">Test 2</th>
                <th className="App-th">Test 3</th>
                <th className="App-th">Species</th> {/* New Column */}
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
        </div>
      ) : (
        <div>
          <h2>No data found</h2>
        </div>
      )}

      {/* Table for Species Values */}
      <h2>Definition of Values for Species</h2>
      <table className="App-table">
        <thead>
          <tr>
            <th className="App-th">Species</th>
            <th className="App-th">Values</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="App-td">setosa</td>
            <td className="App-td">1, 0, 0</td>
          </tr>
          <tr>
            <td className="App-td">virginica</td>
            <td className="App-td">0, 1, 0</td>
          </tr>
          <tr>
            <td className="App-td">versicolor</td>
            <td className="App-td">0, 0, 1</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Predefined;
