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

export default determineSpecies;
