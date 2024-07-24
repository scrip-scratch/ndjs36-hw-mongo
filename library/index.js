const express = require("express");
const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const booksRouter = require("./routes/books");
const uploadRouter = require("./routes/upload");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.use("/public", express.static(__dirname + "/public"));
app.use("/", indexRouter);
app.use("/upload", uploadRouter);
app.use("/user/login", loginRouter);
app.use("/books", booksRouter);

async function start(PORT, dbUrl) {
  try {
    await mongoose.connect(dbUrl);
    app.listen(PORT, () => console.log(`server is started on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
}

const dbUrl = "mongodb://root:example@mongo:27017/library?authSource=admin";
const PORT = process.env.PORT || 3000;

start(PORT, dbUrl);
