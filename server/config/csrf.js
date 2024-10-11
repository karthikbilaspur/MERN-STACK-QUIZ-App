// server/config/csrf.js
const csrf = require('csrf');
const csrfProtection = csrf();

app.use(csrfProtection);

app.get('/api/csrf-token', (req, res) => {
  res.json({ token: req.csrfToken() });
});