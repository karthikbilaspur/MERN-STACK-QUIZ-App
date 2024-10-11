// middleware/cache.js
const asyncHandler = require('express-async-handler');
const redisClient = require('../config/redis');

const cacheResult = (ttl = 60) => {
  return asyncHandler(async (req, res, next) => {
    const cacheKey = `${req.method}_${req.url}`;
    const cachedResponse = await redisClient.get(cacheKey);

    if (cachedResponse) {
      return res.json(JSON.parse(cachedResponse));
    }

    res.locals.cacheKey = cacheKey;
    res.locals.ttl = ttl;

    next();
  });
};

const cacheResponse = async (req, res, next) => {
  const cacheKey = res.locals.cacheKey;
  const ttl = res.locals.ttl;
  const responseBody = JSON.stringify(res.locals.response);

  await redisClient.setex(cacheKey, ttl, responseBody);

  next();
};

module.exports = { cacheResult, cacheResponse };