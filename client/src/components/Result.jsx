import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Result = ({ data }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* Handle sample server data */
  const apiGetURL = "api/run";
  const [getData, setGetData] = useState({});

  /* Handle data from user input */
  const apiPostURL = "api/predict";
  const [postData, setPostData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // post only if data is available
        if (data) {
          const postRes = await axios.post(apiPostURL, data);
          setPostData(postRes.data);
        }

        const getRes = await axios.get(apiGetURL);
        setGetData(getRes.data);

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
      <h1>Prediction Results</h1>
      <table className="App-table">
        <thead>
          <tr>
            <th colSpan={3} className="App-th text-center">
              Predicted Data
            </th>
          </tr>
        </thead>

        <tbody>
          {data && (
            <tr>
              <td className="App-td">{postData[0][0]}</td>
              <td className="App-td">{postData[0][1]}</td>
              <td className="App-td">{postData[0][2]}</td>
            </tr>
          )}
          <tr>
            <td className="App-td">{getData[0][0]}</td>
            <td className="App-td">{getData[0][1]}</td>
            <td className="App-td">{getData[0][2]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Result;
