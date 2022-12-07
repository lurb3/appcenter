const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const port = parseInt(process.env.PORT, 10) || 4000;
const url = process.env.MONGO_DB_URL;
const cron = require('node-cron');

cron.schedule('*/60 */15 * * * *', () => {
  console.log('Wake up ping: ' + new Date());
});

mongoose.connect(url);
app.use(express.json());
app.use(cors());
app.use('/api/user', routes.users);
app.use('/api/shopping_list', routes.shoppingList);
app.use('/api/product', routes.product);

app.listen(port, () => console.log("🎉 Server up and running 🎉"));
