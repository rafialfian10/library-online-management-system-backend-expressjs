const router = require("express").Router();

const categoryController = require("../controllers/categoryController");
const { adminAuth } = require("../pkg/middlewares/auth");

router.get("/categories", categoryController.getCategories);
router.get("/category/:id", categoryController.getCategory);
router.post("/category", adminAuth, categoryController.createCategory);
router.patch("/category/:id", adminAuth, categoryController.updateCategory);
router.delete("/category/:id", adminAuth, categoryController.deleteCategory);

module.exports = router;
