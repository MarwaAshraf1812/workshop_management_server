const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const MaterialRouter = require('./routes/material.routes');
const WorkshopRouter = require('./routes/workshop.routes');

const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/workshop/materials', MaterialRouter);
app.use('/api/workshops', WorkshopRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
