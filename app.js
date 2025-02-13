<<<<<<< HEAD
const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser')

require('dotenv').config();

<<<<<<< HEAD

const userRouter = require('./routes/user.routes')
=======
const MaterialRouter = require('./routes/material.routes');
const WorkshopRouter = require('./routes/workshop.routes');
>>>>>>> 0f207c9 (feat: implemen material management endpoints)
=======
const MaterialRouter = require('./routes/material.routes');
const WorkshopRouter = require('./routes/workshop.routes');
require('dotenv').config();
>>>>>>> 6725937 (fix: fix some imports issues)

const express = require('express');
const app = express();


app.use(express.json());
<<<<<<< HEAD
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello, World!');
});
=======
app.use(express.urlencoded({ extended: true }));

app.use('/api/workshop/materials', MaterialRouter);
app.use('/api/workshops', WorkshopRouter);
>>>>>>> 0f207c9 (feat: implemen material management endpoints)

app.use('/auth', userRouter)

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
