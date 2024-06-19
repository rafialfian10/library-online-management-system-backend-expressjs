require("dotenv").config(); // read environment variable from .env file
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const path = require("path");
const router = require("./routes");
const http = require("http");
const { redisInit } = require("../config/redis");
const customLogger = require("./pkg/middlewares/logger");
const startCronJob = require("./cron/startCronJob"); 

// socket io
// const { Server } = require("socket.io");

// create instance of express
const app = express();

// Inisialisasi server HTTP
const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: process.env.SOCKET_CLIENT, // define client origin if both client and server have different origin
//     methods: ["GET", "POST"],
//     allowedHeaders: [
//       "Origin",
//       "X-Requested-With",
//       "Content-Type",
//       "Authorization",
//     ],
//   },
//   maxHttpBufferSize: 1e8 // 100mb
// });

// incoming request parser
app.use(express.json());

// configuration cors
app.use(
  cors({
    origin: process.env.ORIGIN_ALLOWED,
    methods: ["HEAD", "OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
    ],
  })
);

// connect to redis server
redisInit();

// create logger instance
const logger = morgan("dev");
app.use(logger);

// custom logger middleware
app.use(customLogger);

// create router group
app.use("/api/v1/", router);

// serving static files
app.use("/static", express.static(path.join(__dirname, "../uploads")));

const port = process.env.PORT || 5000;

// Start the cron job
startCronJob();

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

