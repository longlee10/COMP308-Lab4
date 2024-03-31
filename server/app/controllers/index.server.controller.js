//
//https://github.com/PacktPublishing/Hands-on-Machine-Learning-with-TensorFlow.js/tree/master/Section5_4
//
// const tf = require("@tensorflow/tfjs");
const tf = require("@tensorflow/tfjs-node");
//load iris training and testing data
const iris = require("../../iris.json");
const irisTesting = require("../../iris-testing.json");

// build neural network using a sequential model
const createModel = (learningRate = 0.06) => {
  const model = tf.sequential();
  // Add the first layer with relu activation
  model.add(
    tf.layers.dense({
      inputShape: [4], // Four input features: sepal length, sepal width, petal length, petal width
      units: 8, // Experiment with the number of units
      activation: "relu",
    })
  );
  // Add 2nd dense layer (optional, experiment with adding or removing layers)
  model.add(
    tf.layers.dense({
      units: 10, // Experiment with the number of units
      activation: "relu",
    })
  );
  // Add 3rd dense layer (optional, experiment with adding or removing layers)
  model.add(
    tf.layers.dense({
      units: 10, // Experiment with the number of units
      activation: "relu",
    })
  );
  // Add the output layer with softmax activation for multi-class classification
  model.add(
    tf.layers.dense({
      units: 3, // Three output units for three classes: setosa, virginica, versicolor
      activation: "softmax",
    })
  );
  // Compile the model
  model.compile({
    optimizer: tf.train.adam(learningRate), // Experiment with different learning rates
    loss: "categoricalCrossentropy", // Use categoricalCrossentropy for multi-class classification
    metrics: ["accuracy"], // Include accuracy as a metric for evaluation
  });

  return model;
};

// Train the model and predict the results for testing data
const trainModel = async (
  model,
  trainingData,
  outputData,
  testingData,
  noOfEpochs = 100
) => {
  const startTime = Date.now();
  // train/fit the model for the fixed number of epochs
  await model.fit(trainingData, outputData, {
    epochs: noOfEpochs,
    callbacks: {
      //list of callbacks to be called during training
      onEpochEnd: async (epoch, log) => {
        console.log(
          `Epoch ${epoch}: lossValue = ${log.loss}, accuracy = ${log.acc}`
        );
        console.log(`elapsed time: ${Date.now() - startTime} ms`);
      },
    },
  });

  const results = model.predict(testingData);
  //console.log('prediction results: ', results.dataSync())
  // results.print();

  // get the values from the tf.Tensor
  // var tensorData = results.dataSync();
  results.array().then((array) => {
    // Assuming array contains the softmax output
    const predictions = array.map((row) => {
      const highestProbIndex = row.findIndex((val) => val === Math.max(...row));
      switch (highestProbIndex) {
        case 0:
          return "setosa";
        case 1:
          return "virginica";
        case 2:
          return "versicolor";
        default:
          return "Unknown";
      }
    });
  });

  // Example: Sending the first three predictions
  const predictedData = results.arraySync();
  console.log(predictedData);
  return predictedData;
};

const predictTestingData = async function (req, res) {
  console.log(irisTesting);

  // convert/setup our data for tensorflow.js
  // tensor of features for training data include only features, not the output
  const trainingData = tf.tensor2d(
    iris.map((item) => [
      item.sepal_length,
      item.sepal_width,
      item.petal_length,
      item.petal_width,
    ])
  );
  //console.log(trainingData.dataSync())

  // tensor of output for training data the values for species will be:
  // setosa:       1,0,0
  // virginica:    0,1,0
  // versicolor:   0,0,1
  const outputData = tf.tensor2d(
    iris.map((item) => [
      item.species === "setosa" ? 1 : 0,
      item.species === "virginica" ? 1 : 0,
      item.species === "versicolor" ? 1 : 0,
    ])
  );

  // tensor of features for testing data
  const testingData = tf.tensor2d(
    irisTesting.map((item) => [
      item.sepal_length,
      item.sepal_width,
      item.petal_length,
      item.petal_width,
    ])
  );

  // create neural network
  const model = createModel();
  console.log(model.summary());

  //Train the model and predict the results for testing data
  const predictedData = await trainModel(
    model,
    trainingData,
    outputData,
    testingData
  );
  res.status(200).send(predictedData);
};

const predictInputData = async function (req, res) {
  const { irisTesting, learningRate, noOfEpochs } = req.body;
  console.log(irisTesting);

  // convert/setup our data for tensorflow.js
  // tensor of features for training data include only features, not the output
  const trainingData = tf.tensor2d(
    iris.map((item) => [
      item.sepal_length,
      item.sepal_width,
      item.petal_length,
      item.petal_width,
    ])
  );
  //console.log(trainingData.dataSync())

  // tensor of output for training data the values for species will be:
  // setosa:       1,0,0
  // virginica:    0,1,0
  // versicolor:   0,0,1
  const outputData = tf.tensor2d(
    iris.map((item) => [
      item.species === "setosa" ? 1 : 0,
      item.species === "virginica" ? 1 : 0,
      item.species === "versicolor" ? 1 : 0,
    ])
  );

  // tensor of features for testing data
  const testingData = tf.tensor2d(
    irisTesting.map((item) => [
      item.sepal_length,
      item.sepal_width,
      item.petal_length,
      item.petal_width,
    ])
  );

  // create neural network
  const model = createModel(learningRate);
  console.log(model.summary());

  //Train the model and predict the results for testing data
  const predictedData = await trainModel(
    model,
    trainingData,
    outputData,
    testingData,
    noOfEpochs
  );
  res.status(200).send(predictedData);
};

module.exports = {
  predictTestingData,
  predictInputData,
};
