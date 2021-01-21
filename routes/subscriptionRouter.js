const express = require('express');

const { getAppOnlyToken } = require('../helpers/authHelper');
const {
  createSubscription,
  listSubscriptions,
  deleteSubscription,
} = require('../helpers/requestHelper');
const { subscriptionConfiguration } = require('../constants');

const subscriptionRouter = express.Router();

subscriptionRouter.get('/', async (_, res) => {
  const accessToken = await getAppOnlyToken();
  const response = await listSubscriptions(accessToken);

  res.json(response);
});

subscriptionRouter.post('/', async (_, res) => {
  const accessToken = await getAppOnlyToken();
  const response = await createSubscription(
    subscriptionConfiguration,
    accessToken
  );

  res.json(response);
});

subscriptionRouter.delete('/:id', async (req, res) => {
  try {
    const accessToken = await getAppOnlyToken();
    await deleteSubscription(req.params.id, accessToken);

    res.json({ success: true });
  } catch (ex) {
    res.json({ success: false });
  }
});

module.exports = subscriptionRouter;
