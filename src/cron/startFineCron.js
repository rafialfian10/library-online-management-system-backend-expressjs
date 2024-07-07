const cron = require("node-cron");

const { Transactions } = require("../../database/models");
const { validateCreateFineRequest } = require("../serializers/fineSerializer");
const {
  getFineTransactionId,
  createFine,
  updateTotalFine,
} = require("../repositories/fineRepository");

module.exports = () => {
  cron.schedule("* * * * * *", async () => {
    // Runs every second
    try {
      const currentDate = new Date();

      const overdueTransactions = await Transactions.findAll({
        where: {
          isStatus: true,
          transactionType: "Borrow",
        },
      });

      if (overdueTransactions && overdueTransactions.length > 0) {
        for (const transaction of overdueTransactions) {
          const returnDate = new Date(transaction.returnDate);
          let secondsRemaining = Math.ceil((returnDate - currentDate) / 1000);

          if (secondsRemaining === -0) {
            secondsRemaining = 0;
          }

          if (secondsRemaining === 0) {
            const fine = {
              idBook: transaction.idBook,
              idUser: transaction.idUser,
              idTransaction: transaction.id,
              totalDay: 1,
              totalFine: process.env.FINE_PER_DAY * transaction.totalBook,
              status: null,
              token: null,
            };

            const error = validateCreateFineRequest(fine);
            if (error) {
              const errors = new Error(error);
              errors.status = httpStatus.BAD_REQUEST;
              throw errors;
            }

            await createFine(fine);
          } else if (secondsRemaining < 0) {
            const overdueMinutes = Math.abs(Math.floor(secondsRemaining / 60));

            if (overdueMinutes >= 1440) { // Check if overdue period is 24 hours or more
              const overduePeriods = overdueMinutes / 1140; // Calculate number of days overdue
              const fine = await getFineTransactionId(transaction.id);

              if (fine) {
                const fineData = {
                  totalDay: overduePeriods,
                  totalFine:
                    process.env.FINE_PER_DAY *
                    overduePeriods *
                    transaction.totalBook,
                };

                await updateTotalFine(fine.data.id, fineData);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error creating fines: ${error.message}`);
    }
  });
};
