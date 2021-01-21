const { ConfidentialClientApplication } = require('@azure/msal-node');

const { msalConfiguration } = require('../constants');

const resource = 'https://graph.microsoft.com/.default';
let accessToken = null;

async function getAppOnlyToken() {
  if (accessToken) {
    return accessToken;
  }

  const authContext = new ConfidentialClientApplication({
    auth: {
      clientId: msalConfiguration.clientID,
      authority: msalConfiguration.authority.replace(
        'common',
        msalConfiguration.tenantID
      ),
      clientSecret: msalConfiguration.clientSecret,
    },
  });
  const token = await authContext.acquireTokenByClientCredential({
    scopes: [resource],
  });

  accessToken = token.accessToken;

  return token.accessToken;
}

module.exports = {
  getAppOnlyToken,
};
