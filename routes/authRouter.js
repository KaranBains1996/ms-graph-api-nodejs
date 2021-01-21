const express = require('express');

const { getAppOnlyToken } = require('../helpers/authHelper');

const authRouter = express.Router();

authRouter.get('/', async (_, res) => {
  const token = await getAppOnlyToken();
  console.log(token.accessToken);
  res.send('Hello from auth router');
});

module.exports = authRouter;
