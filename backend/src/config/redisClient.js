const { createClient } = require('redis');

const redisClient = createClient({ url: process.env.REDIS_URL });

redisClient.on('error', (err) => console.log('Redis Client Error', err));

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

module.exports = redisClient;
