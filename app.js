const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
