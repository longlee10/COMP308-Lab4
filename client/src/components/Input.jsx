import React, { useRef } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Input = ({ setData }) => {
  const sepalLength = useRef();
  const sepalWidth = useRef();
  const petalLength = useRef();
  const petalWidth = useRef();
  const epochs = useRef();
  const learningRate = useRef();
  const navigate = useNavigate();

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
      setData(testingData);
      navigate("/result");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div onSubmit={handleSubmit}>
      <form>
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

export default Input;
