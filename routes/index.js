const userRouter = require("./user.routes");
const MaterialRouter = require("./material.routes");
const WorkshopRouter = require("./workshop.routes");
const NotificationRouter = require("./notification.routes");
const AssignmentRouter = require("./assignment.routes");
const quizRoutes = require("./quiz.routes");
const SubmissionRouter = require("./submission.routes");
const progressRouter = require("./progress.routes");
const LeaderboardRouter = require("./leader.routes");

module.exports = (app) => {
  app.use("/api/workshop/materials", MaterialRouter);
  app.use("/api/workshop", WorkshopRouter);
  app.use("/api/notification", NotificationRouter);
  app.use("/api/assignment", AssignmentRouter);
  app.use("/api/quiz", quizRoutes);
  app.use("/api/submissions", SubmissionRouter);
  app.use("/api/progress", progressRouter);
  app.use("/api/leaderboard", LeaderboardRouter);
  app.use("/auth", userRouter);
};
