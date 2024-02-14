const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("./utills/logger");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
  logger.info(`MongoDB connected`)

  const app = express()
  app.use(cors())

  app.use(express.json())

  // routes
  const todoRoutes = require('./routes/toDoRoutes')
  app.use('/api/todos', todoRoutes)



  // handlers

  app.use((req, res, next) => {
    res.status(404).json({error: 'Not Found'})
  }) 

  const port = process.env.PORT || 5000
  app.listen(port, () => {
    logger.info(`Server started at port ${port}`)
  })
});
