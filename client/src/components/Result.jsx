import React from "react";
import DefinitionOfValues from "./DefinitionOfValues";
import PredictedResultTable from "./PredictedResultTable";

const Result = ({ data }) => {
  return (
    <div>
      <PredictedResultTable data={data} />
      <DefinitionOfValues />
    </div>
  );
};

export default Result;
