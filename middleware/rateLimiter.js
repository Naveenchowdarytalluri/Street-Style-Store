const { RateLimiterMemory } = require('rate-limiter-flexible');

const rateLimiter = new RateLimiterMemory({
  points: 100, // Number of requests
  duration: 900, // Per 15 minutes
});

module.exports = (req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => next())
    .catch(() => res.status(429).json({ message: 'Rate limit exceeded, try again later' }));
};
