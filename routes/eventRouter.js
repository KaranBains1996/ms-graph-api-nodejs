const express = require('express');

const { getAppOnlyToken } = require('../helpers/authHelper');
const { createEvent, listEvents } = require('../helpers/requestHelper');

const eventRouter = express.Router();

eventRouter.get('/:id', async (req, res) => {
  const accessToken = await getAppOnlyToken();
  const response = await listEvents(req.params.id, accessToken);

  res.json(response);
});

eventRouter.post('/:id', async (req, res) => {
  const accessToken = await getAppOnlyToken();
  const response = await createEvent(req.params.id, req.body, accessToken);

  res.json(response);
});

module.exports = eventRouter;
