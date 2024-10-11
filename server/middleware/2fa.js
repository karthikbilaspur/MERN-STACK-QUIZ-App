// middleware/2fa.js
const speakeasy = require('speakeasy');

const secret = 'your_secret_key';

const verify2FA = async (req, res, next) => {
  const token = req.query.token;
  const verified = speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
  });

  if (!verified) {
    return res.status(401).send('Invalid 2FA token');
  }

  next();
};

module.exports = verify2FA;