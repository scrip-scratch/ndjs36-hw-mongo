const express = require("express");
const router = express.Router();
const Book = require("../models/book");

router.get("/", async (req, res) => {
  try {
    const library = await Book.find();
    res.render("index", {
      title: "МояБиблиотека",
      books: library,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
