const router = require("express").Router();

const transactionController = require("../controllers/transactionController");
const { userAuth, adminAuth } = require("../pkg/middlewares/auth");

router.get("/transactions-by-admin", adminAuth, transactionController.getTransactionsByAdmin);
router.get("/transactions-borrow-by-user", userAuth, transactionController.getTransactionsBorrowByUser);
router.get("/transactions-return-by-user", userAuth, transactionController.getTransactionsReturnByUser);
router.get("/transaction/:id", userAuth, transactionController.getTransaction);
router.post("/transaction", userAuth, transactionController.createTransaction);
router.patch("/transaction/:id", adminAuth, transactionController.updateTransaction);
router.delete("/transaction/:id", adminAuth, transactionController.deleteTransaction);

module.exports = router;
