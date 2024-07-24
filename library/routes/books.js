const express = require("express");
const axios = require("axios");
const router = express.Router();
const { v4: uuid } = require("uuid");
const fileMulter = require("../middleware/file");
const Book = require("../models/book");

router.post(
  "/",
  fileMulter.fields([
    {
      name: "bookFile",
      maxCount: 1,
    },
    {
      name: "bookCover",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    const newBookData = {
      id: uuid(),
      title: req.body.bookTitle,
      description: req.body.bookDescription,
      authors: req.body.bookAuthors,
      favorite: "",
      fileCover: req.files.bookCover[0].filename,
      fileName: req.files.bookFile[0].filename,
    };

    const newBook = new Book(newBookData);
    await newBook.save();

    res.redirect("/");
  }
);

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const booksResponse = await Book.find({ id: id });

  if (booksResponse.length === 1) {
    const book = booksResponse[0];
    console.log(book);
    await axios({
      method: "post",
      url: `http://counter:4000/counter/${id}/incr`,
    });
    const response = await axios({
      method: "get",
      url: `http://counter:4000/counter/${id}`,
    });
    const count = response.data.count;
    res.render("book", {
      book: book,
      views: count,
    });
  } else {
    res.render("404", {
      errorMessage: "Книга не найдена",
    });
  }
});

router.get("/update/:id", async (req, res) => {
  const { id } = req.params;
  const booksResponse = await Book.find({ id: id });

  if (booksResponse.length === 1) {
    const book = booksResponse[0];
    res.render("update", {
      book: book,
    });
  } else {
    res.render("404", {
      errorMessage: "Книга не найдена",
    });
  }
});

router.get("/:id/download", async (req, res) => {
  const { id } = req.params;
  const booksResponse = await Book.find({ id: id });

  if (booksResponse.length === 1) {
    const filePath =
      __dirname + "/../public/books/" + booksResponse[0].fileName;
    res.download(filePath, function (err) {
      if (err) console.log(err);
    });
  } else {
    res.status(404);
    res.json("404 | book not found");
  }
});

router.post(
  "/update",
  fileMulter.fields([
    {
      name: "bookFile",
      maxCount: 1,
    },
    {
      name: "bookCover",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    const id = req.body.bookId;

    await Book.findOneAndUpdate(
      { id: id },
      {
        title: req.body.bookTitle,
        description: req.body.bookDescription,
        authors: req.body.bookAuthors,
        fileCover:
          req.files.bookCover && req.files.bookCover[0].filename
            ? req.files.bookCover[0].filename
            : undefined,
        fileName:
          req.files.bookFile && req.files.bookFile[0].filename
            ? req.files.bookFile[0].filename
            : undefined,
      }
    );

    res.redirect("/");
  }
);

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await Book.deleteOne({ id: id });
  res.redirect("/");
});

module.exports = router;
