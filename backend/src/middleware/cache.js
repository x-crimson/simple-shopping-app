const redisClient = require('../config/redisClient');

module.exports = async (req, res, next) => {
  const { userId } = req.params;
  const cachedData = await redisClient.get(`data:${userId}`);
  if (cachedData) {
    return res.json(JSON.parse(cachedData));
  }
  next();
};
