// Load the 'index' controller
const {
  predictTestingData,
  predictInputData,
} = require("../controllers/index.server.controller");

// Define the routes module' method
module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index", {
      info: "see the results in console window",
    });
  });

  app.get("/run", predictTestingData);
  app.post("/predict", predictInputData);
};
