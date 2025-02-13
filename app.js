const MaterialRouter = require('./routes/material.routes');
const WorkshopRouter = require('./routes/workshop.routes');
const userRouter = require('./routes/user.routes')
require('dotenv').config();

const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/workshop/materials', MaterialRouter);
app.use('/api/workshop', WorkshopRouter);

app.use('/auth', userRouter)

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
