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

router.get("/books/:bookId/edit", (req, res) => {
  const { bookId } = req.params;
  Book.findById(bookId)
    .then((bookToEdit) => {
      console.log("BOOK THAT WE WANT TO EDIT =>", bookToEdit);

      res.render("books/book-edit.hbs", { book: bookToEdit });
    })
    .catch(() => {
      res
        .status(404)
        .json({ erroMessage: "Error occured while trying to edit book!" });
    });
});

router.post("/books/:bookId/edit", (req, res) => {
  const { bookId } = req.params;
  const { title, author, description, rating } = req.body;
  console.log(title, author, description, rating);

  console.log("BOOK ID THAT WE WANT IT TO UPDATE =>", bookId);

  Book.findByIdAndUpdate(
    bookId,
    { title, description, author, rating },
    { new: true }
  )
    .then((updatedBook) => {
      console.log("BOOK UPDATED !", updatedBook);
      res.redirect(`/books/${updatedBook.id}`);
    })
    .catch(() => {
      console.log("Error occured while fetching data!");
    });
});

router.post("/books/:bookId/delete", (req, res) => {
  const { bookId } = req.params;

  console.log("WHAT YOU WANT TO DO WITH THIS BOOK ID =>", bookId);
  //
  Book.findByIdAndDelete(bookId)
    .then(() => res.status(200).json({ message: "Book deleted 🧼" }))
    .catch(() => {
      console.log("Error occured while you are trying to delete book !!!");
    });
});

module.exports = router;
