import React, { useRef } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

const FormData = ({ setData, setLoading }) => {
  const sepalLength = useRef();
  const sepalWidth = useRef();
  const petalLength = useRef();
  const petalWidth = useRef();
  const epochs = useRef();
  const learningRate = useRef();
  const apiPostURL = "api/predict";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const testingData = {
      irisTesting: [
        {
          sepal_length: parseFloat(sepalLength.current.value),
          sepal_width: parseFloat(sepalWidth.current.value),
          petal_length: parseFloat(petalLength.current.value),
          petal_width: parseFloat(petalWidth.current.value),
        },
      ],
      learningRate: parseFloat(learningRate.current.value),
      noOfEpochs: parseInt(epochs.current.value),
    };

    try {
      setLoading(true);
      const res = await axios.post(apiPostURL, testingData);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Sepal Length</Form.Label>
          <Form.Control
            type="text"
            placeholder="Sepal Length"
            ref={sepalLength}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Sepal Width</Form.Label>
          <Form.Control
            type="text"
            placeholder="Sepal Width"
            ref={sepalWidth}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Petal Length</Form.Label>
          <Form.Control
            type="text"
            placeholder="Petal Length"
            ref={petalLength}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Petal Width</Form.Label>
          <Form.Control
            type="text"
            placeholder="Petal Length"
            ref={petalWidth}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Epochs</Form.Label>
          <Form.Control type="text" placeholder="Epochs" ref={epochs} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Learning Rate</Form.Label>
          <Form.Control
            type="text"
            placeholder="Learning Rate"
            ref={learningRate}
          />
        </Form.Group>

        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormData;
