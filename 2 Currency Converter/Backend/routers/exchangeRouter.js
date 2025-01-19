const express = require("express");
const exchangeRouter = express.Router();
const exchangeController = require("../controllers/exchangeController");

exchangeRouter.post("/convert", exchangeController.convertCurrency);

module.exports = exchangeRouter;
