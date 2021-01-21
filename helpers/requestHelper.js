require('cross-fetch/polyfill');
const MicrosoftGraph = require('@microsoft/microsoft-graph-client');

const subscriptionPath = '/subscriptions';

function getGraphClient(accessToken) {
  const client = MicrosoftGraph.Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });

  return client;
}

async function deleteSubscription(subscriptionId, accessToken) {
  const client = getGraphClient(accessToken);
  await client.api(`${subscriptionPath}/${subscriptionId}`).delete();
}

async function createSubscription(
  subscriptionCreationInformation,
  accessToken
) {
  const client = getGraphClient(accessToken);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const payload = {
    ...subscriptionCreationInformation,
    expirationDateTime: tomorrow.toISOString(),
  };

  console.log(payload);

  let res = await client.api(subscriptionPath).post(payload);

  console.log(res);
  return res;
}

async function listSubscriptions(accessToken) {
  const client = getGraphClient(accessToken);
  let res = await client.api(subscriptionPath).get();

  return res;
}

async function getData(path, accessToken) {
  const client = getGraphClient(accessToken);
  const result = await client
    .api(path)
    .headers({
      'Content-Type': 'application/json',
      Accept:
        'application/json;odata.metadata=minimal;' +
        'odata.streaming=true;IEEE754Compatible=false',
    })
    .get();
  return result;
}

async function listEvents(id, accessToken) {
  const client = getGraphClient(accessToken);

  const res = await client
    .api(`/users/${id}/events`)
    .header('Prefer', 'outlook.timezone="India Standard Time"')
    .select('subject,body,bodyPreview,organizer,attendees,start,end,location')
    .get();

  return res;
}

async function createEvent(id, event, accessToken) {
  const client = getGraphClient(accessToken);

  const res = await client.api(`/users/${id}/events`).post(event);

  return res;
}

module.exports = {
  getGraphClient,
  createSubscription,
  listSubscriptions,
  deleteSubscription,
  getData,
  listEvents,
  createEvent,
};
