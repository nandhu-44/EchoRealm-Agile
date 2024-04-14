const { rateLimit } = require("express-rate-limit");

const rateLimitMiddleware = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 20,
    standardHeaders: 'draft-7',
    message: 'You have exceeded the 20 requests in 1 minute limit!',
    statusCode: 429,
    legacyHeaders: false,
});

module.exports = rateLimitMiddleware;