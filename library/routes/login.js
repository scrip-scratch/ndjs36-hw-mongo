const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const defaultUser = { id: 1, mail: "test@mail.ru" };
  res.json(defaultUser);
});

module.exports = router;
