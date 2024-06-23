const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const redis = require('redis');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Redis
const redisClient = redis.createClient({ url: process.env.REDIS_URL });
redisClient.connect().catch(console.error);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));
app.use('/api/cart', require('./routes/cart'));

// to be removed once compleated the project
// Root route for testing if api is working or not
app.get('/', (req, res) => {
    res.send('API is working');
  });

// This is for Testing Redis route
app.get('/api/test-redis', async (req, res) => {
  try {
    await redisClient.set('test_key', 'test_value');
    const value = await redisClient.get('test_key');
    res.send(`Redis is working. Value: ${value}`);
  } catch (err) {
    res.status(500).send('Redis is not working properly');
  }
});
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
