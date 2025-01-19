const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({
  path: `.env.${ENV}`,
});

// external module
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Local module
const errorController = require("./controllers/errorController");
const exchangeRouter = require("./routers/exchangeRouter");
const exchangeRateService = require('./service/exchangeRateService');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use('/api',exchangeRouter);
app.use(errorController.get404);

const PORT = process.env.PORT || 3000;

async function init(){
  await exchangeRateService.getRates();
  
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

init();