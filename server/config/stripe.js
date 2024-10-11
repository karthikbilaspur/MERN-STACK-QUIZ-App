// server/config/stripe.js
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');

app.post('/api/payments', async (req, res) => {
  const { amount, currency } = req.body;
  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      number: req.body.cardNumber,
      exp_month: req.body.expMonth,
      exp_year: req.body.expYear,
      cvc: req.body.cvc,
    },
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    payment_method_types: ['card'],
  });

  await stripe.paymentIntents.confirm(paymentIntent.id, {
    payment_method: paymentMethod.id,
  });

  res.json({ message: 'Payment successful' });
});