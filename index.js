const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("./utills/logger");
require("dotenv").config();
const socketIo = require("socket.io");
const User = require("./models/userModel");
const TokenService = require("./services/TokenService");

mongoose.connect(process.env.MONGODB_URI).then(() => {
  logger.info(`MongoDB connected`);

  const app = express();

  app.use(cors());
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );
  app.use(express.json());

  app.use("/static", express.static("public"));

  // routes
  const todoRoutes = require("./routes/toDoRoutes");
  const userRoutes = require("./routes/userRoutes");
  const postRoutes = require("./routes/postRoutes");

  app.use("/api/todos", todoRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/posts", postRoutes);

  // handlers

  app.use((req, res, next) => {
    res.status(404).json({ message: "Not Found" });
  });

  const port = process.env.PORT || 5000;
  const server = app.listen(port, () => {
    logger.info(`Server started at port ${port}`);
  });

  const io = socketIo(server, {
    cors: "*",
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("No token provided"));
    }

    const verified = TokenService.verifyToken(token);
    if (!verified) {
      return next(new Error("Token invalid"));
    }

    const user = await User.findById(verified.userId).lean();
    if (!user) {
      return next(new Error("User not exists"));
    }

    socket.user = user;
    next();
  });

  io.on("connection", (socket) => {
    const userData = {
      username: socket.user.username,
      avatar: socket.user.avatar,
    }
    socket.broadcast.emit('new message', {user: userData, type: 'system', message: `User ${userData.username} connected`})

    
    socket.on('new message', (message) => {
      socket.broadcast.emit('new message', {user: userData, type: 'message', message})
    })

    socket.on('disconnect', () => {
      socket.broadcast.emit('new message', {user: userData, type: 'system', message: `User ${userData.username} disconnected`})

    })
  });

});
