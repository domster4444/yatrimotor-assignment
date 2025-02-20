const colorette = require('colorette');
const app = require('./app');
const rateLimit = require('express-rate-limit');
// Create a rate limiter middleware
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Max 10 requests per minute per IP
  message: 'Too many requests, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiting middleware globally
app.use(limiter);

//! handlling uncaught exception error
process.on('uncaughtException', (err) => {
  console.log(` Error : ${err.message}`);
  console.log('Shutting down server due to uncaught error');
  process.exit(1);
});

//@ts-ignore
const server = app.listen(process.env.PORT, () => {
  console.log('server is working on port ' + process.env.PORT);
  console.log(
    colorette.bold(
      `   ${colorette.bgGreen(
        colorette.white(' server  ')
      )} running on port : ${process.env.PORT} ✔️`
    )
  );
});

//! handling unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down server due to unhandled rejection error');
  process.exit(1);
});
