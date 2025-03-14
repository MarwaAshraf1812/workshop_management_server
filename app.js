const userRouter = require("./routes/user.routes");
const MaterialRouter = require("./routes/material.routes");
const WorkshopRouter = require("./routes/workshop.routes");
const NotificationRouter = require("./routes/notification.routes");
const AssignmentRouter = require("./routes/assignment.routes");
const quizRoutes = require("./routes/quiz.routes");
const http = require("http");
const socketConfig = require("./config/socket");
const bodyParser = require("body-parser");
const express = require("express");
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

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/workshop/materials", MaterialRouter);
app.use("/api/workshop", WorkshopRouter);
app.use("/api/notification", NotificationRouter);
app.use("/api/assignment", AssignmentRouter);
app.use("/api/quiz", quizRoutes);
app.use("/auth", userRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
module.exports = { app, server, io };
