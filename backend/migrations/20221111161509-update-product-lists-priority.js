
module.exports = {
  async up(db, client) {
    return db.collection('products').updateMany({}, { $set: { priority: 2 } });
  },

  async down(db, client) {
    return Promise.resolve('ok');
  }
};
