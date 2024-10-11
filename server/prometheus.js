// prometheus.js
const prometheus = require('prometheus-client');

const metrics = new prometheus.Metrics();
metrics.push({
  name: 'response_time',
  help: 'Response time in milliseconds',
});