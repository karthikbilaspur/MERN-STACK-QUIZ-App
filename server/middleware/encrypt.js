// middleware/encrypt.js
const crypto = require('crypto');

const encrypt = (text) => {
  const cipher = crypto.createCipher('aes-256-cbc', 'your_secret_key');
  const encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
  return encrypted;
};

module.exports = encrypt;