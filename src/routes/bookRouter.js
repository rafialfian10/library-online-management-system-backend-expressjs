const router = require("express").Router();

const bookController = require("../controllers/bookController");
const { uploadFile } = require("../pkg/middlewares/uploadFile");
const { adminAuth } = require("../pkg/middlewares/auth");

router.get("/books", bookController.getBooks);
router.get("/book/:id", bookController.getBook);
router.post("/book", adminAuth, uploadFile, bookController.createBook);
router.patch("/book/:id", adminAuth, uploadFile, bookController.updateBook);
router.delete("/book/:id", adminAuth, bookController.deleteBook);
router.delete("/book/:id/image", adminAuth, bookController.deleteBookImage);
router.delete("/book/:id/file", adminAuth, bookController.deleteBookFile);

module.exports = router;
