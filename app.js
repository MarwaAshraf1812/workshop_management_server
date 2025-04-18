const userRouter = require("./routes/user.routes");
const MaterialRouter = require("./routes/material.routes");
const WorkshopRouter = require("./routes/workshop.routes");
const NotificationRouter = require("./routes/notification.routes");
const AssignmentRouter = require("./routes/assignment.routes");
const quizRoutes = require("./routes/quiz.routes");
const SubmissionRouter = require("./routes/submission.routes");
const progressRouter = require("./routes/progress.routes");
const LeaderboardRouter = require("./routes/leader.routes");
const http = require("http");
const socketConfig = require("./config/socket");
const bodyParser = require("body-parser");
const express = require("express");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketConfig.init(server);

// Socket.io setup
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("notify", (data) => {
    io.emit("notification", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

//prevent common vulnerabilities
app.use(helmet());// Set security HTTP headers
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'"],
//       styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
//       imgSrc: ["'self'", 'data:', 'https:'],
//       connectSrc: ["'self'"],
//     },
//   })
// );

/** Limiting the number of requests 
 * from a single IP address
 * to prevent DDoS attacks
 * and brute-force attacks 
 * */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
app.use(limiter);

app.use(express.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss()); // prevent sql injection
app.use("/api/workshop/materials", MaterialRouter);
app.use("/api/workshop", WorkshopRouter);
app.use("/api/notification", NotificationRouter);
app.use("/api/assignment", AssignmentRouter);
app.use("/api/quiz", quizRoutes);
app.use("/api/submissions", SubmissionRouter);
app.use("/api/progress", progressRouter);
app.use("/api/leaderboard", LeaderboardRouter);
app.use("/auth", userRouter);

app.set('trust proxy', 1);
// app.listen(process.env.PORT || 5000, () => {
//   console.log(`Server is running on port ${process.env.PORT || 5000}`);
// });
// module.exports = { app, server, io };
module.exports = app;