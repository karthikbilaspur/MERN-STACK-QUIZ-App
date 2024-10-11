const jwt = require('jsonwebtoken');

const authenticate = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) return reject({ success: false });
      resolve({ success: true, user: decoded });
    });
  });
};

module.exports = { authenticate };