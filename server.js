require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/itemRoutes');
const rateLimiter = require('./middleware/rateLimiter');

const app = express();
app.use(bodyParser.json());
app.use(rateLimiter);

app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
