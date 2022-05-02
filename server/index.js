// import express from 'express';
const express = require('express');
const cors = require('cors');
require('dotenv').config();
// import bodyParser from 'body-parser';
// import cors from 'cors';
const { auth, requiresAuth } = require('express-openid-connect');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
    session: {
      store: new MemoryStore({
        checkPeriod: 1 * 1000,
      }),
    },
  }),
);

app.get('/', (req, res) => {
  console.log('req.oidc: ', req.oidc.user);
  res.send(req.oidc.isAuthenticated() ? `hello ${req.oidc.user.sub}` : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.get('/dashboard', requiresAuth(), async (req, res) => {
  const { user } = req.oidc;

  const { name, email } = user;
  console.log('NAME, EMAIL: ', name, email);

  const userCheck = await pool.query(
    'SELECT * FROM users WHERE user_name = $1 AND email = $2',
    [name, email],
  );

  if (userCheck.rows.length <= 0) {
    const newUser = await pool.query(
      'INSERT INTO users (user_name, email, created_at, updated_at) VALUES($1, $2, current_timestamp, current_timestamp) RETURNING *',
      [name, email],
    );

    res.json(newUser.rows[0]);
  }

  const { id, counter } = userCheck.rows[0];

  const newCounter = counter + 1;

  console.log('new counter: ', newCounter);

  const userLoggedIn = await pool.query(
    'UPDATE users SET updated_at = current_timestamp, counter = $2 WHERE id = $1 RETURNING *',
    [id, newCounter],
  );

  res.json(userLoggedIn.rows[0]);
});

app.post('/user_name', async (req, res) => {
  try {
    const { username } = req.body;
    const newUserName = await pool.query(
      'INSERT INTO users (user_name) VALUES($1) RETURNING *',
      [username],
    );
    res.json(newUserName.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all
app.get('/user_name', async (req, res) => {
  try {
    const userNames = await pool.query('SELECT * FROM users');

    res.json(userNames.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get single
app.get('/user_name/:id', async (req, res) => {
  try {
    console.log('req.params: ', req.params);
    const { id } = req.params;
    const userName = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id],
    );
    res.json(userName.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
