
module.exports = {
  async up(db, client) {
    return db.collection('products').updateMany({}, { $set: { sharedUsers: [] } });
  },

  async down(db, client) {
    return Promise.resolve('ok');
  }
};
