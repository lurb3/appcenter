const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const port = parseInt(process.env.PORT, 10) || 4000;
const url = process.env.MONGO_DB_URL;
const http = require('http').Server(app);
const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000"
  }
});

mongoose.connect(url);

app.use(express.json());
app.use(cors());
app.use('/api/user', routes.users);
app.use('/api/shopping_list', routes.shoppingList);
app.use('/api/product', routes.product);

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });
});

http.listen(port, () => console.log("🎉 Server up and running 🎉"));
