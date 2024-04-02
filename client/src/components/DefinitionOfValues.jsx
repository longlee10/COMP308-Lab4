import React from "react";

const DefinitionOfValues = () => {
  return (
    <>
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
    </>
  );
};

export default DefinitionOfValues;
