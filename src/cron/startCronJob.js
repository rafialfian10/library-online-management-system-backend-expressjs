const cron = require("node-cron");
const { Transactions } = require("../../database/models");
const { createFine } = require("../repositories/fineRepository");

const startCronJob = () => {
  cron.schedule("* * * * * *", async () => {
    // Runs every second
    try {
      const currentDate = new Date();

      const overdueTransactions = await Transactions.findAll({
        where: {
          isStatus: true,
          transactionType: "Borrow"
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
              totalDay: 1,
              totalFine: process.env.FINE_PER_DAY * transaction.totalBook,
              status: null,
              token: null,
            };

            await createFine(fine);
            // console.log("Fine Created for Transaction ID:", transaction.id);
          }
        }
      }
    } catch (error) {
      console.error(`Error creating fines: ${error.message}`);
    }
  });
};

module.exports = startCronJob;
