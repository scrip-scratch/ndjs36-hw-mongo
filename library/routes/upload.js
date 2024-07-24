const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("upload", {
    title: "Загрузить книгу",
  });
});

module.exports = router;
