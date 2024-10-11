// newrelic.js
const newrelic = require('newrelic');

newrelic.agent.start({
  appId: 'YOUR_APP_ID',
  licenseKey: 'YOUR_LICENSE_KEY',
});