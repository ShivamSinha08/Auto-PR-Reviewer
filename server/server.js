// server.js

require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3001; // Port for the backend server

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(bodyParser.json());
app.get('/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('No code provided.');
  }

  try {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
      },
      {
        headers: {
          accept: 'application/json',
        },
      }
    );

    const accessToken = response.data.access_token;

    // Instead of redirecting directly, include the token as a query parameter
    res.redirect(`http://localhost:5173/success?token=${accessToken}`);
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    res.status(500).send('Internal Server Error');
  }
});
