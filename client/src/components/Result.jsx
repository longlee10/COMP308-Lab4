import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import DefinitionOfValues from "./DefinitionOfValues";
import PredictedResultTable from "./PredictedResultTable";

const Result = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* Handle data from user input */
  const apiPostURL = "api/predict";
  const [postData, setPostData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // post only if data object is not empty
        if (data) {
          const postRes = await axios.post(apiPostURL, data);
          setPostData(postRes.data);
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        navigate("/input");
      }
    };

    fetchData();
  }, []);

  if (loading || !postData[0])
    return (
      <div>
        <Spinner animation="border" role="status">
          <span className="sr-only">Waiting for results...</span>
        </Spinner>
      </div>
    );

  return (
    <div>
      <PredictedResultTable data={postData} />
      <DefinitionOfValues />
    </div>
  );
};

export default Result;
