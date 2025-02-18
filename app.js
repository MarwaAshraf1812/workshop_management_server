const MaterialRouter = require('./routes/material.routes');
const WorkshopRouter = require('./routes/workshop.routes');

const express = require('express');
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/workshop/materials', MaterialRouter);
app.use('/api/workshop', WorkshopRouter);
app.use('/auth', userRouter)

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
