import rateLimit from 'express-rate-limit';

// Rate limiter configuration
// 10 requests per 20 seconds per IP address
const rateLimiter = rateLimit({
    windowMs: 20 * 1000, // 20 seconds
    max: 10, // limit each IP to 10 requests per windowMs
    message: {
        status: 429,
        message: "Too many requests from this IP. Please try again later."
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    skip: (req) => {
        // Skip rate limiting for health checks or specific routes if needed
        return false;
    },
    keyGenerator: (req, res) => {
        // Generate key based on IP address
        return req.ip || req.connection.remoteAddress;
    },
    handler: (req, res) => {
        res.status(429).json({
            status: 429,
            message: "Too many requests. Please try again later."
        });
    }
});

export default rateLimiter;