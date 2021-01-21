exports.msalConfiguration = {
  authority: process.env.MSAL_AUTHORITY,
  clientID: process.env.MSAL_CLIENT_ID,
  clientSecret: process.env.MSAL_CLIENT_SECRET,
  tenantID: process.env.MSAL_TENANT_ID,
  redirectUri: process.env.MSAL_REDIRECT_URI,
};

exports.subscriptionConfiguration = {
  changeType: process.env.SUB_CHANGE_TYPE,
  notificationUrl: process.env.SUB_NOTIFICATION_URL,
  resource: process.env.SUB_RESOURCE,
  clientState: process.env.SUB_CLIENT_STATE,
  includeResourceData: false,
};

exports.certificateConfiguration = {
  certificateId: 'myCertificateId',
  relativeCertPath: './certificate.pem',
  relativeKeyPath: './key.pem',
  password: 'Password123',
}; // the certificate will be generated during the first subscription creation, production solutions should rely on a certificate store
