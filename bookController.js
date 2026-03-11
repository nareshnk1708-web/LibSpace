import Book from "../models/book.model.js";

export const createBook = async (req, res) => {
  try {
    const { url, title, author, user } = req.body;

    const book = new Book({
      url,
      title,
      author,
      user
    });

    const savedBook = await book.save();
    res.status(201).json(savedBook);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("user");
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookById = async (req, res) => {
  try {

    const book = await Book.findById("507f1f77bcf86cd799439011");

    res.status(200).json(book);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBook = async (req, res) => {
  try {

    const { id } = req.params;

    await Book.findByIdAndDelete(id);

    res.json({ message: "Book deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};