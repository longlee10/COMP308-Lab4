import React from "react";
import determineSpecies from "../determineSpecies";

const PredictedResultTable = ({ data }) => {
  return (
    <>
      <h2>Prediction Results</h2>
      <table className="App-table mb-5">
        <thead>
          <tr>
            <th className="App-th">Test 1</th>
            <th className="App-th">Species</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="App-td">{`${data[0][0]}, ${data[0][1]}, ${data[0][2]}`}</td>
            <td className="App-td">
              {determineSpecies([data[0][0], data[0][1], data[0][2]])}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PredictedResultTable;
