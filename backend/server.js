const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./routes/user');
const port = parseInt(process.env.PORT, 10) || 3000;
const url = "mongodb://127.0.0.1:27017";

mongoose.connect(url);

app.use(express.json());
app.use('/api/user', users);
app.listen(port, () => console.log("Server ready"));