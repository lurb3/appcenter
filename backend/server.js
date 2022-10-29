const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/index');
const port = parseInt(process.env.PORT, 10) || 3000;
const url = "mongodb://127.0.0.1:27017/appcenter";

mongoose.connect(url);

app.use(express.json());
app.use('/api/user', routes.users);
app.use('/api/shopping_list', routes.shoppingList);
app.listen(port, () => console.log("Server ready"));

// User - Shopping Lists - Shopping Items