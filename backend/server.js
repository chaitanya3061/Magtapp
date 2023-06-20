const express = require('express');
const { createPool } = require('mysql2');
const app = express();
const pool = createPool({
  host: "localhost",
  user: "root",
  password: "chaitu@1603",
  database: "shop",
  connectionLimit: 10
});

app.use(express.json());

app.post('/account/register', (req, res) => {
  const { fname, lname, email, password } = req.body;
  const sql = 'INSERT INTO shop.user (fname, lname, email, password) VALUES (?, ?, ?, ?)';
  const values = [fname, lname, email, password];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'An error occurred while registering the user.' });
      return;
    }
    console.log('Data inserted successfully:', result);

    // Select data after inserting
    pool.query(`SELECT * FROM shop.user`, (err, selectResult) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
      } else {
        console.log('Selected data:', selectResult);
        res.status(200).json({ message: 'User registered successfully.' });
      }
    });
  });
});
app.post('/account/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM shop.user WHERE email = ? AND password = ?';
  const values = [email, password];

  pool.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error executing login query:', err);
      res.status(500).json({ error: 'An error occurred while logging in.' });
      return;
    }

    if (result.length === 0) {
      // User not found or invalid credentials
      res.status(401).json({ error: 'Invalid email or password.' });
    } else {
      // Successful login
      res.status(200).json({ message: 'Login successful.' });
    }
  });
});
app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
