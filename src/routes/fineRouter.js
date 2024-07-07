const router = require("express").Router();

const fineController = require("../controllers/fineController");
const { userAuth, adminAuth } = require("../pkg/middlewares/auth");

router.get("/fines-by-admin", adminAuth, fineController.getFinesByAdmin);
router.get("/fines-by-user", userAuth, fineController.getFinesByUser);
router.get("/fine/:id", userAuth, fineController.getFine);
router.patch("/fine/:id", userAuth, fineController.updateFine);
router.patch("/fine-status-by-admin/:id", adminAuth, fineController.updateFineByAdmin);
router.delete("/fine/:id", adminAuth, fineController.deleteFine);
router.post("/notification", fineController.notification);

module.exports = router;
