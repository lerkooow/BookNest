
import { Router } from "express";
import { addBook, editBook, getBook, listBooks, removeBook } from "../controllers/book.controller.js";


const router = Router();

router.get("/", listBooks);
router.get("/:id", getBook);
router.post("/", addBook);
router.patch("/:id", editBook);
router.delete("/:id", removeBook);

export default router;
