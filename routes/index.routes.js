const express = require("express");
const router = express.Router();

const Book = require("../models/Book.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
