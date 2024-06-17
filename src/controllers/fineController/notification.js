const httpStatus = require("http-status");
const midtransClient = require("midtrans-client");

const { getFineOrderId, updateFine } = require("../../repositories/fineRepository");
const { sendPayFineEmail } = require("../../pkg/helpers/sendMail");

// Configurate midtrans client with CoreApi
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;

const core = new midtransClient.CoreApi();

core.apiConfig.set({
  isProduction: false,
  serverKey: MIDTRANS_SERVER_KEY,
  clientKey: MIDTRANS_CLIENT_KEY,
});

module.exports = async (req, res) => {
  try {
    const statusResponse = await core.transaction.notification(req.body);
    const orderId = statusResponse.order_id;
    const fineStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;

    const { data: fine, error: errorFindOrderId } = await getFineOrderId(
      orderId
    );
    if (errorFindOrderId) {
      const errors = new Error(errorFindOrderId);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    if (fineStatus == "capture") {
      if (fraudStatus == "challenge") {
        fine.status = "pending";
      } else if (fraudStatus == "accept") {
        fine.status = "success";
        await sendPayFineEmail(fine);
      }
    } else if (fineStatus == "settlement") {
      fine.status = "success";
      await sendPayFineEmail(fine);
    } else if (
      fineStatus == "cancel" ||
      fineStatus == "deny" ||
      fineStatus == "expire"
    ) {
      fine.status = "failed";
      await sendPayFineEmail(fine);
    } else if (fineStatus == "pending") {
      fine.status = "pending";
    }

    const { error: errorOnUpdateFine } = await updateFine(fine);
    if (errorOnUpdateFine) {
      const errors = new Error(errorOnUpdateFine);
      errors.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw errors;
    }

    res.status(200).send({ message: "Notification successfully processed" });
  } catch (error) {
    // console.log(error);
    res.status(500);
  }
};
