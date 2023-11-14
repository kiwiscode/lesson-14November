const mongoose = require("mongoose");
const Book = require("../models/Book.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/library-project";

const books = [
  {
    title: "Goethe Faust",
    description: "Drama",
    author: "Goethe",
    rating: 7,
  },
  {
    title: "Harry Potter",
    description: "Wizard in Hogwarts",
    author: "J.K Rowling",
    rating: 10,
  },
];

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo Database: ${x.connections[0].name}`);

    return Book.deleteMany();
  })
  .then(() => {
    return Book.create(books);
  })
  .then((booksFromDB) => {
    console.log(`Created ${booksFromDB.length} books`);

    return mongoose.connection.close();
  })
  .then(() => {
    console.log("DB CONNECTION CLOSED");
  })
  .catch((error) => {
    console.log(`An error occurred while creating books from the DB: ${error}`);
  });
