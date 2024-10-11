// middleware/ipBlock.js
const ipBlock = require('express-ip-block');

const blockedIPs = ['192.168.1.100', '192.168.1.101'];

const ipBlocker = ipBlock(blockedIPs, {
  mode: 'blacklist',
});

module.exports = ipBlocker;