const express = require("express");
const router = express();
const Book = require("../models/Book.model");

router.get("/books", (req, res) => {
  Book.find()
    .then((allTheBooksFromDB) => {
      console.log(
        "Retrieved books from DB: ",
        allTheBooksFromDB[allTheBooksFromDB.length - 1]
      );

      res.render("books/books-list.hbs", { books: allTheBooksFromDB });
      //   res.send(allTheBooksFromDB[allTheBooksFromDB.length - 1]);
    })
    .catch((error) => {
      console.log("Error while getting the books from the DB: ", error);
      next(error);
    });
});

router.get("/books/:bookId", (req, res) => {
  const { bookId } = req.params;

  console.log("The ID from the URL is => ", bookId);

  Book.findById(bookId)
    .then((theBook) => res.render("books/book-details.hbs", { book: theBook }))
    .catch(() => {
      res.send("Error occured while fetching the book detail!");
    });
});

router.get("/book/create", (req, res) => {
  //   res.send("Route is working !");
  res.render("books/book-create.hbs");
});

router.post("/book/create", (req, res) => {
  const { title, description, author, rating } = req.body;

  Book.create({
    title,
    description,
    author,
    rating,
  })
    .then(() => {
      res.status(200).json({ message: "Book created !" });
    })
    .catch((errro) => {
      res.status(500).json({ errorMessage: "There is an error ! " });
    });
  console.log(title, description, author, rating);
});

module.exports = router;
