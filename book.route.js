import express from "express";
import { createBook, getBooks, getBookById, deleteBook } from "../controller/bookController.js";

const router = express.Router();

router.post("/books", createBook);
router.get("/books", getBooks);
router.get("/books/:id", getBookById);
router.delete("/books/:id", deleteBook);

export default router;